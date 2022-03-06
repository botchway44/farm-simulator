import { Application, Request, Response } from 'express'
import { defaultValueSchemable } from 'sequelize/types/utils';
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app: Application = express();
import routes from './api/routes/index';


export const get = () => {
    const app: Application = express()

    // Middlewares
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/v1', routes)

    return app
}



