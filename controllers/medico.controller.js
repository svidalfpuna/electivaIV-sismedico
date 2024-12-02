const jwt = require('jsonwebtoken');
const db = require("../models");
const Medico = db.medicos;
const Persona = db.personas;

const SECRET_KEY = 'CLAVE_TOKEN';

exports.obtenerMedicos = async (req, res) => {
    try {
        const medicosConPersona = await Medico.findAll({
            include: {
                model: Persona,
                as: "persona",
                attributes: ["nombre", "apellido", "cedula", "email", "telefono", "fechaNacimiento"],
            },
        });
        const medicos = medicosConPersona
            .filter((medico) => medico.persona)
            .map((medico) => ({
                id: medico.id,
                ...medico.persona.dataValues,
            }));
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al obtener médicos.' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Medico.findOne({
            include: {
                model: Persona,
                as: "persona",
                attributes: ["nombre", "apellido", "cedula", "email", "telefono", "fechaNacimiento"],
            },
            where: {
                username: username,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.password === password) {
            const payload = {
                id: user.id,
                nombre: user.persona.nombre + " " + user.persona.apellido,
            };
            const token = jwt.sign(payload, SECRET_KEY);
            return res.status(200).json({ message: 'Login exitoso', token });
        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message || 'Error al obtener médicos.' });
    }
};

exports.crearMedico = async (req, res) => {
    try {
        const { nombre, apellido, cedula, email, telefono, fechaNacimiento, especialidadId, username, password } = req.body;
        const user = await Medico.findOne({
            where: {
                username: username,
            },
        });
        if (user) {
            return res.status(409).json({ message: 'username ya existente' });
        };
        const persona = await Persona.create({
            nombre, apellido, cedula, email, telefono, fechaNacimiento
        });
        const medico = await Medico.create({
            personaId: persona.id, especialidadId, username, password
        });

        const payload = {
            id: medico.id,
            nombre: persona.nombre + " " + persona.apellido,
        };
        const token = jwt.sign(payload, SECRET_KEY);

        res.status(201).json({
            token
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
            await medico.destroy();
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
