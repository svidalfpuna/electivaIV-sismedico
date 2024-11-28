const db = require("../models");
const FichaClinica = db.fichas;
const Paciente = db.pacientes;
const Medico = db.medicos;

exports.obtenerFichas = async (req, res) => {
    try {
        const { especialidad, fecha, pacienteId, medicoId } = req.query;
        const where = {};

        if (especialidad) where.especialidad = especialidad;
        if (fecha) where.fecha = fecha;
        if (pacienteId) where.pacienteId = pacienteId;
        if (medicoId) where.medicoId = medicoId;

        const fichas = await FichaClinica.findAll({ where });
        res.json(fichas);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al obtener fichas clínicas.' });
    }
};

exports.crearFicha = async (req, res) => {
    try {
        const { fecha, pacienteId, medicoId, motivo, diagnostico, tratamiento } = req.body;

        const paciente = await Paciente.findByPk(pacienteId);
        const medico = await Medico.findByPk(medicoId);

        if (!paciente || !medico) {
            return res.status(404).json({ error: 'Paciente o Médico no encontrado.' });
        }

        const ficha = await FichaClinica.create({ fecha, pacienteId, medicoId, motivo, diagnostico, tratamiento });
        res.status(201).json(ficha);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al crear ficha clínica.' });
    }
};
