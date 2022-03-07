
import { Op } from 'sequelize'
import ErrorHandler from '../../errors/BaseError';
import { HttpCode } from '../../errors/codes';
import { Unit, Building, FeedingQueue, FeedingQueueInput, FeedingQueueOuput } from '../models'
import { UnitInput, UnitOuput } from '../models'


class FeedingQueueService {
    async create(payload: FeedingQueueInput): Promise<FeedingQueueOuput> {
        //update the building count

        const [process, created] = await FeedingQueue.findOrCreate({
            where: {
                processId: payload.processId
            },
            defaults: payload

        });

        await process.save();

        return process
    }

    async get(id: string): Promise<FeedingQueueOuput | null> {
        return await FeedingQueue.findByPk(id);
    }

    async update(id: string, value: boolean): Promise<FeedingQueueOuput | null> {
        const process = await FeedingQueue.findOne({
            where: {
                processId: id,
                locked: true
            }
        });


        if (!process) return null;
        console.log("The process return after update", process);
        await process.set("locked", value);
        await process.save();

        return process;
    }

    isSafe(id: string): Promise<boolean> {

        return FeedingQueue.findOne({
            where: {
                processId: id,
            }
        }).then(process => {
            console.log("Locked is ", process?.get("locked"));

            if (!process) return true;

            return process.get("locked") ? false : true;
        });
    }
}
export default new FeedingQueueService();

