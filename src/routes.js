const express = require('express');
const router = express.Router();

const AuthController = require('./Controller/AuthController');
const UserController = require('./Controller/UserController');
const CourseController = require('./Controller/CourseController');
const ClassController = require('./Controller/ClassController');
const GradeController = require('./Controller/GradesController');

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
router.get('/user/info', Auth.private, UserController.infoUsers);

//Rota de cadastrado de Curso
router.post('/course/add', CourseValidator.addCourse, Auth.private, CourseController.addCoursers);

router.get('/course/mycourse', Auth.private, CourseController.myCourse);

//Listar cursos
router.get('/course/list', CourseController.getCoursers);

//Criar turma
router.post('/class/add', Auth.private, ClassController.create);
//Listar todas as turmas
router.get('/class/list', ClassController.getClass);

//Lançar notas
router.post('/grade/add', Auth.private, GradeController.create);

//Listar todas as notas.
router.get('/grade/list', GradeController.getGrades); 

router.get('/me',(req, res) => {
    res.render('/me');
});

router.get('/me:id', async (req, res) => {
    let id = await req.params.id.split("=");
    console.log(id[1]);
    
    res.json({Oi: id[1]});        
    
});


module.exports = router;
