const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Answers: os dados serão registrados no Banco com essa estrutura
    Answers: sequelize.define('answers', {
        id_questions: {
            type: Sequelize.STRING
        },

        answer_false: {
            type: Sequelize.STRING
        },

        answer_true: {
            type: Sequelize.STRING
        },

        isTrue: {
            type: Sequelize.BOOLEAN
        }
    })
    
}
