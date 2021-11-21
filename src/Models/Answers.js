const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Answers: os dados serão registrados no Banco com essa estrutura
    Questions: sequelize.define('answers', {
        id_questions: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        },
        isTrue: {
            type: Sequelize.BOOLEAN
        }
    })
    
}
