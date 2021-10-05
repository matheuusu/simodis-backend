const { checkSchema } = require('express-validator');

module.exports = {
    addRoles: checkSchema({
        name: {
            notEmpty: true            
        },
        description: {
            notEmpty: true            
        }
    })
}