const { checkSchema } = require('express-validator');

module.exports = {
    addGrades: checkSchema({
        score: {
            notEmpty: true            
        },
        users_id: {
            notEmpty: true            
        },
        course_id: {
            notEmpty: true
        }
    })
}