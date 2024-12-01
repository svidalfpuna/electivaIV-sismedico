module.exports = (sequelize, Sequelize) => {
    const Especialidad = sequelize.define('especialidades', {
        nombre: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
    });

    return Especialidad;
};