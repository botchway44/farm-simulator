import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { Unit } from './Unit';
import { Building } from './Building';
import CONFIG from "../../config/config"
interface FeedingQueueAttributes {
    id: string | undefined;

    processId: string;
    locked: boolean;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface FeedingQueueInput extends Optional<FeedingQueueAttributes, 'id' | 'locked'> { }
export interface FeedingQueueOuput extends Required<FeedingQueueAttributes> {

}

export class FeedingQueue extends Model<FeedingQueueAttributes, FeedingQueueInput> implements FeedingQueueAttributes {

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

FeedingQueue.init(
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
        tableName: CONFIG.BUILDINGS,
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true
    }
);

FeedingQueue.hasMany(Building, { foreignKey: "processId", onDelete: "RESTRICT" });
FeedingQueue.hasMany(Unit, { foreignKey: "processId", onDelete: "RESTRICT" });

