const { checkSchema } = require('express-validator');

module.exports = {
    addQuestions: checkSchema({
        title: {
            notEmpty: true            
        },
        content: {
            notEmpty: true            
        },
        course_id: {
            notEmpty: true
        }
    })
}