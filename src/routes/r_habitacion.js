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
        res.send(habitacionId);
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

// r_habitacion.delete('/:id',eliminarHabitacion)

r_habitacion.put('/:id',async (req, res) => {
    try {
        const id = req.params.id
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

module.exports = r_habitacion