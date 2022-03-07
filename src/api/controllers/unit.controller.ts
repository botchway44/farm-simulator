import { NextFunction, Request, Response } from "express";
import { Unit, UnitInput } from '../../db/models'
import UnitService from '../../db/dal/unit'

class UnitController {
    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            console.log("Starting");

            const data = await UnitService.getAll();
            return response.status(200).send(data);
        } catch (error) {
            console.log("Err", error);

            return next(error);
        }
    }

    async getUnit(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            const data = await UnitService.getUnit(id);
            return response.status(200).send(data);
        } catch (error) {
            console.log("Err", error);
            return next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const building: UnitInput = request.body;

        try {
            const data = await UnitService.create(building);

            return response.status(201).send(data);
        } catch (error) {
            console.log("Err", error);
            return next(error);
        }
    }

    async feedUnit(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        try {
            const data = await UnitService.feedUnit(id);
            return response.status(200).send(data);
        } catch (error) {
            console.log("Err", error);
            next(error);
        }
    }
}

export default new UnitController();
