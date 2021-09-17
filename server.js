require('dotenv').config();
const express = require('express');
const cors = require('cors');




const server = express();

server.use(cors({}));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get('/ping', (req, res)=>{
    res.json({pong: true});
})

server.listen(process.env.PORT, () =>{
    console.log(` Rodadndo no endereço: http://localhost:${process.env.PORT}`);
});
