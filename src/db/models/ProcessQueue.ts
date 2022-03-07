import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { Unit } from './Unit';
import { Building } from './Building';
import CONFIG from "../../config/config"
interface ProcessQueueAttributes {
    id: string | undefined;

    processId: string;
    locked: boolean;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface ProcessQueueInput extends Omit<ProcessQueueAttributes, 'id' | 'locked'> { }
export interface ProcessQueueOuput extends Required<ProcessQueueAttributes> {

}

export class ProcessQueue extends Model<ProcessQueueAttributes, ProcessQueueInput> implements ProcessQueueAttributes {

    public id!: string
    public processId!: string
    public locked!: boolean

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    initiateFeeding(): void {
    }
}

ProcessQueue.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        processId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        locked: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        tableName: CONFIG.PROCESSQUEUE,
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true
    }
);

