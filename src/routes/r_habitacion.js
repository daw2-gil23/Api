const express = require('express')
const { leerHabitaciones, leerHabitacionId, insertarHabitacion, eliminarHabitacion } = require('../controladores/c_habitacion')
const r_habitacion = express.Router()
//base de datos pero el le llama pool


r_habitacion.get('/', leerHabitaciones)

r_habitacion.get('/:id',leerHabitacionId)

r_habitacion.post('/',insertarHabitacion)

r_habitacion.delete('/:id',eliminarHabitacion)

module.exports = r_habitacion