 const errorHandler =(statusCode,message)=>{
    const error =new Error();
    error.statusCode=statusCode;
    error.messag=message;
    return error;
}

export default errorHandler;