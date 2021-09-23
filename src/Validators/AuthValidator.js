const { checkSchema } = require('express-validator');

module.exports = {
    signup: checkSchema({
        nome: {
            notEmpty: true,
            errorMessage: 'Informe seu nome!'
        },
        senha: {
            isLength: {
                options: {  min: 5 }
            }        
        },
        matricula: {
            isLength: {
                options: {  min: 8 }
            }   
        },
        curso: {
            notEmpty: true
        }
    }),
    signin: checkSchema({
        nome: {
            notEmpty: true
        },
        senha: {
            notEmpty: true
        }
    })
}