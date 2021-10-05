const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

//Importando o Model Usuários
const Usuarios = require('../Models/Usuarios');
//Importando o Model Course
const Course = require('../Models/Course');
//Importando o Model Grades
const Grades = require('../Models/Grades');

module.exports = {
    getUsers: async (req, res) => {
       let users = await Usuarios.Usuarios.findAll();

        res.json({users});
    },

    infoUsers: async (req, res) =>{
        let token = await req.query.token;
        //Pegando as informações do usuário
        let user = await Usuarios.Usuarios.findOne({token});

        //Pegando todos os cursos do usuário
        let course = await Course.Course.findAll({users_id: user.id});

        //Pegando todas as notas
        let grades = await Grades.Grades.findAll();

        let information = [];

            for(let j in course){
                for(let i in grades){
                    if(course[j].id == grades[i].course_id && user.id == grades[i].users_id){
                        information.push({
                            course_name: course[j].name,
                            grade_score: grades[i].score
                        })
                    }
                }
            }

        res.json({name: user.name, information});
    },

    updateUser: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);        

        const user = await Usuarios.Usuarios.findOne({token: data.token});
        if(data.novoName){
            user.name = data.novoName;
        }

        if(data.novoEmail){
            user.email = data.novoEmail;
        }

        if (data.novaPassword){
            const passwordUpdate = await bcrypt.hash(data.novaPassword, 10);
            user.password = passwordUpdate;
        }        
        user.save();
        console.log("Update realizado com sucesso!");

        res.json({Ok: true});
    }
}