const { validationResult, matchedData } = require('express-validator');
const { Questions } = require('../Models/Questions')

module.exports = {
    create: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);    

        Questions.sync();

        const questions  = await Questions.findAll({});
        console.log(data.title)
        let count = 0;
        let reqQuestion = data.title.split(" ");
        for(let i in questions){
            let question = questions[i].title.split(" ");
            for( let j in question){
                if(question[j] === reqQuestion[j]){
                    count++;
                }
            }
        }

        if(((count / reqQuestion.length) * 100 ) >= 50){
            res.send("Igual");
            return;
        }

        const newquestion = await Questions.build({
            title: data.title,
            course_id: data.course_id
        });

        await newquestion.save();

        res.json({});
    },

    groupQuestions: async ( req, res) => {

    }
}