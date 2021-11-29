const { checkSchema } = require('express-validator');

module.exports = {
    addQuestions: checkSchema({
        id_questions: {
            notEmpty: true            
        },

        answer_false: {
            optional: true
        },

        answer_true: {
            optional: true
        },

        isTrue: {
            notEmpty: true
        }
    })
}