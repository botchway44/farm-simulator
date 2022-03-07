
import { Op } from 'sequelize'
import ErrorHandler from '../../errors/BaseError';
import { HttpCode } from '../../errors/codes';
import { Unit, Building, ProcessQueue, ProcessQueueInput, ProcessQueueOuput } from '../models'
import { UnitInput, UnitOuput } from '../models'


class ProcessService {
    async create(payload: ProcessQueueInput): Promise<ProcessQueueOuput> {
        //update the building count

        const [process, created] = await ProcessQueue.findOrCreate({
            where: {
                processId: payload.processId
            },
            defaults: payload

        });

        await process.save();

        return process
    }

    async get(id: string): Promise<ProcessQueueOuput | null> {
        return await ProcessQueue.findByPk(id);
    }

    async update(id: string, value: boolean): Promise<void> {
        const process = await ProcessQueue.update({ "locked": value }, {
            where: {
                processId: id,
            }
        });


    }

    isLocked(id: string): Promise<boolean> {

        return ProcessQueue.findOne({
            where: {
                processId: id,
            }
        }).then(process => {
            console.log("Locked is ", process?.get("locked"));

            if (!process) return false;

            return process.get("locked");
        });
    }
}
export default new ProcessService();

