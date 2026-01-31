
const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    const status = err.status || 500;
    const message = err.message || "SERVER ERROR"

    res.status(status).json({
        success: false,
        message: message
    })
}

module.exports = errorHandler;