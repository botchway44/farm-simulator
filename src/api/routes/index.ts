import { Router, Request, Response } from 'express'
import BuildingController from "../controllers/building.controller";
import UnitController from "../controllers/unit.controller";

const FarmRouter = Router()

FarmRouter.get('/building', BuildingController.getAll)
FarmRouter.post('/building', BuildingController.create)
FarmRouter.get('/building/:id/units', BuildingController.getAllUnitsByBuildingId)

FarmRouter.post('/unit', UnitController.create)
FarmRouter.get('/unit', UnitController.getAll)
FarmRouter.get('/unit/:id', UnitController.getUnit)



export default FarmRouter