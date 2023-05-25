const express = require('express')
const Favorito = require('../controladores/c_favorito')
const r_favorito = express.Router()
//base de datos pero el le llama pool


r_favorito.get('/',async (req, res) => {
    try {
        const clientes = await Favorito.getAll();
        res.send(clientes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//miramos los favoritos del usuario
r_favorito.get('/:idCliente',async (req, res) => {
    try {
        const idCliente = req.params.idCliente
        const favoritosCliente = await Favorito.getByIdCliente(idCliente);
            
        if(favoritosCliente=="Error"){
            res.status(404).send("No se ha encontrado el cliente con la id " + idCliente);
        }else{
            res.send(favoritosCliente);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_favorito.get('/habitacion/:idHabitacion',async (req, res) => {
    try {
        const idHabitacion = req.params.idHabitacion
        const favoritosHabitacion = await Favorito.getByIdCliente(idHabitacion);
            
        if(favoritosHabitacion=="Error"){
            res.status(404).send("No se ha encontrado el cliente con la id " + idHabitacion);
        }else{
            res.send(favoritosHabitacion);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});



r_favorito.post('/',async (req, res) => {
    try {
        const {cfCliente, cfHabitacion} = req.body
        const nuevoFavorito = {
            cfCliente,
            cfHabitacion,
        }
        const respuesta = await Favorito.create(nuevoFavorito);
        res.json(respuesta)

    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_favorito.delete('/',async (req, res) => {
    try {
        const {cfCliente, cfHabitacion} = req.body
        const respuesta = await Favorito.delete(cfCliente,cfHabitacion);

        if(respuesta=="Error"){
            res.status(404).send("No se ha encontrado el usuario con la id " + id);
        }else{
            res.json(respuesta);;
        }

        
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = r_favorito