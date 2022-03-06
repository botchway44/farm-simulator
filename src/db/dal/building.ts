
import { Op } from 'sequelize'
import { Building } from '../models'
import { BuildingInput, BuildingOuput } from '../models'

export const create = async (payload: BuildingInput): Promise<BuildingOuput> => {
    const farm = await Building.create(payload)
    return farm
}
