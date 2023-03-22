const express = require('express')
const { leerHabitaciones, leerHabitacionId, insertarHabitacion, eliminarHabitacion, actualizarHabitacion } = require('../controladores/c_habitacion')
const r_reserva = express.Router()
//base de datos pero el le llama pool


r_reserva.get('/', leerHabitaciones)

r_reserva.get('/:id',leerHabitacionId)

r_reserva.post('/',insertarHabitacion)

r_reserva.delete('/:id',eliminarHabitacion)

r_reserva.put('/:id',actualizarHabitacion)

module.exports = r_reserva