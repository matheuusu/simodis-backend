const app = require('../server');
const request = require('supertest');

const { Usuarios } = require('../src/Models/Usuarios');
const { Course } = require('../src/Models/Course');
const { Class } = require('../src/Models/Class')
const { Grades } = require('../src/Models/Grades')
const { Answers } = require('../src/Models/Answers')

describe("Routes: User - Integration", () => {

    beforeAll( async () => {
        const users = await Usuarios.findAll({})
        if (users.length > 0) {
            for (let i in users) {
                if (users[i].isAdmin === false) {
                    await Usuarios.destroy({
                        where: {
                            id: users[i].id
                        }
                    })
                }
            }
        }
    })

    test("1 - Testing user authentication. Expected to token. - /user/signin - Method POST - OK", async () =>{
        const res = await request(app).post('/user/signin')
        .send({email: 'suporte@simodis.com.br', password: 'P@$$w0rd.!'});
        
        const user = await Usuarios.findOne({
            where: {
                email: 'suporte@simodis.com.br'
            }
        });
        console.log(res.body);
        expect(res.body.token).toBe(user.token);
    });

    test("2 - Testing user authentication. Expected to token. - /user/signin - Method POST - Failed, invalid email", async () =>{
        const res = await request(app).post('/user/signin')
        .send({email: 'suport@simodis.com.br', password: 'P@$$w0rd.!'});

        console.log(res.body);
        expect(res.body.error).toBe('Email e/ou senha inválidos!');
    });

    test("3 - Testing user authentication. Expected to token. - /user/signin - Method POST - Failed, invalid password", async () =>{
        const res = await request(app).post('/user/signin')
        .send({email: 'suporte@simodis.com.br', password: 'P@$$w0rd.!!!'});

        console.log(res.body);
        expect(res.body.error).toBe('Email e/ou senha inválidos!');
    });

    test("4 - Testing user registration. Expected to token. - /user/signup - Method POST", async () => {
        const res = await request(app).post('/user/signup')
        .send({name: 'teste', email: 'teste@simodis.com.br', password: '123456', isAdmin: false});

        const user = await Usuarios.findOne({
            where: {
                email: 'teste@simodis.com.br'
            }
        });
        console.log(res.body);
        expect(res.body.token).toBe(user.token);
    });

    test("5 - Testing user registration. Expected to token. - /user/signup - Method POST - Failed, E-mail already registered", async () => {
        const res = await request(app).post('/user/signup')
        .send({name: 'Teste', email: 'teste@simodis.com.br', password: '123456', isAdmin: false});

        console.log(res.body);
        expect(res.body.error).toBe('Email já cadastrado!');
    });

    test("6 - Testing User Listing. - /user/listusers - Methos GET ", async () => {
        const res = await request(app).get('/user/listusers');

        console.log(res.body);
        expect(res.body.users[0].email).toBe('suporte@simodis.com.br');
    });

    test("7 - Testing info User. - /user/info - Method GET", async () => {
        const user = await Usuarios.findOne({where: {email: 'suporte@simodis.com.br'}});
        const token = user.token
        const res = await request(app).get(`/user/info?token=${token}`)

        console.log(res.body);
        expect(res.body.email).toBe('suporte@simodis.com.br');
    });

    test("8 - Updating user - Name", async () => {
        const user = await Usuarios.findOne({where: {email: 'teste@simodis.com.br'}})
        const token = user.token
        const res = await request(app).put(`/user/update?token=${token}`)
        .send({novoName: 'alterado'})

        console.log(res.body)
        expect(res.body).toBeTruthy(); 
    })

    test("9 - Updating user - Email", async () => {
        const user = await Usuarios.findOne({where: {email: 'teste@simodis.com.br'}})
        const token = user.token
        const res = await request(app).put(`/user/update?token=${token}`)
        .send({novoEmail: 'alterado@simodis.com.br'})

        console.log(res.body)
        expect(res.body).toBeTruthy(); 
    })

    test("10 - Updating user - Password", async () => {
        const user = await Usuarios.findOne({where: {email: 'alterado@simodis.com.br'}})
        const token = user.token
        const res = await request(app).put(`/user/update?token=${token}`)
        .send({novoPassword: '1234567'})

        console.log(res.body)
        expect(res.body).toBeTruthy(); 
    })

    test("11 - Updating user - Desfazendo", async () => {
        const user = await Usuarios.findOne({where: {email: 'alterado@simodis.com.br'}})
        const token = user.token
        const res = await request(app).put(`/user/update?token=${token}`)
        .send({novoName: 'teste', novoEmail: 'teste@simodis.com.br', novaPassword: '123456'})

        console.log(res.body)
        expect(res.body).toBeTruthy(); 
    })

    test("12 - Recovery Password", async () => {
        const email = 'teste@simodis.com.br'
        const res = await request(app).put(`/user/recoverpassword?email=${email}`)

        expect(res.body).toBeTruthy(); 
    })

    test("13 - Recovery Password - Failed - Invalid Email", async () => {
        const email = 'test@simodis.com.br'
        const res = await request(app).put(`/user/recoverpassword?email=${email}`)

        console.log(res.body)
    })
});

describe('Routes: Course - Integration', () => {
    afterAll( async () => {
        await Course.drop()
        await Class.drop()
        await Grades.drop()
        await Answers.drop()
    })

    test('Register course', async () => {
        const user = await Usuarios.findOne({where: {email: 'suporte@simodis.com.br'}})
        const { token } = user;
        const res = await request(app).post(`/course/add?token=${token}`)
        .send({name: 'Logica de Programação', description: 'Curso para iniciantes'})

        expect(res.body).toBeTruthy(); 
        
    })

    test('Add Grades', async () => {
        const user = await Usuarios.findOne({where: {email: 'suporte@simodis.com.br'}})
        const { token } = user
        const course = await Course.findOne({where: {name: 'Logica de Programação'}})
        const { id } = course
        const res = await request(app).post(`/grade/add?token=${token}&id=${id}`)
        .send({grade: 10})

        expect(res.body).toBeTruthy();
    })

    test('Add Class', async () => {
        const user = await Usuarios.findOne({where: {email: 'suporte@simodis.com.br'}})
        const { token } = user
        const course = await Course.findOne({where: {name: 'Logica de Programação'}})
        const { id } = course
        const res = await request(app).post('/class/add')
        .send({ token, id})

        expect(res.body).toBeTruthy();
    })

    test('My Couse', async () => {
        const user = await Usuarios.findOne({where: {email: 'suporte@simodis.com.br'}})
        const { token } = user
        const res = await request(app).get(`/course/mycourse?token=${token}`)
        console.log(res.body)
        expect(res.body.coursersAndGrades[1].course).toBe('Logica de Programação')
    })

    test('Add Question ', async () => {
        const course = await Course.findOne({where: {name: 'Logica de Programação'}})
        const { id } = course
        const res = await request(app).post('/question/create')
        .send({title: 'Com quantos paus se faz uma canoa?', id, answerOne: 11, answerTwo: 12, answerThree: 13, answerFour: 14, answer_true: 15})

        expect(res.body).toBeTruthy()
    })

    test('Resolve Tasks', async () => {
        let ids_answers = ",4"
        const res = await request(app).post('/course/resolvetask')
        .send({ids_answers})

        expect(res.body).toBe(0)
    })

    test('Group Graders', async () => {
        const res = await await request(app).get('/grade/list')
        expect(res.body.grades[0].id).toBe(1)
    })

    test('Group Classers', async () => {
        const res = await request(app).get('/class/list')
        expect(res.body.classes[0].id).toBe(1)
    })

    test('Group Coursers', async () => {
        const res = await request(app).get('/course/list')
        expect(res.body.coursers[0].id).toBe(1)
    })

})