const express = require('express');
const Reserva = require('../controladores/c_reservas');
const r_reserva = express.Router()
//base de datos pero el le llama pool

r_reserva.get('/',async (req, res) => {
    try {
        const reservas = await Reserva.getAll();
        res.send(reservas);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//r_reserva.get('/:id',leerHabitacionId)

r_reserva.post('/',async (req, res) => {
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

// r_reserva.delete('/:id',eliminarHabitacion)

// r_reserva.put('/:id',actualizarHabitacion)

module.exports = r_reserva