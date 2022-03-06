
import { Op } from 'sequelize'
import { Unit, Building } from '../models'
import { UnitInput, UnitOuput } from '../models'


class UnitService {
    async create(payload: UnitInput): Promise<UnitOuput> {
        //update the building count
        const building: Building = await Building.findByPk(payload.buildingId) as Building;

        const unit = await Unit.create(payload)
        console.log("Creating unit", unit);

        building.increment("numOfUnits", { by: 1 })
        await building.save();


        return unit
    }

    async getUnit(id: string): Promise<UnitOuput | null> {
        return await Unit.findByPk(id);
    }

    async getAll(): Promise<UnitOuput[]> {
        return await Unit.findAll();
    }

}
export default new UnitService();

