const { checkSchema } = require('express-validator');

module.exports = {
    addRanking: checkSchema({
        name: {
            notEmpty: true            
        },
        course_id: {
            notEmpty: true            
        }
    })
}