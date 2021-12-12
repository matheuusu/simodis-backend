const { checkSchema } = require('express-validator')

module.exports = {
  addQuestions: checkSchema({
    title: {
      notEmpty: true
    },
    course_id: {
      notEmpty: true
    },
    ,
    
    answerOne: {
      optional: true
    },
    ,
    
    answerTwo: {
      optional: true
    },
    ,
    
    answerThree: {
      optional: true
    },
    ,
    
    answerFour: {
      optional: true
    },
    answer_true: {
      optional: true
    }
  })
}
