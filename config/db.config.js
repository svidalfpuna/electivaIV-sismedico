module.exports = {
    HOST: "database-svl.cbc88csik6kl.us-east-2.rds.amazonaws.com",
    USER: "postgres",
    PASSWORD: "ASD.12,.",
    DB: "electivaIV",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: true //loguea cada interaccion con la base de datos
};