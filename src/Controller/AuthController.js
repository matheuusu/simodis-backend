const bcrypt = require('bcrypt')
const { validationResult, matchedData } = require('express-validator')

const { Usuarios } = require('../Models/Usuarios')

module.exports = {
  signin: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }

    const data = matchedData(req)

    const user = await Usuarios.findOne({
      where: {
        email: data.email
      }
    })

    if (!user) {
      res.json({ error: 'Email e/ou senha inválidos!' })
      return
    }

    const passwordCheck = await bcrypt.compare(data.password, user.password)
    if (!passwordCheck) {
      res.json({ error: 'Email e/ou senha inválidos!' })
      return
    }

    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10)

    await Usuarios.update(
        { token },
        {
          where: {
            email: data.email
          }
        }
      )
    res.json({ token, isAdmin: user.isAdmin })
  },

  signup: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }

    const data = matchedData(req)

    Usuarios.sync()

    const userCheck = await Usuarios.findOne({
      where: {
        email: data.email
      }
    })
    if (userCheck) {
      res.json({ error: 'Email já cadastrado!' })
      return
    }

    const password = await bcrypt.hash(data.password, 10)

    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload, 10)
    const enrollment = '1101' + Math.floor(Math.random() * 1000)

    const user = Usuarios.build({
      name: data.name,
      password,
      enrollment,
      token,
      email: data.email,
      isAdmin: false
    })

    await user.save()
    console.log('Usuário cadastrado com sucesso!')
    console.log(user.email)

    res.json({ token, isAdmin: false })
  }
}
