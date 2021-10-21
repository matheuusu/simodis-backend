const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

//Importando o Model Usuários
const { Usuarios} = require('../Models/Usuarios');
//Importando o Model Course
const { Course } = require('../Models/Course');
//Importando o Model Grades
const { Grades } = require('../Models/Grades');

const { Class } = require('../Models/Class');


module.exports = {
    getUsers: async (req, res) => {
       let users = await Usuarios.findAll();

        res.json({users});
    },

    infoUsers: async (req, res) =>{
        let token = await req.query.token;
        //Pegando as informações do usuário
        let user = await Usuarios.findOne({token});

        let classes = await Class.findAll({users_id: user.id});        
        let coursers = await Course.findAll();
        let inforUser = [];        

        for(let i in classes){
            for(let j in coursers){
                if(classes[i].course_id === coursers[j].id){                    
                    let grade = await Grades.findAll({users_id: user.id, course_id: coursers[j].id});
                    inforUser.push({                                                
                        id: coursers[j].id,
                        course: coursers[j].name,
                        grades: grade[j].scors                           
                    })
                }
            }
        }    
        let name = user.name;
        let enrollment = user.enrollment;
        let email = user.email;

        res.json(name, enrollment, email, inforUser);
    },

    updateUser: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);        

        const user = await Usuarios.findOne({
            where: {
                token: data.token
            }
        });
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
