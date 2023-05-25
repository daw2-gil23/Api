const express = require('express');
const Administrador = require('../controladores/c_admin');
const r_admin = express.Router()
//base de datos pero el le llama pool


r_admin.post('/login',async (req, res) => {
    try {
        const {email, contrasenya } = req.body

        const cliente = await Administrador.login(email,contrasenya);
        
        if(cliente.success==true){
            res.json(cliente.admin);
        }else{
            res.json(cliente.message);
        }


    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = r_admin