const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Class: os dados serão registrados no Banco com essa estrutura
    Class: sequelize.define('classes', {        
        users_id: {
            type: Sequelize.INTEGER
        },
        course_id: {
            type: Sequelize.INTEGER
        }
    })    
}
