const express = require('express');
const router = express.Router();
const { verify } = require('jsonwebtoken');

const AuthController = require('./Controller/AuthController');
const UserController = require('./Controller/UserController');
const CourseController = require('./Controller/CourseController');
const ClassController = require('./Controller/ClassController');
const GradeController = require('./Controller/GradesController');
const QuestionsController = require('./Controller/QuestionsController');

const CourseValidator = require('./Validators/CourseValidator');
const AuthValidator = require('./Validators/AuthValidator');
const UserValidator = require('./Validators/UserValidator');
const QuestiosValidator = require('./Validators/QuestionsValidator');

const Auth = require('./middlewares/Auth');
const { Usuarios } = require('./Models/Usuarios');


router.post('/user/signup', AuthValidator.signup, AuthController.signup);
router.post('/user/signin', AuthValidator.signin, AuthController.signin);
router.post('/user/recoverpassword', UserValidator.recoverPassword, UserController.recoverPassword);
router.get('/user/altpassword', UserValidator.altPassword, UserController.altPassword);
router.put('/user/update', UserValidator.updateUser, Auth.private, UserController.updateUser);
router.get('/user/listusers', UserController.getUsers);

router.get('/user/info', Auth.private, UserController.infoUsers);

router.post('/course/add', CourseValidator.addCourse, Auth.private, CourseController.addCoursers);

router.get('/course/mycourse', Auth.private, CourseController.myCourse);


router.get('/course/list', CourseController.getCoursers);


router.post('/class/add', Auth.private, ClassController.create);

router.get('/class/list', ClassController.getClass);

router.post('/grade/add', Auth.private, GradeController.create);

router.get('/grade/list', GradeController.getGrades); 

router.post('/question/create', QuestiosValidator.addQuestions, QuestionsController.create);


module.exports = router;
