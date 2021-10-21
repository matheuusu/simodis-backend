const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

const { Usuarios} = require('../Models/Usuarios');

module.exports = {
    getUsers: async (req, res) => {
       let users = await Usuarios.findAll();

        res.json({users});
    },

    infoUsers: async (req, res) => {
        let token = await req.query.token;        
        let user = await Usuarios.findOne({
            where: {
                token: token
            }
        });             

        res.json({name: user.name, enrollment: user.enrollment, email: user.email});
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
