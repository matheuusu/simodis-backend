const { validationResult, matchedData, checkSchema } = require('express-validator');

const Course = require('../Models/Course');

module.exports = {
    addCoursers: async (req, res) => {
        //Retorna TRUE caso os campos se enquadrem no modelo de CourseValidator.
        //Se a resposta for false, recebe a mensagem de erro de CourseValidator.
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }
        
        const data = matchedData(req);
        //Verificando se course já existe.
        const checkCourse = await Course.Course.findOne({name: data.name});

        //Caso checkCourse for TRUE, response error course já existe.
        if(checkCourse){
            res.json({error: 'Curso já cadastrado'});
            return;
        }

        // Se a tabela não existir, ele cria automaticamente. Por isso, o métod sync() não tem parâmetros.
        // Caso a tabela já exista, ele não faz nada. Se precisar forçar a criação de várias, utilizar o método assim: sync({ force: true})
        Course.Course.sync();

        const course = await Course.Course.build({
            name: data.name,
            description: data.description,            
            users_id: data.users_id
        });

        await course.save();
        console.log(data.name);
        console.log("Curso cadastrado com sucesso.");

        res.json({Ok: true});
    },

    getCoursers: async (req, res) => {
        //Pegando todos os cursos.
        //SELECT * FROM coursers.
       let coursers = await Course.Course.findAll();
       
       res.json({coursers});
    }
}
