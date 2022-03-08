
import { config } from 'dotenv'
import { Op } from 'sequelize'
import ErrorHandler from '../../errors/BaseError'
import { HttpCode } from '../../errors/codes'
import { BuildingInput, BuildingOuput, Building, Unit, UnitOuput, ProcessQueueInput } from '../models'
import UnitService, { initiateFeeding } from './unit'
import ProcessService from './process'

import CONFIG from "../../config/config";

class BuildingService {
    async create(payload: BuildingInput): Promise<BuildingOuput> {
    const farm = await Building.create(payload)
    return farm
    }

    getAllUnitsByBuildingId(id: string): Promise<UnitOuput[]> {
        const units = Unit.findAll({
            where: {
                buildingId: id
            }
        })
        return units
    }

    async feedBuilding(id: string): Promise<any> {

        //verify if the building is locked and not been fed yet
        const building = await Building.findByPk(id);
        if (!building) throw new ErrorHandler("Building not found", "NOT_FOUND", HttpCode.NOT_FOUND);

        //verify the feeding interval
        const _d = building.getDataValue("updatedAt");
        const interval = Math.round(new Date().getTime() - new Date(_d).getTime()) / 1000;
        console.log("Interval : ", interval);
        //if the interval is lessthan the feeding interval, throw an error
        if (interval < CONFIG.BUILDING_FEEDING_INTERVAL) {
            throw new ErrorHandler(
                `This Building feeding interval not reached: ${id}.`,
                "FAILED",
                HttpCode.SERVER_ERROR
            );
        }

        // verify if the building interval is on
        const resolved = await ProcessService.isLocked(id);
        if (resolved) {
            throw new ErrorHandler(
                `Building with Id: ${id}. is currently been fed`,
                "FAILED",
                HttpCode.NOT_FOUND
            );
        }

        //Create a process and add to the process queue
        const _payload = { "processId": id } as ProcessQueueInput;
        await ProcessService.create(_payload);
        await ProcessService.update(id, true);

        console.log("Building Id is", id);
        const units = await Unit.findAll({
            where: {
                buildingId: id
            }
        })

        console.log("Units are ", units.length)
        for (const unit of units) {
            console.log("Starting Feeding unit", unit.getDataValue("name"));
            const payload = { "processId": unit.get("id") } as ProcessQueueInput;
            await ProcessService.create(payload);
            await ProcessService.update(unit.get("id"), true);
            initiateFeeding(unit.get("id"), id);
        }

        return { message: "Building feeding started" }
    }

    async getAll(): Promise<BuildingOuput[]> {
        return await Building.findAll();
    }

}
export default new BuildingService();
