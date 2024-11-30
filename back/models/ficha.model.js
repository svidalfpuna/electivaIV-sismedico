module.exports = (sequelize, Sequelize) => {
    const FichaClinica = sequelize.define('fichasclinica', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW,
        },
        motivo: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        diagnostico: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        tratamiento: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    });

    return FichaClinica;
}