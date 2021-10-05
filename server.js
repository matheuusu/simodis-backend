require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/Dao/DB');

const apiRoutes = require('./src/routes');
    
sequelize.authenticate().then(function(){
    console.log("Conexão Bem Sucedida!");
}).catch(function(error){
    console.error("Conexão não foi bem sucedida! ",error);
});
    
const server = express();

server.use(cors({}));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(express.static(__dirname+'public'));

server.use('/', apiRoutes);

module.exports = server;


