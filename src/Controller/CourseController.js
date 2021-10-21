const { validationResult, matchedData, checkSchema } = require('express-validator');

const { Usuarios} = require('../Models/Usuarios');
const { Course } = require('../Models/Course');
const { Grades } = require('../Models/Grades');
const { Class } = require('../Models/Class');

module.exports = {
    addCoursers: async (req, res) => {       
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }
        
        const data = matchedData(req);

        Course.sync();
        
        const coursers = await Course.findAll();
        
        for(let i in coursers)
        if(coursers[i].name === data.name){
            res.json({error: 'Curso já cadastrado'});
            return;
        }   

        const course = await Course.build({
            name: data.name,
            description: data.description,                        
        });

        await course.save();
        console.log(data.name);
        console.log("Curso cadastrado com sucesso.");

        res.json({Ok: true});
    },

    myCourse: async (req, res) => {
        let token = await req.query.token;        
        let user = await Usuarios.findOne({
            where: {
                token: token
            }
        });

        let classes = await Class.findAll({users_id: user.id});        
        let coursers = await Course.findAll();
        let coursersAndGrades = [];        

        for(let i in classes){
            for(let j in coursers){
                if(classes[i].course_id === coursers[j].id){                    
                    let grade = await Grades.findAll({users_id: user.id, course_id: coursers[j].id});
                    coursersAndGrades.push({                         
                        id: coursers[j].id,
                        course: coursers[j].name,
                        grades: grade[j].scors                           
                    })
                }
            }
        }               

        res.json({coursersAndGrades});
    },

    getCoursers: async (req, res) => {        
       let coursers = await Course.findAll();
       
       res.json({coursers});
    }
}
