import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import frontendRoutes from './routes/frontend.js';
import generalRoutes from './routes/general.js';
import managementRouter from './routes/managment.js';
import salesRoutes from './routes/frontend.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/frontend', frontendRoutes);
app.use('/general', generalRoutes);
app.use('/managment', managementRouter);
app.use('/sales', salesRoutes);

