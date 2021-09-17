const express = require('express');
const router = express.Router();

router.get('/test', (req, res) =>{
    res.json("Seja Bem-Vindo ao Simodis!");
})

module.exports = router;