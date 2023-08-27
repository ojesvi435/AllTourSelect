const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//4)Error Handler
//app.all(*(req,res,next)=>{
// const error=new Error("")
//err.statusCode=404;
//err.status="fail"
//next(err);
//})
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//app.use((err,req,res,next)=>{
//err.statusCode=err.statusCode || 500
//err.status=err.status||'error'
//res.status(err.statusCode).json({status:err.status,message:err.message})
//})
app.use(globalErrorHandler);

module.exports = app;
