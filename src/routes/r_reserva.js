const express = require('express');
const Reserva = require('../controladores/c_reservas');
const r_reserva = express.Router()
const auth = require('../middleware/auth');
const rol = require('../middleware/rol')
//base de datos pero el le llama pool

r_reserva.get('/',auth, rol(['admin']),async (req, res) => {
    try {
        const reservas = await Reserva.getAll();
        res.json(reservas);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_reserva.get('/cliente/:idCliente',auth, async (req, res) => {
    try {
        const idCliente = req.params.idCliente
        const reservaCliente = await Reserva.getByIdCliente(idCliente);
            
        if(reservaCliente=="Error"){
            res.status(404).json("No se ha encontrado el cliente con la id " + idCliente);
        }else{
            res.json(reservaCliente);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_reserva.get('/habitacion/:idHabitacion',auth, async (req, res) => {
    try {
        const idHabitacion = req.params.idHabitacion
        const reservaCliente = await Reserva.getByIdHabitacion(idHabitacion);

        if(reservaCliente=="Error"){
            res.status(404).json("No se ha encontrado la habitacion con la id " + idHabitacion);
        }else{
            res.json(reservaCliente);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_reserva.post('/',auth, async (req, res) => {
    try {
        const {fecha_entrada, fecha_salida, cfCliente, cfHabitacion } = req.body

        const errores = await Reserva.validar(fecha_entrada, fecha_salida, cfCliente, cfHabitacion)

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            const nuevaReserva = {
                fecha_entrada,
                fecha_salida,
                cfCliente,
                cfHabitacion
            }
            const respuesta = await Reserva.create(nuevaReserva);
            res.json(respuesta)

        }

    } catch (error) {
        res.status(500).json(error.message);
    }
});

r_reserva.delete('/:idCliente',auth, async (req, res) => {
    try {
        const idCliente = req.params.idCliente
        
        const respuesta = await Reserva.delete(idCliente);

        if(respuesta=="Error"){
            res.status(404).json("No se ha encontrado el usuario con la id " + id);
        }else{
            res.json(respuesta);;
        }

        
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// r_reserva.put('/:id',actualizarHabitacion)

module.exports = r_reserva