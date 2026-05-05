require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require("./db");

var indexRouter = require('./routes/index');
const categoryRoutes = require('./routes/categoryRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

var app = express();
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/categories', categoryRoutes);
app.use('/recipes', recipeRoutes);

module.exports = app;