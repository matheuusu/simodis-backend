
const { Usuarios } = require('../Models/Usuarios');
const { Class } = require('../Models/Class');

module.exports = {
    create: async (req, res) => {
        let { token, id } = await req.query;                     
        
        let user = await Usuarios.findOne({
            where: {
                token: token
            }
        });

        if(!user){
            res.json({error: "Token inválido!"});
            return;
        }

        Class.sync();
        
        let classCheck = await Class.findAll({});        

        if(classCheck){
            for(let i in classCheck){
                if(user.id === classCheck[i].users_id && classCheck[i].course_id === parseInt(id)){
                    res.json({error: 'Usuário já cadastrado no curso!'});
                    return;
                }
            }
        }               

        const newUser = await Class.build({
            users_id: user.id,
            course_id: id
        });

        await newUser.save();

        res.json({Ok: true});
    },

    getClass: async (req, res) => {
        let classes = await Class.findAll();

        res.json({classes});
    }
}