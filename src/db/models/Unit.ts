import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import CONFIG from "../../config/config"

export interface UnitAttributes {
    id: string | undefined;

    name: string;
    buildingId: string;

    unitHealth: number;
    feedingInterval: number;
    lastFed: Date;
    alive: boolean;

    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}


export interface UnitInput extends Omit<UnitAttributes, 'id' | 'unitHealth' | 'feedingInterval' | 'lastFed' | 'alive'> { }
export interface UnitOuput extends Required<UnitAttributes> { }

export class Unit extends Model<UnitAttributes, UnitInput> implements UnitAttributes {

    public id!: string;
    public name!: string;
    public buildingId!: string;

    public unitHealth!: number;
    public feedingInterval!: number;

    public lastFed!: Date;
    public alive!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;


    initiateFeeding(): void {
    }
}

Unit.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                const title = this.getDataValue('name');
                // 'this' allows you to access attributes of the instance
                return this.getDataValue('name') + ' (' + title + ')';
            },
        },
        unitHealth: {
            type: DataTypes.INTEGER,
            defaultValue: getRandomPoints()

        },
        lastFed: {
            type: DataTypes.DATE,
            defaultValue: new Date().toISOString(),

        },
        alive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,

        },
        feedingInterval: {
            type: DataTypes.INTEGER,
            defaultValue: CONFIG.UNIT_FEEDING_INTERVAL,

        },
        buildingId: {
            type: DataTypes.STRING,
            allowNull: false,

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
        tableName: CONFIG.UNITS,
        timestamps: true,
        sequelize: sequelizeConnection,
        paranoid: true
    }
);


function getRandomPoints() {

    while (true) {
        let points = Math.floor(Math.random() * 100);
        if (points > 50 && points <= 100) {
            console.log("Points computed", points);
            return points;
        }
    }
}

