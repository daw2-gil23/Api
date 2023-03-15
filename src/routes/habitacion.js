const express = require('express')
const { leerHabitaciones, leerHabitacionId } = require('../controladores/c_habitacion')
const r_habitacion = express.Router()
//base de datos pero el le llama pool


r_habitacion.get('/', leerHabitaciones)

r_habitacion.get('/:id',leerHabitacionId)

module.exports = r_habitacion