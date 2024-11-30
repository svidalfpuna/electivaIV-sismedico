const db = require("../models");
const Medico = db.medicos;
const Persona = db.personas;

exports.obtenerMedicos = async (req, res) => {
    try {
        const medicosConPersona = await Medico.findAll({
            include: {
                model: Persona,
                as: "persona",
                attributes: ["id", "nombre", "apellido", "cedula", "email", "telefono", "fechaNacimiento"],
            },
        });
        const medicos = medicosConPersona.map((medico) => (
            {
                id: medico.id,
                ...medico.persona.dataValues
            }
        ));
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al obtener médicos.' });
    }
};

exports.crearMedico = async (req, res) => {
    try {
        const { nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, usuario, password } = req.body;
        const persona = await Persona.create({ nombre, apellido, cedula, email, telefono, fechaNacimiento });
        const medico = await Medico.create({ especialidad, usuario, password });
        res.status(201).json({
            id: medico.id,
            ...persona.dataValues,
            especialidad: medico.especialidad,
            usuario: medico.usuario,
            password: medico.password,
        });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al crear médico.' });
    }
};

exports.actualizarMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidad, usuario, password } = req.body;
        const medico = await Medico.findByPk(id);

        if (!medico) {
            return res.status(404).json({ error: 'Médico no encontrado.' });
        }

        const persona = await Persona.findByPk(medico.personaId);

        if (!persona) {
            return res.status(404).json({ error: 'Médico no encontrado.' });
        }

        const camposMedico = ["especialidad", "usuario", "password"];
        const paraMedicos = camposMedico.filter((key) => Object.keys(req.body).includes(key));
        const paraPersonas = camposMedico.filter((key) => !Object.keys(req.body).includes(key));

        if (paraMedicos.length > 0) await medico.update({ especialidad, usuario, password });
        if (paraPersonas.length > 0) await persona.update({ nombre, apellido, cedula, email, telefono, fechaNacimiento });

        res.json({
            id: medico.id,
            ...persona.dataValues,
            especialidad: medico.especialidad,
            usuario: medico.usuario,
            password: medico.password,
        });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error al actualizar médico.' });
    }
};

exports.borrarMedico = async (req, res) => {
    try {
        const { id } = req.params;
        const medico = await Medico.findByPk(id);

        if (!medico) {
            return res.status(404).json({ error: 'Médico no encontrado.' });
        }

        const persona = await Persona.findByPk(id);

        await medico.destroy();
        if (persona) await persona.destroy();
        res.json({ message: 'Médico eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al eliminar médico.' });
    }
};
