require('dotenv').config();
const express = require('express');
const cors = require('cors');

const apiRoutes = require('./src/routes');


const server = express();

server.use(cors({}));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(express.static(__dirname+'public'));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () =>{
    console.log(` Rodadndo no endereço: http://localhost:${process.env.PORT}`);
});
