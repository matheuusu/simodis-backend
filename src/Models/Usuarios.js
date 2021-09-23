const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Usuário: os dados serão registrados no Banco com essa estrutura
    Usuarios: sequelize.define('users', {
        nome: {
            type: Sequelize.STRING
        },
        senha: {
            type: Sequelize.STRING
        },    
        matricula: {
            type: Sequelize.INTEGER
        },
        curso: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        }
    })
    
}
