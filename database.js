require('dotenv').config()
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    logging: console.log,
    timestamps: false,
})

module.exports = sequelize