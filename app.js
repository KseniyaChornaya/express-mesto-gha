const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6396fbecf369fb5dc2b758ec',
  };
  next();
});
app.use(routes);

async function connect() {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT);
}

connect();

app.use(errorHandler);
