const express = require('express');
const Cliente = require('../controladores/c_cliente');
const r_cliente = express.Router()
const bcrypt = require('bcrypt');
//base de datos pero el le llama pool


r_cliente.get('/',async (req, res) => {
    try {
        const clientes = await Cliente.getAll();
        res.send(clientes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_cliente.get('/cliente/:id',async (req, res) => {
    try {
        const id = req.params.id
        const clienteId = await Cliente.getById(id);
            
        if(clienteId=="Error"){
            res.status(404).send("No se ha encontrado el cliente con la id " + id);
        }else{
            res.send(clienteId);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_cliente.get('/login/',async (req, res) => {
    try {
        const {email, contrasenya } = req.body

        const cliente = await Cliente.login(email,contrasenya);

        if(cliente.success==true){
            res.send(cliente.cliente);
        }else{
            res.status(cliente.status).send(cliente.message);
        }


    } catch (error) {
        res.status(500).send(error.message);
    }
});


r_cliente.post('/',async (req, res) => {
    try {
        const {nombre, primerApellido, segundoApellido, email, password,telefono } = req.body
        var regex = /^[a-zA-Z0-9]+$/;
        var errores = []
        
        if (!nombre || nombre.length < 2 || nombre.length > 20 || !(regex.test(nombre))) {
            errores.push("El usuario es inválido")
        }

        if (!primerApellido || primerApellido.length < 2 || primerApellido.length > 20 || !(regex.test(primerApellido))) {
            errores.push("El primer apellido es inválido")
        }

        if (!segundoApellido || segundoApellido.length < 2 || segundoApellido.length > 20 || !(regex.test(segundoApellido))) {
            errores.push("El segundo apellido es inválido")
        }

        regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || email.length > 50 || !(regex.test(email))) {
            errores.push("El email es inválido")
        }

        try {
            const emailExistente = await Cliente.revisarCorreo(email)
            if(emailExistente===true){
                errores.push("El email ya existe")
            }
        } catch (error) {
            errores.push("Error en comparar email")
        }

        regex = /^[0-9]+$/;

        if (!telefono || telefono.length < 8 || telefono.length > 11 || !(regex.test(telefono))) {
            errores.push("El telefono es inválido")
        }

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            // Generar un salt (un valor aleatorio que se utiliza en la función hash)
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);

            // Encriptar la contraseña utilizando el salt
            const contrasenya = bcrypt.hashSync(password, salt);

            const nuevoCliente = {
                nombre,
                primerApellido,
                segundoApellido,
                email,
                contrasenya,
                telefono
            }
            
            const respuesta = await Cliente.create(nuevoCliente)
            res.json(respuesta)   

        }
        

    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_cliente.put('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const cliente = await Cliente.getById(id);

        if(cliente=="Error"){
            res.status(404).send("No se ha encontrado el cliente con la id " + id);
        }else{
            const {nombre, primerApellido, segundoApellido, email, contrasenya,telefono } = req.body
            cliente.nombre=nombre
            cliente.primerApellido=primerApellido
            cliente.segundoApellido=segundoApellido
            cliente.email=email
            cliente.contrasenya=contrasenya
            cliente.telefono=telefono
            
    
            const respuesta = await cliente.update()
    
            res.send(respuesta);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_cliente.delete('/:id',async (req, res)=>{
    try {
        const id = req.params.id
        const respuesta = await Cliente.delete(id);

        if(respuesta=="Error"){
            res.status(404).send("No se ha encontrado el usuario con la id " + id);
        }else{
            res.json(respuesta);;
        }

        
    } catch (error) {
        res.status(500).send(error.message);
    }
})




module.exports = r_cliente