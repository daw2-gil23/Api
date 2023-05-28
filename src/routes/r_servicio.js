const express = require('express');
const Servicio = require('../controladores/c_servicio');
const auth = require('../middleware/auth');
const rol = require('../middleware/rol')

const r_servicio = express.Router()
//base de datos pero el le llama pool


r_servicio.get('/',async (req, res) => {
    try {
        const servicios = await Servicio.getAll();
        res.json(servicios);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_servicio.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const servicioId = await Servicio.getById(id);

        if(servicioId=="Error"){
            res.status(404).json("No se ha encontrado el servicio con la id " + id);
        }else{
            res.json(servicioId);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_servicio.post('/',auth, rol(['admin']), async (req, res) => {
    try {
        const {nombre, precio, description} = req.body

        const errores = await Servicio.validar(nombre, description, precio)

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            const nuevoServicio = {
                nombre,
                precio,
                description
            }
            const respuesta = await Servicio.create(nuevoServicio);
            res.json(respuesta)

        }

    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_servicio.put('/:id',auth, rol(['admin']),async (req, res) => {
    try {
        const id = req.params.id
        const servicio = await Servicio.getById(id);
        if (!servicio) {
          console.log(`No se encontró ningun servicio con ID ${id}`);
          return;
        }

        const {nombre, precio, description} = req.body


        const errores = await Servicio.validar(nombre, precio, description)

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            servicio.nombre=nombre
            servicio.precio=precio
            servicio.description=description

            const respuesta = await servicio.update()

            res.json(respuesta)
        }

    } catch (error) {
        res.json("Error en actualizar")
    }
});

r_servicio.delete('/:id',auth, rol(['admin']),async (req, res)=>{
    try {
        const id = req.params.id
        const respuesta = await Servicio.delete(id);

        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = r_servicio