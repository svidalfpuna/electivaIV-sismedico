const express = require('express');
const cors = require('cors');
const loggerReqMiddleware = require('./middlewares/logger-req.middleware');
const loggerResMiddleware = require('./middlewares/logger-res.middleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(loggerReqMiddleware);
app.use(loggerResMiddleware);

const db = require("./models");
const Especialidad = db.especialidades;
db.sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al conectar con la BD:', err));

app.get("/", (req, res) => {
    res.json({ message: "Bienvenido al sistema medico" });
});

async function poblarEspecialidades() {
    const especialidades = ['Pediatra', 'Dermatologo', 'Clinico', 'Alergologo', 'Cardiologo',
        'Endocrinologo', 'Geriatra', 'Ginecologo', 'Neurologo', 'Oncologo',
        'Oftalmologo', 'Ortopedista', 'Otorrinolaringologo', 'Psiquiatra',
        'Reumatologo', 'Urologo', 'Cirujano General', 'Neurocirujano'];

    for (let especialidad of especialidades) {
        await Especialidad.findOrCreate({
            where: { nombre: especialidad },
        });
    }
}
poblarEspecialidades()
    .then(() => {
        console.log('Especialidades pobladas correctamente.');
    })
    .catch((error) => {
        console.error('Error al poblar las especialidades:', error);
    });


require("./routes/paciente.routes")(app);
require("./routes/medico.routes")(app);
require("./routes/fichas.routes")(app);
require("./routes/especialidad.routes")(app);

app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
