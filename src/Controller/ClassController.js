const { Usuarios } = require('../Models/Usuarios')
const { Class } = require('../Models/Class')

module.exports = {
  create: async (req, res) => {
    let { token, id } = await req.body;

    let user = await Usuarios.findOne({
      where: {
        token: token
      }
    })

    if (!user) {
      res.json({ error: 'Token inválido!' })
      return
    }

    Class.sync()

    const newclass = await Class.build({
      users_id: user.id,
      course_id: id
    })

    await newclass.save()
    
    console.log(token + " " + id);

    res.json({ Ok: true })
  },

  getClass: async (req, res) => {
    let classes = await Class.findAll()

    res.json({ classes })
  }
}
