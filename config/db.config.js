module.exports = {
  HOST: "prueba.postreges",
  USER: "postgres",
  PASSWORD: "ASDasdfasdf,.",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: true
};