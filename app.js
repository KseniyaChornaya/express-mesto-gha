const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const errorHandler = require('./middlewars/error-handler');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } =
  process.env;
const app = express();
app.use(express.json());

app.use(routes);

async function connect() {
  await mongoose.connect(MONGO_URL);
  console.log(`App connect db ${MONGO_URL}`);

  app.listen(PORT);
  console.log(`App listening at port ${PORT}`);
}

connect();

app.use(errorHandler);
