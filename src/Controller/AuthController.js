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
        
        //Consultando se o usuário existe no banco. Equivale ao SELECT * FROM users WHERE nome = req.nome
        const user = await Usuarios.Usuarios.findOne({            
            where: {
                nome: data.nome
            }
        });

        //Se user for NULL, o Backend retorna a mensagem de erro.
        //Validando usuário
        if(!user){
            res.json({error: 'Usuário e/ou senha inválidos!'});
            return;
        }

        //Validando a senha do usuário
        const senhaCheck = await bcrypt.compare(data.senha, user.senha);
        if(!senhaCheck){
            res.json({error: 'Usuário e/ou senha inválidos!'});
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

        //Criptografando Senha do usuário
        const senha = await bcrypt.hash(data.senha, 10);
        
        //Concatenando Data atual mais Número Randómico para o Hash
        const payload = (Date.now() + Math.random()).toString();
        //Gerando Hash 10 para o token de autenticação
        const token = await bcrypt.hash(payload, 10);  
        
        // Se a tabela não existir, ele cria automaticamente. Por isso, o métod sync() não tem parâmetros.
        // Caso a tabela já exista, ele não faz nada. Se precisar forçar a criação de várias, utilizar o método assim: sync({ force: true})
        Usuarios.Usuarios.sync();
        
        //Inserindo Registro no banco com esta estrutura
        const user = Usuarios.Usuarios.build({
            nome: data.nome,
            senha: senha,
            matricula: data.matricula,
            curso: data.curso,
            token: token,
    
        })
        //Salvando Instancia do Model Usuarios no Banco, garantindo persistência dos dados
        await user.save();
        console.log();
        console.log(user.nome);
        console.log(user.matricula);
    
        //Resposta da Requisição na Aplicação
        res.json({nome: user.nome, matricula: user.matricula});
    }
    
}
