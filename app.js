const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { validateUserLogin, validateUser} = require('./utils/validations/user-validation');
const errorHandler = require('./middlewares/error-handler');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//   req.user = {
//     _id: '6396fbecf369fb5dc2b758ec',
//   };
//   next();
// });
app.use(auth, routes);
app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUser, createUser); 
async function connect() {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT);
}

connect();

app.use(errorHandler);
