const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Roles: os dados serão registrados no Banco com essa estrutura
    Roles: sequelize.define('rolers', {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    })
    
}
