//Importando Model de Usuário
const Usuarios = require('../Models/Usuarios');

module.exports = {
    private: async (req, res, next) => {
        //Verificando se algum token foi enviado na Query ou Body.
        if(!req.query.token && !req.body.token){
            res.json({notallowed: true});
            return;
        }
        
        let token = '';

        //Se token existir, salva req.query.token em token.
        if(req.query.token){
            //Se existir, token recebe token enviado pela URL
            token = req.query.token;
        }
        //Verificando se algum token foi enviado pelo Body, que seriam os dados enviados via requisição do tipo 
        //POST ou PUT.
        if(req.body.token){
            //Se existir, token recebe token enviado pela URL
            token = req.body.token;
        }

        //Se token for igual a vazio, ou seja, não foi alterado; o fluxo é interrompido e a mensagem em baixo encerra a requisição.
        //O controller, que seria a próxima execução, não chega a ser executado.        
        if(token == ''){
            //A resposta da requisição será esta.
            res.json({notallowed: true});
            return;
        }

        //Se um token foi enviado, vamos verificar se ele é valido.
        //Fazemos isso verificando se algum usuário possui o token enviado.
        //Essa estrutura de comando equivale ao SELECT * FROM users WHERE token = token.
        //O retorno dessa execução é salvado na variavél user.
        const user = await Usuarios.Usuarios.findOne({            
            where: {
                token: token
            }
        });

        //Verificando se o usuário existi, caso não, encerra requisição com a mensagem: "notallowed: true".
        if(!user){
            res.json({notallowed: true});
            return;
        }

        //Se deu tudo certo, a execução segue o fluxo normal para o Controller.
        next();
    }
}