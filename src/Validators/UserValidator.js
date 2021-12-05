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
    }),

    recoverPassword: checkSchema({
        email: {
            notEmpty: true
        }
    }),

    altPassword: checkSchema({
        token: {
            notEmpty: true
        },
        newPassword: {
            notEmpty: true
        }
    })
}
