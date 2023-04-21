const express = require('express');
const ServicioContratado = require('../controladores/c_servicioContratados');

const r_servicioContratados = express.Router()
//base de datos pero el le llama pool

r_servicioContratados.get('/sumar/:id',async (req, res) => {
    try {
        const id = req.params.id
        const serviciosContratados = await ServicioContratado.sumarPreciosPorUsuario(id);
        res.send(serviciosContratados);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


r_servicioContratados.get('/',async (req, res) => {
    try {
        const serviciosContratados = await ServicioContratado.getAll();
        res.send(serviciosContratados);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_servicioContratados.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const habitacionId = await ServicioContratado.getById(id);

        if(habitacionId=="Error"){
            res.status(404).send("No se ha encontrado la habitacion con la id " + id);
        }else{
            res.send(habitacionId);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_servicioContratados.post('/',async (req, res) => {
    try {
        const {id, tiempoInicio, tiempoFinal, cfCliente, cfServicio, precioTotal  } = req.body
        const nuevoServicioContratado = {
            id,
            tiempoInicio,
            tiempoFinal, 
            cfCliente,
            cfServicio,
            precioTotal,
            estado: "pendiente"
        }
        const respuesta = await ServicioContratado.create(nuevoServicioContratado);
        res.json(respuesta)
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_servicioContratados.put('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const serviciosContratados = await ServicioContratado.getById(id);
        if (!serviciosContratados) {
          console.log(`No se encontró ningun servicio Contratado con la ID ${id}`);
          return;
        }

        const {tiempoInicio, tiempoFinal, cfCliente, cfServicio, precioTotal  } = req.body
        serviciosContratados.tiempoInicio=tiempoInicio
        serviciosContratados.tiempoFinal=tiempoFinal
        serviciosContratados.cfCliente=cfCliente
        serviciosContratados.cfServicio=cfServicio
        serviciosContratados.precioTotal=precioTotal

        const respuesta = await serviciosContratados.update()

        res.json(respuesta)
    } catch (error) {
        res.json("Error en actualizar")
    }
});

// r_servicioContratados.delete('/:id',async (req, res)=>{
//     try {
//         const id = req.params.id
//         const respuesta = await Habitacion.delete(id);

//         res.json(respuesta);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// })

module.exports = r_servicioContratados