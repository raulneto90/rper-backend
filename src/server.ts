import dotenv from "dotenv";
import 'reflect-metadata';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import AppError from "./errors/AppError";

import uploadConfig from './config/upload';
import './database';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    } else {
        console.log("Unexpected Error", err);
        return response.status(500).json({
            status: 'error',
            message: 'Unexpected Error',
        });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`);
});