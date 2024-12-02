const db = require("../models");
const FichaClinica = db.fichas;
const Paciente = db.pacientes;
const Especialidad = db.especialidades;
const Persona = db.personas;
const Medico = db.medicos;

exports.obtenerFichas = async (req, res) => {
    try {
        const { especialidadId, fecha, pacienteId, medicoId } = req.query;
        const where = {};

        if (especialidadId) where['$medico.especialidadId$'] = especialidadId;
        if (fecha) where.fecha = fecha;
        if (pacienteId) where.pacienteId = pacienteId;
        if (medicoId) where.medicoId = medicoId;

        const fichas = await FichaClinica.findAll({
            where,
            include: [
                {
                    model: Medico,
                    as: 'medico',
                    attributes: [
                        'especialidadId'],
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['nombre', 'apellido'],
                        },
                        {
                            model: Especialidad,
                            as: 'especialidad',
                            attributes: ['nombre'],
                        }
                    ],
                },
                {
                    model: Paciente,
                    as: 'paciente',
                    include: [
                        {
                            model: Persona,
                            as: 'persona',
                            attributes: ['nombre', 'apellido'],
                        },
                    ],
                },
            ],
        });
        
        console.log(fichas);
        const formateoFichas = fichas.map(ficha => ({
            id: ficha.id,
            fecha: ficha.fecha,
            paciente: ficha.paciente?.persona
                ? ficha.paciente.persona.nombre + " " + ficha.paciente.persona.apellido
                : "Paciente no asignado",
            medico: ficha.medico?.persona
                ? ficha.medico.persona.nombre + " " + ficha.medico.persona.apellido
                : "Médico no asignado",
            especialidad: ficha.medico?.especialidadId || "Especialidad no asignada",
            motivo: ficha.motivo,
            diagnostico: ficha.diagnostico,
            tratamiento: ficha.tratamiento,
        }));
        console.log(formateoFichas);
        res.json(formateoFichas);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al obtener fichas clínicas.' });
    }
};

exports.crearFicha = async (req, res) => {
    try {
        const { fecha, pacienteId, medicoId, motivo, diagnostico, tratamiento } = req.body;

        const paciente = await Paciente.findByPk(pacienteId);
        const medico = await Medico.findByPk(medicoId);

        if (!medico) {
            return res.status(404).json({ error: 'Medico no encontrado.' });
        }
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        const ficha = await FichaClinica.create({ fecha, pacienteId, medicoId, motivo, diagnostico, tratamiento });
        res.status(201).json(ficha);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al crear ficha clínica.' });
    }
};
