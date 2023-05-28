const express = require('express')
const Habitacion = require('../controladores/c_habitacion');
const Piso = require('../controladores/c_piso');
const auth = require('../middleware/auth');
const rol = require('../middleware/rol')

const r_habitacion = express.Router()
//base de datos pero el le llama pool


r_habitacion.get('/' ,async (req, res) => {
    try {
        const habitaciones = await Habitacion.getAll();
        res.json(habitaciones);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_habitacion.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const habitacionId = await Habitacion.getById(id);

        if(habitacionId=="Error"){
            res.status(404).json("No se ha encontrado la habitacion con la id " + id);
        }else{
            res.json(habitacionId);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_habitacion.post('/', auth, rol(['admin']),async (req, res) => {
    try {
        const {cama, escritorio, armario, precio, cfPiso } = req.body
        var errores = await Habitacion.validar(cama, escritorio, armario, precio, cfPiso)

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            const nuevaHabitacion = {
                cama,
                escritorio,
                armario,
                precio,
                cfPiso
            }
            const respuesta = await Habitacion.create(nuevaHabitacion);
            res.json(respuesta)

        }

    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_habitacion.put('/:id',auth, rol(['admin']), async (req, res) => {
    try {
        const id = req.params.id
        const habitacion = await Habitacion.getById(id);
        if (!habitacion) {
          console.log(`No se encontró ninguna habitación con ID ${id}`);
          res.json("No se encuentra la habitación con id: " + id)
        }

        const {cama, escritorio, armario, precio, cfPiso } = req.body
        var errores = await Habitacion.validar(cama, escritorio, armario, precio, cfPiso)

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            habitacion.cama=cama
            habitacion.escritorio=escritorio
            habitacion.armario=armario
            habitacion.precio=precio
    
            const respuesta = await habitacion.update()
    
            res.json(respuesta)

        }

    } catch (error) {
        res.json("Error en actualizar")
    }
});

r_habitacion.delete('/:id',auth, rol(['admin']), async (req, res)=>{
    try {
        const id = req.params.id
        const respuesta = await Habitacion.delete(id);

        res.json(respuesta);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = r_habitacion