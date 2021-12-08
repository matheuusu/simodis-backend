const { validationResult, matchedData } = require('express-validator')

const { Questions } = require('../Models/Questions')
const { Answers } = require('../Models/Answers')

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
    const title = data.title.split(',')
    const id_questions = 0
    let count = 0
    let reqQuestion = title[0].split(' ')
    for (let i in questions) {
      let question = questions[i].title.split(' ')
      for (let j in question) {
        if (question[j] === reqQuestion[j]) {
          count++
        }
      }
    }

    if ((count / reqQuestion.length) * 100 >= 50) {
      res.send('Igual')
      return
    }

    const newquestion = Questions.build({
      title: title[0],
      course_id: data.course_id
    })
    await newquestion.save()

    const quest = await Questions.findOne({
      order: [['createdAt', 'DESC']]
    })

    for (let i = 1; i < title.length; i++) {
      AnswersController.create(quest.id, '', title[i], false)
    }

    AnswersController.create(quest.id, data.answer_true, '', true)
    z
    res.json({})
  }
}
