const express = require('express');
const router = express.Router();

const AuthController = require('./Controller/AuthController');
const UserController = require('./Controller/UserController');
const CourseController = require('./Controller/CourseController');

const CourseValidator = require('./Validators/CourseValidator');
const AuthValidator = require('./Validators/AuthValidator');
const UserValidator = require('./Validators/UserValidator');

//Middleware para fazer autenticação do token antes de rodar o Controller
const Auth = require('./middlewares/Auth');

//Rota de cadastro de Usuário
router.post('/user/signup', AuthValidator.signup, AuthController.signup);
//Rota de Login
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
//Atualizando dados de usuário
router.put('/user/update', UserValidator.updateUser, Auth.private, UserController.updateUser);
//Listagem de Usuários
router.get('/user/listusers', UserController.getUsers);
//Informações de Usuário
router.get('/user/info', UserController.infoUsers);

//Rota de cadastrado de Curso
router.post('/course/add', CourseValidator.addCourse, Auth.private, CourseController.addCoursers);

//Listar cursos
router.get('/course/list', CourseController.getCoursers);

module.exports = router;