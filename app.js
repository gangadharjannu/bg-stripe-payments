var express = require('express');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var paymentsRouter = require('./routes/payments');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/payments', paymentsRouter);
module.exports = app;
