import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connect from './database/conn.js';
import router from './router/routes.js';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
const port = 5000;

app.use('/', router);

connect()
  .then(() => {
    try {
      console.log('DB connected');
      app.listen(port, () => {
        console.log(`server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log('Cannot connect to server');
    }
  })
  .catch((err) => {
    console.log('Invalid database connection');
  });
