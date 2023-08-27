const express = require('express');
const morgan = require('morgan');
const AppError=require('./utils/appError').default
const globalErrorHandler=require('./controllers/errorController')
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
  // console.log(req.headers);
  next();
});

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });
// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


app.all('*',(req,res,next)=>{
   console.log("hello");
  next(new AppError(`Can't find ${req.originalUrl} on this server!`,400   ));
})
  // res.status(400).json({
  //   status:'fail',
  //   message:`Can find ${req.originalUrl} on this server`
  // })
  //sends it to the global error handler
//error handling middleware
app.use(globalErrorHandler);

module.exports = app;
