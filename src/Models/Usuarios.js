const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Usuário: os dados serão registrados no Banco com essa estrutura
    Usuarios: sequelize.define('users', {
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },    
        enrollment: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        isAdmin: {
            type: Sequelize.BOOLEAN
        },
        token: {
            type: Sequelize.STRING
        }
    })
    
    
}
