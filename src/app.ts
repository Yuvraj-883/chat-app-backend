/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'; 
import { Response, Request } from 'express';
import deepseeRouter from './routes/deepseek.route'
import cors from 'cors';

const app = express(); 
app.use(cors({ origin: '*' }));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Disable warning for unused 'req' parameter on this line
app.get('/', (_req:Request, res: Response) => {
    res.send("Jai Shree Ram");
});
app.use('/api', deepseeRouter);


export default app; 
