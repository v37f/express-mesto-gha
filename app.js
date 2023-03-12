require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/error-handler');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

mongoose.connect(DB_ADDRESS);

app.listen(PORT);
