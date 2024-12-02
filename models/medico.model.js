module.exports = (sequelize, Sequelize) => {
    const Medico = sequelize.define('medicos', {
        personaId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'personas',
                key: 'id',
            },
        },
        especialidadId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'especialidades',
                key: 'id',
            },
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
    });

    Medico.associate = (models) => {
        Medico.belongsTo(models.personas, { foreignKey: 'personaId', as: 'persona' });
        Medico.belongsTo(models.especialidades, { foreignKey: 'especialidadId', as: 'especialidad' });
    };

    return Medico;
};
