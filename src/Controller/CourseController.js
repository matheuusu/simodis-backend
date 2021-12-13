const {
  validationResult,
  matchedData,
  checkSchema
} = require('express-validator')

const { Usuarios } = require('../Models/Usuarios')
const { Class } = require('../Models/Class')
const { Grades } = require('../Models/Grades')
const { Course } = require('../Models/Course')
const { Questions } = require('../Models/Questions')
const { Answers } = require('../Models/Answers')

module.exports = {
  addCoursers: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }

    const data = matchedData(req)

    Course.sync()

    const coursers = await Course.findAll()

    for (let i in coursers)
      if (coursers[i].name === data.name) {
        res.json({ error: 'Curso já cadastrado' })
        return
      }

    const course = await Course.build({
      name: data.name,
      description: data.description
    })

    await course.save()
    console.log(data.name)
    console.log('Curso cadastrado com sucesso.')

    res.json({ Ok: true })
  },

  myCourse: async (req, res) => {
    let token = await req.query.token
    let user = await Usuarios.findOne({
      where: {
        token: token
      }
    })

    let classes = await Class.findAll({
      where: {
        users_id: user.id
      }
    })
    let coursers = await Course.findAll()
    let coursersAndGrades = [{}]

    for (let i in classes) {
      for (let j in coursers) {
        if (classes[i].course_id === coursers[j].id) {
          let grade = await Grades.findOne({
            where: {
              users_id: user.id,
              course_id: coursers[j].id
            }
          })
          coursersAndGrades.push({
            id: coursers[j].id,
            course: coursers[j].name,
            grades: grade.scors
          })
        }
      }
    }

    res.json({ coursersAndGrades })
  },

  getCoursers: async (req, res) => {
    let coursers = await Course.findAll()

    res.json({ coursers })
  },

  TaskCourse: async (req, res) => {
    const questions = await Questions.findAll({
      where: {
        course_id: req.query.id_course
      }
    })

    let tasks_course = []

    for (let i in questions) {
      const answers = await Answers.findAll({
        where: {
          id_questions: questions[i].id
        }
      })

      tasks_course.push({
        question: questions[i].title,
        answers
      })
    }

    res.json({ tasks_course })
  },

  ResolveTask: async (req, res) => {
    const { ids_answers } = req.body;

    answers_id = ids_answers.split(",");
    count_success = 0;
    for(let i in answers_id){
      const answer = await Answers.findOne({
        where:{
          id: answers_id[i]
        }
      })

      /*if(answer.isTrue == 1){
        ++count_success;
      }*/
      console.log(answer['dataValues'])
    }

    res.json({count_success});
  }
}
