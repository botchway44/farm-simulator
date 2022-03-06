
import { Op } from 'sequelize'
import { Unit } from '../models'
import { UnitInput, UnitOuput } from '../models'

export const create = async (payload: UnitInput): Promise<UnitOuput> => {
    const unit = await Unit.create(payload)
    return unit
}

export const findByBuildingId = async (id: string) => {
    return Unit.findAll({ where: { buildingId: id } });
}
