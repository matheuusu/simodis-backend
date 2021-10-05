const { checkSchema } = require('express-validator');

module.exports = {
    updateUser: checkSchema({
        token: {
            notEmpty: true
        },
        novoName: {
            optional: true
        },
        novoEmail: {
            optional: true
        },
        novaPassword: {
            optional: true
        }
    })
}