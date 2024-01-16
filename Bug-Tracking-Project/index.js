import express from 'express';
import env from 'dotenv';
import DB_Init from './src/models/DB_Init.js';
import createDbRouter from './src/routes/createDBRouter.js';
import projectsRouter from './src/routes/projectsRouter.js';
import usersRouter from './src/routes/usersRouter.js';
import bugsRouter from './src/routes/bugsRouter.js';
import cors from "cors";



env.config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

DB_Init();

app.use(cors());
app.use("/api", createDbRouter);
 app.use("/api", projectsRouter);
 app.use("/api", usersRouter);
 app.use("/api",bugsRouter);

let port = process.env.PORT || 8001;
app.listen(port);
console.log('API is runnning at ' + port);