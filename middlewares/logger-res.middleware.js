const loggerResponseMiddleware = (req, res, next) => {
    res.on('finish', () => {
        console.log(`Respondido: ${res.statusCode} ${req.method} ${req.originalUrl}`);
    });
    next();
};

module.exports = loggerResponseMiddleware;
