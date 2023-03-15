const express = require('express')
const r_habitacion = express.Router()


r_habitacion.get('/',(req, res)=>{
    res.send("Estas en la habitaciones")
})

module.exports = r_habitacion