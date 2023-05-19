import fs from 'fs';
import path from 'path';

import { Application } from "express";
import morgan from "morgan";

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

export const setupLogging = (app: Application) => {
    app.use(morgan('tiny'));
    app.use(morgan('combined', { stream: accessLogStream }));
}