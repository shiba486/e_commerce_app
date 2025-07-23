class errorHandler extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || 'internal server error';
    err.statusCode = err.statusCode || 500 ;

    if(err.name==='CastError'){
       const message = `Resource not found ! invalid ${err.path}`;
            err = new errorHandler(message,400)
    }
    
    if(err.code===11000){
       const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            err = new errorHandler(message,400)
    }
    if(err.name=='JsonWebTokenError'){
       const message = `JsonwebToken is invalid. please Try again`;
            err = new errorHandler(message,400)
    }
    if(err.name=='TokenExpiredError'){
       const message = `JsonwebToken is expired`;
            err = new errorHandler(message,400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}

export {errorHandler}