const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Grades: os dados serão registrados no Banco com essa estrutura
    Grades: sequelize.define('graders', {
        scors: {
            type: Sequelize.INTEGER
        },
        users_id: {
            type: Sequelize.INTEGER
        },
        course_id: {
            type: Sequelize.INTEGER
        }
    })    
}
