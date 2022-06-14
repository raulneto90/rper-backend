import dotenv from "dotenv";
import 'reflect-metadata';
import cors from 'cors';

import express from 'express';
import routes from './routes'

import './database';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`);
});