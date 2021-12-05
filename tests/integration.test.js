const app = require('../server');
const request = require('supertest');

const { Usuarios } = require('../src/Models/Usuarios');


describe("Routes: User - Integration", () => {

    test("1 - Testing user authentication. Expected to token. - /user/signin - Method POST - OK", async () =>{
        const res = await request(app).post('/user/signin')
        .send({email: 'suporte@simodis.com.br', password: 'P@$$w0rd.!'});

        const user = await Usuarios.findOne({
            where: {
                email: 'suporte@simodis.com.br'
            }
        })    
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
        .send({name: 'Teste', email: 'teste@simodis.com.br', password: '123456', isAdmin: false});

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
        const user = await Usuarios.findOne({email: 'suporte@simodis.com.br'});
        const res = await request(app).get(`/user/info?token=${user.token}`)

        console.log(res.body);
        expect(res.body.email).toBe({email: 'suporte@simodis.com.br'});
    });
});