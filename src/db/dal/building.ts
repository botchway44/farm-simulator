
import { Op } from 'sequelize'
import { Building, Unit, UnitOuput } from '../models'
import { BuildingInput, BuildingOuput } from '../models'

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

    async getAll(): Promise<BuildingOuput[]> {
        return await Building.findAll();
    }

}
export default new BuildingService();
