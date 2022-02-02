const errorMiddlewareHandler = (err, req, res, next) => {
    //setting status code
    const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.statusCode(errorStatusCode);
    res.json({
        message: err.message,
    });
};

module.exports = { errorMiddlewareHandler };