const Sequelize = require('sequelize')

const sequelize = require('../database')

const Promocode = sequelize.define('promocode', {
    code_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    code: {
        type: Sequelize.STRING(5), 
        allowNull: false
    },

    
    is_activated: {
        type:Sequelize.BOOLEAN,
        defaultValue: false
    },

    expire_days: {
        type:Sequelize.INTEGER,
        allowNull: false
    },

    activated_at: {
        type: Sequelize.DATE
    }
    
})

module.exports = Promocode