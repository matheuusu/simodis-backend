const { validationResult, matchedData, checkSchema } = require('express-validator');

const { Course } = require('../Models/Course');

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

        // Se a tabela não existir, ele cria automaticamente. Por isso, o métod sync() não tem parâmetros.
        // Caso a tabela já exista, ele não faz nada. Se precisar forçar a criação de várias, utilizar o método assim: sync({ force: true})
        Course.sync();

        //Verificando se course já existe.
        const coursers = await Course.findAll();

        //Caso checkCourse for TRUE, response error course já existe.
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

    getCoursers: async (req, res) => {
        //Pegando todos os cursos.
        //SELECT * FROM coursers.
       let coursers = await Course.findAll();
       
       res.json({coursers});
    }
}