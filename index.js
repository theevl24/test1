require('dotenv').config();

const express = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(
    DB_NAME, DB_USER, DB_PASSWORD,
    { host: DB_HOST, port: DB_PORT, dialect: 'postgres' }
);

const app = express();
app.use(bodyParser.json());

// Подключение всех роутеров из /routes/index.js

const allRoutes = require('./routes');
app.use('/', allRoutes);

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('--- ENV CHECK ---');
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_PORT:', process.env.DB_PORT);
  console.log('--- END ENV CHECK ---');
  console.log(`Backend running on port ${PORT}`);
});