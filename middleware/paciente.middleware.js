const { body, validationResult } = require("express-validator");

exports.validarPaciente = [
    body("nombre").optional().notEmpty().withMessage("El nombre no debe estar vacío si se envia."),
    body("apellido").optional().notEmpty().withMessage("El apellido no debe estar vacío si se envia."),
    body("cedula").optional().notEmpty().withMessage("La cédula no debe estar vacía si se envia."),
    body("email").optional().isEmail().withMessage("Debe proporcionar un email válido si se envia."),
    body("fechaNacimiento")
        .optional()
        .isDate()
        .withMessage("La fecha de nacimiento debe tener un formato válido."),
    (req, res, next) => {
        const errores = validationResult(req);
        const camposEsperados = ["especialidad", "usuario", "password", "nombre", "apellido", "cedula", "email", "telefono", "fechaNacimiento"];
        const adicionales = Object.keys(req.body).filter((key) => !camposEsperados.includes(key));
        if (Object.keys(req.body).length === 0 || adicionales.length > 0) {
            return res.status(400).json({ message: "Atributos inválidos o no enviado" });
        }
        if (!errores.isEmpty()) {
            return res.status(400).json({ message: errores.array().map(error => error.msg) });
        }
        next();
    },
];
