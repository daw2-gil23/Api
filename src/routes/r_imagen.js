const express = require('express')
const Imagen = require('../controladores/c_imagen')
const multer = require('multer');
const sharp = require('sharp');
const Habitacion = require('../controladores/c_habitacion');


const r_imagen = express.Router()
//base de datos pero el le llama pool
// configurar multer para procesar archivos enviados en una solicitud HTTP
const upload = multer({ storage: multer.memoryStorage() });

// definir una ruta para subir la imagen
r_imagen.get('/:id', async (req, res) => {
  const IdHabitacion = req.params.id

  const imagenes = await Imagen.getByIdHabitacion(IdHabitacion)

  console.log("Enviando imagen")

  // enviar una respuesta HTTP con un mensaje de éxito
  res.json(imagenes);
})


// definir una ruta para subir la imagen
r_imagen.post('/:id', upload.single('imagen'), async(req, res) => {
    try {
        // leer los datos de la imagen
        const imagen = req.file.buffer
        const nombre = req.file.originalname
        const IdHabitacion = req.params.id

        var errores = []

        try {
            const habitacion = await Habitacion.getById(IdHabitacion)
            if(habitacion=="Error"){
                errores.push("No existe la habitacion")
            }
        } catch (error) {
            errores.push("Error en buscar la habitacion")
        }

        if (errores.length > 0) {
            // Si hay errores, devolverlos como un array
            res.json(errores)
        } else {

            const imagenRedimensionada = await sharp(imagen)
            .resize({
            width: 800,
            height: 600,
            fit: sharp.fit.inside,
            withoutEnlargement: true,
            })
            .toBuffer();

    
            const respuesta = await Imagen.create(imagenRedimensionada,nombre,IdHabitacion)

            if(respuesta.success == false){
                res.status(500).send(respuesta.message);
            }

            // enviar una respuesta HTTP con un mensaje de éxito
            res.json('Imagen guardada en la base de datos');

        }

    } catch (error) {
        res.status(500).send(error.message);
    }
})

r_imagen.put('/:id',upload.single('imagen'), async(req, res) => {
    try {
        const id = req.params.id
        const imagen = await Imagen.getById(id);

        if(imagen=="Error"){
            res.status(404).send("No se ha encontrado la imagen con la id " + id);
        }else{
            imagen.nombre = req.file.originalname

            const imagenRedimensionada = await sharp(req.file.buffer)
            .resize({
            width: 800,
            height: 600,
            fit: sharp.fit.inside,
            withoutEnlargement: true,
            })
            .toBuffer();

            imagen.imagen = imagenRedimensionada
    
            const respuesta = await imagen.update()
    
            res.json(respuesta);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

r_imagen.delete('/:id',async (req, res)=>{
    try {
        const id = req.params.id
        const respuesta = await Imagen.delete(id);

        if(respuesta=="Error"){
            res.status(404).send("No se ha encontrado la imagen con la id " + id);
        }else{
            res.json(respuesta);;
        }

        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

  


module.exports = r_imagen