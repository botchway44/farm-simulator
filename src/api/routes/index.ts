import { Router, Request, Response } from 'express'
import { create } from "../../db/dal/building";
const { Building } = require("../../db/models/Building");
const FarmRouter = Router()

FarmRouter.get('/', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const farm = await create({ name: "test", feedingInterval: 1, createdAt: new Date(), updatedAt: new Date() });
    return res.status(200).send({ message: farm })
})

FarmRouter.get('/all', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const farm = await Building.findAll();
    return res.status(200).send({ message: farm })
})

export default FarmRouter