module.exports = (sequelize, Sequelize) => {
    const Medico = sequelize.define('medicos', {
        personaId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'personas',
                key: 'id',
            },
        },
        especialidad: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['Pediatra', 'Dermatologo', 'Clinico']],
            },
        },
        usuario: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
    });

    Medico.associate = (models) => {
        Medico.belongsTo(models.personas, { foreignKey: 'personaId', as: 'persona' });
    };

    return Medico;
};
