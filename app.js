require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/users');
const { NOT_FOUND_STATUS_CODE } = require('./utils/constants');
const { auth } = require('./middlewares/auth');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND_STATUS_CODE).send({ message: 'Страница не найдена' });
});

mongoose.connect(DB_ADDRESS);

app.listen(PORT);
