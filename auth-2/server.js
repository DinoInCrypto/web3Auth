const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const authController = require('./authController');
dotenv.config({ path: './config.env' });

const app = express();
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.post('/login', authController.signatureVerify, authController.login);
app.use(express.static(path.join(__dirname, 'client')));

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected');
  });

const port = 3000;
const server = app.listen(port, () => {
  console.log(`app is running port ${port}`);
});
