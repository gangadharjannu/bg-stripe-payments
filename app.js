var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var secretRouter = require('./routes/secret');
var paymentsRouter = require('./routes/payments');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/secret', secretRouter);
app.use('/payments', paymentsRouter);
module.exports = app;
