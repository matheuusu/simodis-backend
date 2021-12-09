const { Usuarios } = require('../Models/Usuarios')
const { Grades } = require('../Models/Grades')

module.exports = {
  create: async (req, res) => {
    let { token, id } = await req.query
    let { grade } = await req.body

    let user = await Usuarios.findOne({
      where: {
        token: token
      }
    })

    if (!user) {
      res.json({ error: 'Token inválido!' })
      return
    }

    Grades.sync()

    const grades = await Grades.build({
      scors: grade,
      users_id: user.id,
      course_id: id
    })

    await grades.save()

    res.json({ Ok: true })
  },

  getGrades: async (req, res) => {
    let grades = await Grades.findAll({})

    res.json({ grades })
  }
}
