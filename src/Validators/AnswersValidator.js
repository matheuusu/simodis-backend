const { checkSchema } = require('express-validator');

module.exports = {
    addQuestions: checkSchema({
        id_questions: {
            notEmpty: true            
        },
        content: {
            notEmpty: true
        },
        isTrue: {
            notEmpty: true
        }
    })
}