import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

export interface UnitAttributes {
    id: string;
    name: string;
    unitHealth: number;
    feedingInterval: number;
    buildingId: string;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export interface UnitInput extends Optional<UnitAttributes, 'id'> { }
export interface UnitOuput extends Required<UnitAttributes> { }

export class Unit extends Model<UnitAttributes, UnitInput> implements UnitAttributes {
    public id!: string;
    public name!: string;
    public unitHealth!: number;
    public feedingInterval!: number;
    public buildingId!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;




}

Unit.init(
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
        unitHealth: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        feedingInterval: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        buildingId: {
            type: DataTypes.STRING,
            allowNull: false
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
        tableName: "units",
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true
    }
);