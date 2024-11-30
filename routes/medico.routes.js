module.exports = app => {
    const medicos = require('../controllers/medico.controller.js');
    var router = require('express').Router();

    router.get('/', medicos.obtenerMedicos);

    router.post('/', medicos.crearMedico);

    router.put('/:id', medicos.actualizarMedico);

    router.delete('/:id', medicos.borrarMedico);

    router.post('/login', medicos.login);

    app.use('/api/medicos', router);
}