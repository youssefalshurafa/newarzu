import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connect from './database/conn.js';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
const port = 5000;

app.get('/', (req, res) => {
  res.status(201).json('HOME GET REQUEST');
});

connect()
  .then(() => {
    try {
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
