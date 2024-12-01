const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = require("./models");
const Especialidad = db.especialidades;
db.sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al conectar con la BD:', err));

app.get("/", (req, res) => {
    res.json({ message: "Bienvenido al sistema medico" });
});

async function poblarEspecialidades() {
    const especialidades = ['Pediatra', 'Dermatologo', 'Clinico'];

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
require("./routes/espacialidad.routes")(app);

app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
