
export const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = status === 500 ? "Internal Server Error" : err.message;
    if(status === 500){
      loggers.log("error", `${err.path || ""} - ${err.message}`);
    }
  
    res.status(status).json({
      error: {
        message,
        status,
      },
    });
  };
  