const express = require('express');
const router = express.Router();

const AuthController = require('./Controller/AuthController');
const UserController = require('./Controller/UserController');


const AuthValidator = require('./Validators/AuthValidator');

const Auth = require('./middlewares/Auth');

//Rota de cadastro de Usuário
router.post('/user/signup', AuthValidator.signup,  AuthController.signup);
//Rota de Login
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
//Listagem de Usuários
router.get('/user/listusers', UserController.getUsers);
//Informações de Usuário
router.get('/user/info', UserController.infoUsers);

module.exports = router;