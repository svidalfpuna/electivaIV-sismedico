module.exports = app => {
    const fichas = require('../controllers/ficha.controller');
    var router = require('express').Router();

    router.get('/', fichas.obtenerFichas);

    router.post('/', fichas.crearFicha);

    //router.put('/:id', medicos.actualizarMedico);

    //router.delete('/:id', medicos.borrarMedico);

    app.use('/api/fichasClinicas', router);
}