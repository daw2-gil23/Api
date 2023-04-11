const express = require('express');
const Cliente = require('../controladores/c_cliente');
const r_cliente = express.Router()
//base de datos pero el le llama pool


r_cliente.get('/',async (req, res) => {
    try {
        const clientes = await Cliente.getAll();
        res.send(clientes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_cliente.get('/:id',async (req, res) => {
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

r_cliente.post('/',async (req, res) => {
    try {
        const {nombre, primerApellido, segundoApellido, email, contrasenya,telefono } = req.body
        const nuevoCliente = {
            nombre,
            primerApellido,
            segundoApellido,
            email,
            contrasenya,
            telefono
        }
        const respuesta = await Cliente.create(nuevoCliente);
        res.json(respuesta)

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