const db = require("../models");
const Especialidad = db.especialidades;

exports.obtenerEspacialidades = async (req, res) => {
    try {
        const especialidad = await Especialidad.findAll();
        res.status(200).json(especialidad);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al obtener espacialidades.' });
    }
};

exports.crearEspacialidades = async (req, res) => {
    try {
        const { nombre } = req.body;

        const especialidad = await Especialidad.create({ nombre });
        res.status(201).json(especialidad);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al crear ficha clínica.' });
    }
};
