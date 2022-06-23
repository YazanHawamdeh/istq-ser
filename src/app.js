const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { startUpFunction } = require('./config/startup-function');
// const fileUpload = require('express-fileupload');

require('dotenv').config();
require('./config/database-connection');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/build')));
// app.use(express.static(path.join(__dirname, 'images')));
// app.use(fileUpload({}));

app.use('/apis', indexRouter);

app.use('/images', express.static('images'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/build/index.html')));

startUpFunction();

module.exports = app;
