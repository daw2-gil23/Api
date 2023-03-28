const express = require('express')
const Habitacion = require('../controladores/c_habitacion')

const r_habitacion = express.Router()
//base de datos pero el le llama pool


r_habitacion.get('/',async (req, res) => {
    try {
        const habitaciones = await Habitacion.getAll();
        res.send(habitaciones);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_habitacion.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const habitacionId = await Habitacion.getById(id);

        if(habitacionId=="Error"){
            res.status(404).send("No se ha encontrado la habitacion con la id " + id);
        }else{
            res.send(habitacionId);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_habitacion.post('/',async (req, res) => {
    try {
        const {cama, escritorio, armario, precio, cfPiso } = req.body
        const nuevaHabitacion = {
            cama,
            escritorio,
            armario,
            precio,
            cfPiso
        }
        const respuesta = await Habitacion.create(nuevaHabitacion);
        res.json(respuesta)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_habitacion.put('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const habitacion = await Habitacion.getById(id);
        if (!habitacion) {
          console.log(`No se encontró ninguna habitación con ID ${id}`);
          return;
        }

        const {cama, escritorio, armario, precio, cfPiso } = req.body
        habitacion.cama=cama
        habitacion.escritorio=escritorio
        habitacion.armario=armario
        habitacion.precio=precio

        const respuesta = await habitacion.update()

        res.json(respuesta)
    } catch (error) {
        res.json("Error en actualizar")
    }
});

r_habitacion.delete('/:id',async (req, res)=>{
    try {
        const id = req.params.id
        const respuesta = await Habitacion.delete(id);

        res.json(respuesta);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = r_habitacion