
import { resolve } from 'path';
import { Op } from 'sequelize'
import ErrorHandler from '../../errors/BaseError';
import { HttpCode } from '../../errors/codes';
import { Unit, Building, FeedingQueue, UnitInput, UnitOuput, FeedingQueueInput } from '../models'
import FeedingQueueService from './feeding'

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

        if (!unit) {
            throw new ErrorHandler(
                `There is no unit with ID: ${id}.`,
                "NOT_FOUND",
                HttpCode.NOT_FOUND
            );
        } else {



            //verify the feeding interval
            const _d = unit.getDataValue("updatedAt");
            const interval = new Date().getTime() - new Date(_d).getTime();
            console.log("Interval is", interval);
            if (interval < unit.get("feedingInterval")) {
                throw new ErrorHandler(
                    `This unit is already in the feeding process: ${id}.`,
                    "FAILED",
                    HttpCode.SERVER_ERROR
                );
            }
            //if lastfed or updated at in seconds is greater lessthan feeding than, return error
            console.log("Starting Feeding unit", unit.getDataValue("name"));

            const resolved = await !FeedingQueueService.isSafe(id);
            console.log(id, "Process Locked is ", resolved);

            if (resolved) {

                console.log("Cannot Feeding unit", id);

                throw new ErrorHandler(
                    `Unit with Id: ${id}. is currently been fed`,
                    "FAILED",
                    HttpCode.NOT_FOUND
                );
            } else {


                const payload = { "processId": id } as FeedingQueueInput;
                const process = await FeedingQueueService.create(payload);

                console.log("Feeding unit", id);
                initiateFeeding(unit);

                return { message: "Fedding started" };

            }
        }
    }
    async getUnit(id: string): Promise<UnitOuput | null> {
        return await Unit.findByPk(id);
    }

    async getAll(): Promise<UnitOuput[]> {
        return await Unit.findAll();
    }

}


function initiateFeeding(unit: Unit): Promise<void> {

    return new Promise((resolve, reject) => {

        setTimeout(async () => {
            const points = 90;
            console.log("Points of the day ", points)
            console.log(`${unit.getDataValue('name')} has been fed : ${unit.getDataValue("unitHealth")} ${unit.get("id")}`);

            unit.set("unitHealth", points);
            unit.set("lastFed", new Date());
            unit.save()
            // const res = await FeedingQueueService.update(unit.get("id"), false);
            // console.log("Feeding unit", res);
        }, 10000);
    });
}

export default new UnitService();

