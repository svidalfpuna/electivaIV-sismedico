const db = require("../models");
const Paciente = db.pacientes;
const Persona = db.personas;

exports.obtenerPacientes = async (req, res) => {
    try {
        const pacientesConPersona = await Paciente.findAll({
            include: {
                model: Persona,
                as: "persona",
                attributes: ["nombre", "apellido", "cedula", "email", "telefono", "fechaNacimiento"],
            },
        });
        const pacientes = pacientesConPersona.map((paciente) => (
            {
                id: paciente.id,
                ...paciente.persona.dataValues
            }
        ));
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al obtener pacientes.' });
    }
};

exports.crearPaciente = async (req, res) => {
    try {
        const { nombre, apellido, cedula, email, telefono, fechaNacimiento } = req.body;
        const persona = await Persona.create({ nombre, apellido, cedula, email, telefono, fechaNacimiento });
        const paciente = await Paciente.create({ personaId: persona.id });

        console.log(paciente)
        res.status(201).json({
            id: paciente.dataValues.id,
            ...persona.dataValues,
        });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al crear paciente.' });
    }
};

exports.actualizarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        const persona = await Persona.findByPk(paciente.personaId);
        if (!persona) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        await persona.update(req.body);
        res.json({
            id: id,
            ...persona.dataValues,
        });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al actualizar paciente.' });
    }
};

exports.borrarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado.' });
        }

        const persona = await Persona.findByPk(paciente.personaId);

        await paciente.destroy();
        if (persona) await persona.destroy();
        res.json({ message: 'Paciente eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al eliminar paciente.' });
    }
};