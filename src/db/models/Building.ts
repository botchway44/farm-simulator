import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { Unit } from './Unit';
import CONFIG from "../../config/config"
interface BuildingAttributes {
    id: string | undefined;

    name: string;
    unitType: string;

    feedingInterval: number;
    numOfUnits: number;
    lastFed: Date;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface BuildingInput extends Omit<BuildingAttributes, 'id' | 'feedingInterval' | 'feedingInterval' | 'numOfUnits' | 'lastFed'> { }
export interface BuildingOuput extends Required<BuildingAttributes> {

}

export class Building extends Model<BuildingAttributes, BuildingInput> implements BuildingAttributes {

    public id!: string
    public name!: string
    public unitType!: string
    public feedingInterval!: number;
    public numOfUnits!: number;
    public lastFed!: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    initiateFeeding(): void {
    }
}

Building.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unitType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numOfUnits: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        feedingInterval: {
            type: DataTypes.INTEGER,
            defaultValue: CONFIG.BUILDING_FEEDING_INTERVAL
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        lastFed: {
            type: DataTypes.DATE,
            defaultValue: new Date().toISOString(),
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

Building.hasMany(Unit, { foreignKey: "buildingId", onDelete: "RESTRICT" });

