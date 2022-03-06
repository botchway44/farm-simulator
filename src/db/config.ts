import { Dialect, Sequelize } from 'sequelize'
require('dotenv').config();

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    ssl: false,
    dialect: "postgres",
    sync: { force: true },
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false, // very important
        }
    }
})

export default sequelizeConnection