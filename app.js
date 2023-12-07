var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

//bắt đầu từ đây
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');
const newsRouter = require('./routes/news');
const mongoose = require('mongoose');
const cors = require('cors');
//ket noi mongoose
mongoose.connect('mongodb://localhost:27017/demo123')
  .then(() => console.log('Connected successfully'))
  .catch(err => console.log(err));
  require('./components/categories/model');
  require('./components/products/model');
  require('./components/users/model');
  require('./components/users/modelIPR');
  require('./components/mobileApp/model');
  require('./components/users/modelGame');
var app = express();

// view engine setup
//không chạm
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Xử lý dữ liệu URL-encoded
//không cham


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/news', newsRouter);
//kết thúc ở đây

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(createError(404))
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
