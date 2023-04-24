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
        const regex = /^[a-zA-Z0-9]+$/;
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

        //else{
        //     const regex = /^[a-zA-Z0-9 ]+$/;
        //     if(!primerApellido || primerApellido.length < 2 || primerApellido.length > 20 || !(regex.test(primerApellido))){

        //     }else{
        //         const nuevoCliente = {
        //             nombre,
        //             primerApellido,
        //             segundoApellido,
        //             email,
        //             contrasenya,
        //             telefono
        //         }
                
        //         const respuesta = await Cliente.create(nuevoCliente);
        //         res.json(respuesta)   
        //     }

        // }

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {
                    
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