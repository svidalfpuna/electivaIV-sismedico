const loggerRequestMiddleware = (req, res, next) => {
    console.log(`Recibido: ${req.method} ${req.url}`);
    next();
};

module.exports = loggerRequestMiddleware;
