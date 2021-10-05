const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

//Importando o Model Usuários
const Usuarios = require('../Models/Usuarios');

module.exports = {
    signin: async (req, res) => {
        //Validando que os campos foram, devidamente, inseridos
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }

        const data = matchedData(req);        
        
        //Consultando se o email é válido, isto é, se está cadastrado. Equivale ao SELECT * FROM users WHERE email = req.email
        const user = await Usuarios.Usuarios.findOne({            
            where: {
                email: data.email
            }
        });

        //Se user for NULL, o Backend retorna a mensagem de erro.
        //Validando usuário
        if(!user){
            res.json({error: 'Email e/ou senha inválidos!'});
            return;
        }

        //Validando a senha do usuário
        const passwordCheck = await bcrypt.compare(data.password, user.password);
        if(!passwordCheck){
            res.json({error: 'Email e/ou senha inválidos!'});
            return;
        }

        const payload = (Date.now() + Math.random()).toString();
        const token = await bcrypt.hash(payload, 10);

        //Atualizando token do usuário
        user.token = token;
        //Salvando as alteração do token
        await user.save();

        res.json({token: user.token});
    },

    signup: async (req, res) => {
        //Validando que os campos foram, devidamente, inseridos
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }
    
        const data = matchedData(req);

        // Consultando se o email é válido, isto é, se está cadastrado. Equivale ao SELECT * FROM users WHERE email = req.email
        // const userCheck = await Usuarios.Usuarios.findOne({            
        //     where: {
        //         email: data.email
        //     }
        // });

        // if(userCheck){
        //     res.json({error: 'Email já cadastrado!'});
        //     return;
        

        //Criptografando Senha do usuário
        const password = await bcrypt.hash(data.password, 10);
        
        //Concatenando Data atual mais Número Randómico para o Hash
        const payload = (Date.now() + Math.random()).toString();
        //Gerando Hash 10 para o token de autenticação
        const token = await bcrypt.hash(payload, 10);  
        
        // Se a tabela não existir, ele cria automaticamente. Por isso, o métod sync() não tem parâmetros.
        // Caso a tabela já exista, ele não faz nada. Se precisar forçar a criação de várias, utilizar o método assim: sync({ force: true})
        Usuarios.Usuarios.sync();
        
        //Inserindo Registro no banco com esta estrutura
        const user = Usuarios.Usuarios.build({
            name: data.name,
            password,
            enrollment: data.enrollment,            
            token,
            email: data.email            
    
        })
        //Salvando Instancia do Model Usuarios no Banco, garantindo persistência dos dados
        await user.save();
        console.log("Usuário cadastrado com sucesso!");
        console.log(user.email);        
    
        //Resposta da Requisição na Aplicação
        res.json({token});
    }
    
}
