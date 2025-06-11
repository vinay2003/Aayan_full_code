import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { cookie } from 'express-validator';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbconnect from './config/db.js';

const app = express();
dotenv.config({path: './config/.env'});

app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
        createParentPath: true,
        limits: { fileSize: 50 * 1024 * 1024 },
    })
);

dbconnect();

export default app;