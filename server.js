const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al conectar con la BD:', err));

app.get("/", (req, res) => {
    res.json({ message: "Bienvenido al sistema medico" });
});

require("./routes/paciente.routes")(app);
require("./routes/medico.routes")(app);
require("./routes/fichas.routes")(app);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
