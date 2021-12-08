const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Questions: os dados serão registrados no Banco com essa estrutura
    Questions: sequelize.define('questions', {
        title: {
            type: Sequelize.STRING
        },
        course_id: {
            type: Sequelize.INTEGER
        },
        question_score: {
            type: Sequelize.INTEGER
        }
    })
}
