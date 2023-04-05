import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connect from './database/conn.js';
import router from './router/routes.js';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
import bodyParser from 'body-parser';
import ProductModel from './model/Product.model.js';

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
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
