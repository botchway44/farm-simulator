import { NextFunction, Request, Response } from "express";
import { Building, BuildingInput } from '../../db/models'
import BuildingService from '../../db/dal/building';
import UnitService from '../../db/dal/unit';

class BuildingController {
    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await BuildingService.getAll();
            return response.status(200).send(data);
        } catch (error) {
            return next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const building: BuildingInput = request.body;

        console.log(building);
        try {
            const data = await BuildingService.create(building);

            return response.status(201).send(data);
        } catch (error) {
            return next(error);
        }
    }



    async getAllUnitsByBuildingId(request: Request, response: Response, next: NextFunction) {

        const id = request.params.id;
        console.log(id);
        try {
            const data = await BuildingService.getAllUnitsByBuildingId(id);
            return response.status(200).send(data);
        } catch (error) {
            return next(error);
        }
    }
}

export default new BuildingController();