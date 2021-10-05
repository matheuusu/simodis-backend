const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(`${process.env.BANCO}`, `${process.env.USER}`, `${process.env.PASSWORD}`, {
    host: 'db4free.net',
    dialect: 'mysql'
})

module.exports = sequelize;









































