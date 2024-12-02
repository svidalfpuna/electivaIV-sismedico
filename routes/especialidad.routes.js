module.exports = app => {
    const espacialidades = require('../controllers/especialidad.controller');
    var router = require('express').Router();

    router.get('/', espacialidades.obtenerEspacialidades);

    router.post('/', espacialidades.crearEspacialidades);

    app.use('/api/especialidades', router);
}