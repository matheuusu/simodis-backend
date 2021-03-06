const { validationResult, matchedData } = require('express-validator')

const { Questions } = require('../Models/Questions')
const { Answers } = require('../Models/Answers')
const { Usuarios } = require('../Models/Usuarios')
const { Grades } = require('../Models/Grades')

const AnswersController = require('../Controller/AnswersController')

module.exports = {
  create: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() })
      return
    }

    const data = matchedData(req)

    Questions.sync()

    const questions = await Questions.findAll({})
    const id_questions = 0
    let count = 0
    let reqQuestion = data.title.split(' ')
    for (let i in questions) {
      let question = questions[i].title.split(' ')
      for (let j in question) {
        if (question[j] === reqQuestion[j]) {
          count++
        }
      }
    }

    if ((count / reqQuestion.length) * 100 >= 50) {
      res.json("Igual")
      return
    }

    const newquestion = Questions.build({
      title: data.title,
      course_id: data.course_id
    })
    await newquestion.save()

    const quest = await Questions.findOne({
      order: [['createdAt', 'DESC']]
    })

    
    await AnswersController.create(quest.id, '', data.answerOne, false)
    await AnswersController.create(quest.id, '', data.answerTwo, false)
    await AnswersController.create(quest.id, '', data.answerThree, false)
    await AnswersController.create(quest.id, '', data.answerFour, false)
    await AnswersController.create(quest.id, data.answer_true, '', true)
    res.json("OK")
  }

  // calcscors: async (req, res) => {
  //   const errors = validationResult(req)
  //   if (!errors.isEmpty()) {
  //     res.json({ error: errors.mapped() })
  //     return
  //   }

  //   const { questions } = req.body
  //   const answers = new Answers()
  //   const QuestionsModel = new Questions()
  //   const Grades = new Grades()
  //   let count = 0

  //   for (let index = 0; index < questions; index++) {
  //     const answer = await answers.findOne({
  //       where: {
  //         id: questions[index].answrers_id
  //       }
  //     })

  //     if (answer?.isTrue) {
  //       const question = await QuestionsModel.findOne({
  //         where: {
  //           id: questions[index].question_id
  //         }
  //       })

  //       count += question.scors
  //     }
  //   }

  //   const [firstQuestion] = questions
  //   const question1 = QuestionsModel.findOne({
  //     where: { id: firstQuestion.question_id }
  //   })

  //   const grade = await Grades.findOne({
  //     where: {
  //       course_id: question1.course_id,
  //       users_id: req.user.id
  //     }
  //   })

  //   await Grades.update(
  //     { scors: grade.scors + count },
  //     {
  //       where: {
  //         id: grade.id
  //       }
  //     }
  //   )

  //   return res.json({})
  // }
}
