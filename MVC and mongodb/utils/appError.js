class AppError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        // console.log("inside app error");
        this.status=`${statusCode}`.startsWith(4) ?'fail':'error';
        this.isOperational=true;

        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports= AppError;