const { Answers } = require('../Models/Answers')

module.exports = {
  async create(id_questions, answer_true, answer_false, isTrue) {
    Answers.sync()

    const newanswer = await Answers.build({
      id_questions,
      answer_true,
      answer_false,
      isTrue
    })
    newanswer.save()
  }
}
