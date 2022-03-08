import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import CONFIG from "../../config/config"
import FeedingService from "../dal/process";
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


    gainHealth(buildingInterval: number): void {

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
            defaultValue: getRandomPoints(),
            get() {
                const lastFed = this.getDataValue('lastFed');
                // 'this' allows you to access attributes of the instance
                const isRecentlyFed = new Date().getTime() - new Date(lastFed).getTime();
                const diff = Math.floor(isRecentlyFed / 1000);


                const health = this.getDataValue('unitHealth');
                let newHealth = health - Math.floor(diff / CONFIG.UNIT_FEEDING_INTERVAL);
                newHealth = newHealth < 0 ? 0 : newHealth;
                this.setDataValue('unitHealth', newHealth);
                return newHealth;
            }
        },
        lastFed: {
            type: DataTypes.DATE,   
            defaultValue: new Date().toISOString(),

        },
        alive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            get() {
                const lastFed = this.getDataValue('lastFed');
                // 'this' allows you to access attributes of the instance
                const isRecentlyFed = new Date().getTime() - new Date(lastFed).getTime();
                const diff = Math.floor(isRecentlyFed / 1000);


                const health = this.getDataValue('unitHealth');
                let newHealth = health - Math.floor(diff / CONFIG.UNIT_FEEDING_INTERVAL);

                return newHealth > 0 ? true : false;
            }

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


export function getRandomPoints() {

    while (true) {
        let points = Math.floor(Math.random() * 100);
        if (points > CONFIG.MIN_RANDOM_HEALTH && points <= CONFIG.MAX_RANDOM_HEALTH) {
            return points;
        }
    }
}

