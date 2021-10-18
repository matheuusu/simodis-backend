const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Course: os dados serão registrados no Banco com essa estrutura
    Course: sequelize.define('coursers', {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        users_id: {
            type: Sequelize.INTEGER
        }
    })
    
}