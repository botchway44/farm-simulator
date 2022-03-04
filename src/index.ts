import { Application, Request, Response } from 'express'
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const app: Application = express()

// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({ message: `Welcome to the Farm simulator API!` })
})


try {
    const port = 3000
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    });
} catch (error: any) {
    console.log("Error Message", error?.message)
}
