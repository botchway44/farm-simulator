import { Router } from 'express'
import BuildingController from "../controllers/building.controller";
import UnitController from "../controllers/unit.controller";

const FarmRouter = Router()

FarmRouter.get('/building', BuildingController.getAll)
FarmRouter.post('/building', BuildingController.create)
FarmRouter.get('/building/:id/units', BuildingController.getAllUnitsByBuildingId)
FarmRouter.get('/building/:id/feed', BuildingController.feedBuilding)

FarmRouter.post('/unit', UnitController.create)
FarmRouter.get('/unit', UnitController.getAll)
FarmRouter.get('/unit/:id', UnitController.getUnit)
FarmRouter.get('/unit/:id/feed', UnitController.feedUnit)



export default FarmRouter