const express = require('express');
const Piso = require('../controladores/c_piso');
const r_piso = express.Router()
//base de datos pero el le llama pool


r_piso.get('/',async (req, res) => {
    try {
        const pisos = await Piso.getAll();
        res.send(pisos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_piso.get('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const pisoId = await Piso.getById(id);
        console.log(pisoId)
            
        if(pisoId=="Error"){
            res.status(404).send("No se ha encontrado el piso con la id " + id);
        }else{
            res.send(pisoId);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_piso.post('/',async (req, res) => {
    try {
        const {cocina, salon, terraza, wifi, aseos,sexo } = req.body

        const errores = await Piso.validar(cocina, salon, terraza, wifi, aseos,sexo)

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            const nuevoPiso = {
                cocina,
                salon,
                terraza,
                wifi,
                aseos,
                sexo
            }
            const respuesta = await Piso.create(nuevoPiso);
            res.json(respuesta)

        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_piso.put('/:id',async (req, res) => {
    try {
        const id = req.params.id
        const piso = await Piso.getById(id);

        if(piso=="Error"){
            res.status(404).send("No se ha encontrado el piso con la id " + id);
        }else{
            const {cocina, salon, terraza, wifi, aseos,sexo } = req.body
            const errores = await Piso.validar(cocina, salon, terraza, wifi, aseos,sexo)

            if (errores.length > 0) {
                // Si hay errores, devolverlos como un array
                res.json(errores)
            } else {
                
                piso.cocina=cocina
                piso.salon=salon
                piso.terraza=terraza
                piso.wifi=wifi
                piso.aseos=aseos
                piso.sexo=sexo
        
        
                const respuesta = await piso.update()
        
                res.send(respuesta);
    
            }

        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_piso.delete('/:id',async (req, res)=>{
    try {
        const id = req.params.id
        const respuesta = await Piso.delete(id);

        if(respuesta=="Error"){
            res.status(404).send("No se ha encontrado el piso con la id " + id);
        }else{
            res.json(respuesta);;
        }

        
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = r_piso