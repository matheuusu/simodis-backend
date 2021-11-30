const { checkSchema } = require('express-validator');

module.exports = {
    addQuestions: checkSchema({
        title: {
            notEmpty: true            
        },
        course_id: {
            notEmpty: true
        }
    })
}