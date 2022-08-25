const Sequelize = require('sequelize')

const sequelize = require('../database')

const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    first_name: {
        type: Sequelize.STRING, 
        allowNull: false
    },

    last_name: {
        type: Sequelize.STRING, 
        allowNull: false
    },

    iin: {
        type: Sequelize.STRING(12), 
        allowNull: false
    },

    phone_no: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },

    picture: {
        type:Sequelize.STRING,
        defaultValue: 'static/img/avatar.png'
    },

    is_active: {
        type:Sequelize.BOOLEAN,
        defaultValue: false
    },

    created_at: {
        type: Sequelize.DATE,
    },
    
    promo_id_fk:{
        type: Sequelize.INTEGER,
        references :{
            model: 'promocodes',
            key: 'code_id'
        }
    }},
    {timestamps: false}
    )

module.exports = User