const express = require('express')
const Favorito = require('../controladores/c_favorito')
const r_favorito = express.Router()
const auth = require('../middleware/auth');
const rol = require('../middleware/rol')
//base de datos pero el le llama pool


r_favorito.get('/',auth, rol(['admin']),async (req, res) => {
    try {
        const clientes = await Favorito.getAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//miramos los favoritos del usuario
r_favorito.get('/:idCliente',auth, async (req, res) => {
    try {
        const idCliente = req.params.idCliente
        const favoritosCliente = await Favorito.getByIdCliente(idCliente);
            
        if(favoritosCliente=="Error"){
            res.status(404).json("No se ha encontrado el cliente con la id " + idCliente);
        }else{
            res.json(favoritosCliente);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_favorito.get('/habitacion/:idHabitacion',auth,async (req, res) => {
    try {
        const idHabitacion = req.params.idHabitacion
        const favoritosHabitacion = await Favorito.getByIDHabitacion(idHabitacion);
            
        if(favoritosHabitacion=="Error"){
            res.status(404).json("No se ha encontrado el cliente con la id " + idHabitacion);
        }else{
            res.json(favoritosHabitacion);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});



r_favorito.post('/',auth, async (req, res) => {
    try {
        const {cfCliente, cfHabitacion} = req.body
        const nuevoFavorito = {
            cfCliente,
            cfHabitacion,
        }
        const respuesta = await Favorito.create(nuevoFavorito);
        res.json(respuesta)

    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_favorito.delete('/',auth, async (req, res) => {
    try {
        const {cfCliente, cfHabitacion} = req.body
        const respuesta = await Favorito.delete(cfCliente,cfHabitacion);

        if(respuesta=="Error"){
            res.status(404).json("No se ha encontrado el usuario con la id " + id);
        }else{
            res.json(respuesta);;
        }

        
    } catch (error) {
        res.status(500).json(error.message);
    }
});



module.exports = r_favorito