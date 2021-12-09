//Importando Model de Usuário
const Usuarios = require('../Models/Usuarios')

module.exports = {
  private: async (req, res, next) => {
    const token = req.get('Authorization')
    // console.log(JSON.stringify(req, null, 2))

    if (!token || token === '') {
      res.status(405).json({ notallowed: true })
      return
    }

    // let token = ''

    // if (req.query.token) {
    //   token = req.query.token
    // }

    // if (req.body.token) {
    //   token = req.body.token
    // }

    // if (token == '') {
    //   res.json({ notallowed: true })
    //   return
    // }

    const user = await Usuarios.Usuarios.findOne({
      where: {
        token: token
      }
    })

    if (!user) {
      res.json({ notallowed: true })
      return
    }

    req.user = user

    next()
  }
}
