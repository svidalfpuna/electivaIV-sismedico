const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.fichas = require("./ficha.model.js")(sequelize, Sequelize);
db.personas = require("./persona.model.js")(sequelize, Sequelize);
db.medicos = require("./medico.model.js")(sequelize, Sequelize);
db.pacientes = require("./paciente.model.js")(sequelize, Sequelize);
db.especialidades = require("./espacialidad.model.js")(sequelize, Sequelize);

db.medicos.associate(db);
db.pacientes.associate(db);

db.medicos.hasMany(db.fichas, { foreignKey: 'medicoId', as: 'fichasclinica' });
db.fichas.belongsTo(db.medicos, { foreignKey: 'medicoId', as: 'medico' });

db.pacientes.hasMany(db.fichas, { foreignKey: 'pacienteId', as: 'fichasclinica' });
db.fichas.belongsTo(db.pacientes, { foreignKey: 'pacienteId', as: 'paciente' });

module.exports = db;