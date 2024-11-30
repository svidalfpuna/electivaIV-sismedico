module.exports = (sequelize, Sequelize) => {
    const Paciente = sequelize.define('pacientes', {});

    Paciente.associate = (models) => {
        Paciente.belongsTo(models.personas, { foreignKey: 'personaId', as: 'persona' });
    };

    return Paciente;
};
