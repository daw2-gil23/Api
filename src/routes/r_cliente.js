const express = require('express');
const Cliente = require('../controladores/c_cliente');
const r_cliente = express.Router()
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const rol = require('../middleware/rol')
//base de datos pero el le llama pool


r_cliente.get('/',auth, rol(['admin']),async (req, res) => {
    try {
        const clientes = await Cliente.getAll();
        
        res.json(clientes);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_cliente.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const clienteId = await Cliente.getById(id);
            
        if(clienteId=="Error"){
            res.status(404).json("No se ha encontrado el cliente con la id " + id);
        }else{
            res.json(clienteId);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_cliente.post('/login/',async (req, res) => {
    try {
    
        const {email, contrasenya } = req.body

        const cliente = await Cliente.login(email,contrasenya);

        res.json(cliente);


    } catch (error) {
        res.status(500).json(error.message);
    }
});


r_cliente.post('/',async (req, res) => {
    try {
        const {nombre, primerApellido, segundoApellido, email, password,telefono,avatar } = req.body

        const errores = await Cliente.validar(nombre, primerApellido, segundoApellido, email, password,telefono,avatar)

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
                telefono,
                avatar
            }
            
            const respuesta = await Cliente.create(nuevoCliente)
            res.json(respuesta)   

        }
        

    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_cliente.put('/:id',auth,async (req, res) => {
    try {
        const id = req.params.id
        const cliente = await Cliente.getById(id);

        if(cliente=="Error"){
            res.status(404).json("No se ha encontrado el cliente con la id " + id);
        }else{
            const {nombre, primerApellido, segundoApellido, email, password,telefono,avatar } = req.body

            const errores = await Cliente.validar(nombre, primerApellido, segundoApellido, email, password,telefono,avatar)

            if (errores.length > 0) {
                // Si hay errores, devolverlos como un array
                res.json(errores)
            } else {
    
                // Generar un salt (un valor aleatorio que se utiliza en la función hash)
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds);

                // Encriptar la contraseña utilizando el salt
                const contrasenya = bcrypt.hashSync(password, salt);

                cliente.nombre=nombre
                cliente.primerApellido=primerApellido
                cliente.segundoApellido=segundoApellido
                cliente.email=email
                cliente.contrasenya=contrasenya
                cliente.telefono=telefono
                cliente.avatar=avatar
                
        
                const respuesta = await cliente.update()
        
                res.json(respuesta); 
    
            }

        }

    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_cliente.delete('/:id',auth, rol(['admin']),async (req, res)=>{
    try {
        const id = req.params.id
        const respuesta = await Cliente.delete(id);

        if(respuesta=="Error"){
            res.status(404).json("No se ha encontrado el usuario con la id " + id);
        }else{
            res.json(respuesta)
        }

        
    } catch (error) {
        res.status(500).json(error.message);
    }
})




module.exports = r_cliente