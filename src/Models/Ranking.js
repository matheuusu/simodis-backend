const Sequelize = require('sequelize');
const sequelize = require('../Dao/DB');

module.exports = {
    //Model de Ranking: os dados serão registrados no Banco com essa estrutura
    Ranking: sequelize.define('rankings', {
        name: {
            type: Sequelize.STRING
        },
        course_id: {
            type: Sequelize.INTEGER
        }
    })
    
}
