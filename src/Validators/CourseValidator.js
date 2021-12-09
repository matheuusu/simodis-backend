const { checkSchema } = require('express-validator')

module.exports = {
  addCourse: checkSchema({
    name: {
      notEmpty: true,
      errorMessage: 'Informe o nome do curso!'
    },
    description: {
      notEmpty: true,
      errorMessage: 'Informe a descricao'
    },
    users_id: {
      optional: true
    }
  })
}
