const { checkSchema } = require('express-validator');

module.exports = {
    signup: checkSchema({
        name: {
            notEmpty: true,
            errorMessage: 'Informe seu nome!'
        },
        password: {
            isLength: {
                options: {  min: 5 }
            }        
        },
        email: {
            notEmpty: true
        },
        enrollment: {
            notEmpty: true
        },
        roles_id: {
            optional: true
        }
    }),
    signin: checkSchema({
        email: {
            notEmpty: true
        },
        password: {
            notEmpty: true
        }
    })
}