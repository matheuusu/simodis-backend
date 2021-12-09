const { checkSchema } = require('express-validator')

module.exports = {
  signup: checkSchema({
    name: {
      notEmpty: true,
      errorMessage: 'Informe seu nome!'
    },
    password: {
      isLength: {
        options: { min: 5 }
      }
    },
    email: {
      notEmpty: true
    },
    isAdmin: {
      notEmpty: true
    }
  }),
  signin: checkSchema({
    email: {
      notEmpty: true
    },
    password: {
      notEmpty: true
    }
  })
}
