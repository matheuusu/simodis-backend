const bcrypt = require('bcrypt');
const { validationResult, matchedData } = require('express-validator');

//Importando o Model Usuários
const Usuarios = require('../Models/Usuarios');

module.exports = {
    getUsers: async (req, res) => {
        res.json("Ok!");
    },

    infoUsers: async (req, res) =>{
        res.json("Ok!");
    },

    updateUser: async (req, res) => {
        res.json("Ok!");
    }
}