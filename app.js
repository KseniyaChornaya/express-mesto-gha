const express = require('express');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(routes);

async function connect() {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT);
}

connect();
app.use(errors());
app.use(errorHandler);
