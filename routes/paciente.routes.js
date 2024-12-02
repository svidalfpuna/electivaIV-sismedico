module.exports = app => {
    const pacientes = require('../controllers/paciente.controller.js');
    var router = require('express').Router();

    router.get('/', pacientes.obtenerPacientes);

    router.post('/', pacientes.crearPaciente);

    router.put('/:id', pacientes.actualizarPaciente);

    router.delete('/:id', pacientes.borrarPaciente);

    app.use('/api/pacientes', router);
}