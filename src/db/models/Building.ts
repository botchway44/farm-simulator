import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { Unit } from './Unit';

interface BuildingAttributes {
    id: string | undefined;
    name: string;
    feedingInterval: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface BuildingInput extends Optional<BuildingAttributes, 'id'> { }
export interface BuildingOuput extends Required<BuildingAttributes> { }

export class Building extends Model<BuildingAttributes, BuildingInput> implements BuildingAttributes {

    public id!: string
    public name!: string
    public feedingInterval!: number;

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
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        feedingInterval: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
        tableName: "buildings",
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true
    }
);

Building.hasMany(Unit, { foreignKey: "buildingId", onDelete: "RESTRICT" });
