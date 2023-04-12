const express = require('express');
const Servicio = require('../controladores/c_servicio');


const r_servicio = express.Router()
//base de datos pero el le llama pool


r_servicio.get('/',async (req, res) => {
    try {
        const servicios = await Servicio.getAll();
        res.send(servicios);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_servicio.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const servicioId = await Servicio.getById(id);

        if(servicioId=="Error"){
            res.status(404).send("No se ha encontrado el servicio con la id " + id);
        }else{
            res.send(servicioId);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_servicio.post('/',async (req, res) => {
    try {
        const {nombre, precio, description} = req.body
        const nuevoServicio = {
            nombre,
            precio,
            description
        }
        const respuesta = await Servicio.create(nuevoServicio);
        res.json(respuesta)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_servicio.put('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const servicio = await Servicio.getById(id);
        if (!servicio) {
          console.log(`No se encontró ningun servicio con ID ${id}`);
          return;
        }

        const {nombre, precio, description} = req.body
        servicio.nombre=nombre
        servicio.precio=precio
        servicio.description=description

        const respuesta = await servicio.update()

        res.json(respuesta)
    } catch (error) {
        res.json("Error en actualizar")
    }
});

r_servicio.delete('/:id',async (req, res)=>{
    try {
        const id = req.params.id
        const respuesta = await Servicio.delete(id);

        res.json(respuesta);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = r_servicio