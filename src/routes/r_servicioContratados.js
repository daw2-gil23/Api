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

        const errores = await ServicioContratado.validar(tiempoInicio, tiempoFinal, cfCliente, cfServicio, precioTotal)

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

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
            ServicioContratado.sumarPreciosPorUsuario(cfCliente)
            res.json(respuesta)

        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_servicioContratados.put('/:id',async (req, res) => {
    try {
        const id = req.params.id

        const {tiempoInicio, tiempoFinal, cfCliente, cfServicio, precioTotal  } = req.body
        const errores = await ServicioContratado.validar(tiempoInicio, tiempoFinal, cfCliente, cfServicio, precioTotal)

        const serviciosContratados = await ServicioContratado.getById(id);
        if (!serviciosContratados) {
            errores.push('No existe el servicio contratado con esa id')
        }


        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            serviciosContratados.tiempoInicio=tiempoInicio
            serviciosContratados.tiempoFinal=tiempoFinal
            serviciosContratados.cfCliente=cfCliente
            serviciosContratados.cfServicio=cfServicio
            serviciosContratados.precioTotal=precioTotal
    
            const respuesta = await serviciosContratados.update()
    
            ServicioContratado.sumarPreciosPorUsuario(cfCliente)
    
            res.json(respuesta)

        }

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