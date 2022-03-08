
import { resolve } from 'path';
import { Op } from 'sequelize'
import ErrorHandler from '../../errors/BaseError';
import { HttpCode } from '../../errors/codes';
import { Unit, Building, ProcessQueue, UnitInput, UnitOuput, ProcessQueueInput, getRandomPoints } from '../models'
import ProcessService from './process'
import CONFIG from "../../config/config";
class UnitService {
    async create(payload: UnitInput): Promise<UnitOuput> {
        //update the building count
        const building: Building = await Building.findByPk(payload.buildingId) as Building;


        if (!building) {
            throw new ErrorHandler(
                `There is no building with ID: ${payload.buildingId}.`,
                "NOT_FOUND",
                HttpCode.NOT_FOUND
            );

        }

        const unit = await Unit.create(payload)
        console.log("Creating unit", unit);

        building.increment("numOfUnits", { by: 1 })
        await building.save();

        return unit
    }

    async feedUnit(id: string): Promise<any> {
        const unit = await Unit.findByPk(id);

        //If there is not unit throw an error
        if (!unit) {
            throw new ErrorHandler(
                `There is no unit with ID: ${id}.`,
                "NOT_FOUND",
                HttpCode.NOT_FOUND
            );
        }



        //Verify if the unit is not dead : TODO Refactor 
        const lastFed = unit.getDataValue('lastFed');
        const isRecentlyFed = new Date().getTime() - new Date(lastFed).getTime();
        const diff = Math.floor(isRecentlyFed / 1000);
        const health = unit.getDataValue('unitHealth');
        let newHealth = health - Math.floor(diff / unit.getDataValue('feedingInterval'));

        if (newHealth <= 0) {
            throw new ErrorHandler(
                `Unit is dead : ${id}.`,
                "UNIT IS DEAD",
                HttpCode.SERVER_ERROR
            );
        }

        //verify the feeding interval
        const _d = unit.getDataValue("updatedAt");
        const interval = Math.round(new Date().getTime() - new Date(_d).getTime()) / 1000;
            //if the interval is lessthan the feeding interval, throw an error
        if (interval < CONFIG.UNIT_FEEDING_INTERVAL) {
                throw new ErrorHandler(
                    `This Unit feeding interval not reached: ${id}.`,
                    "FAILED",
                    HttpCode.SERVER_ERROR
                );
            }

        //If the unit is not locked, lock it and feed else throw an error
        console.log("Starting Feeding unit", unit.getDataValue("name"));
        const resolved = await ProcessService.isLocked(id);

        if (resolved) {
            throw new ErrorHandler(
                `Unit with Id: ${id}. is currently been fed`,
                "FAILED",
                HttpCode.NOT_FOUND
            );
        }


        const payload = { "processId": id } as ProcessQueueInput;
        await ProcessService.create(payload);
        await ProcessService.update(id, true);
        initiateFeeding(id);

        return { message: "Fedding started" };

    }
    async getUnit(id: string): Promise<UnitOuput | null> {
        return await Unit.findByPk(id);
    }

    async getAll(): Promise<UnitOuput[]> {
        return await Unit.findAll();
    }

}


export function initiateFeeding(id: string, buildingId: string | null = null): Promise<void> {

    return new Promise((resolve, reject) => {

        setTimeout(async () => {
            const unit = await Unit.findByPk(id);
            if (!unit) return;

            //calculate the health point and add one for unit feeding
            //Verify if the unit is not dead : TODO Refactor 
            const _lastFed = unit.getDataValue('lastFed');
            const isRecentlyFed = new Date().getTime() - new Date(_lastFed).getTime();
            const diff = Math.floor(isRecentlyFed / 1000);
            const health = unit.getDataValue('unitHealth');
            let newHealth = health - Math.floor(diff / unit.getDataValue('feedingInterval'));
            newHealth = newHealth >= 0 ? newHealth : 0;

            //dynamically set the points based on unit feeding or building feeding
            const points = buildingId ? (newHealth + 1) : getRandomPoints();
            const lastFed = new Date();

            await Unit.update({ lastFed: new Date(), unitHealth: points, updatedAt: lastFed }, {
                where: {
                    id: id
                }
            });


            console.log(`${unit.getDataValue('name')} has been fed : ${points} Lastfed ${lastFed}`);
            const res = await ProcessService.update(unit.get("id"), false);
            console.log("----------------------------------------------------");
            console.log("Feeding unit Complete");
            console.log("----------------------------------------------------");

            //resusing this function for simulation. If a building Id is present,
            // remove this from the process queue
            if (buildingId) {
                await ProcessService.update(buildingId, false);

                //update the last fed time, this will use the last unit fed time
                await Building.update({ lastFed: new Date(), updatedAt: lastFed }, {
                    where: {
                        id: id
                    }
                });
            }
        }, CONFIG.FEED_SIMULATION_TIME); // simulate a 5 second feeding delay
    });
}

export default new UnitService();

