module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define('personas', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cedula: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
        },
        telefono: {
            type: Sequelize.STRING,
        },
        fechaNacimiento: {
            type: Sequelize.DATEONLY,
        },
    });

    return Persona;
};
