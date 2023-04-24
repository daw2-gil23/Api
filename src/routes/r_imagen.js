const express = require('express')
const Imagen = require('../controladores/c_imagen')
const multer = require('multer');

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
  res.send(imagenes);
})


// definir una ruta para subir la imagen
r_imagen.post('/:id', upload.single('imagen'), async(req, res) => {
    // leer los datos de la imagen
    const imagen = req.file.buffer
    const nombre = req.file.originalname
    const IdHabitacion = req.params.id
  
    Imagen.create(imagen,nombre,IdHabitacion)

    // enviar una respuesta HTTP con un mensaje de éxito
    res.send('Imagen guardada en la base de datos');
})

r_imagen.put('/:id',upload.single('imagen'), async(req, res) => {
    try {
        const id = req.params.id
        const imagen = await Imagen.getById(id);

        if(imagen=="Error"){
            res.status(404).send("No se ha encontrado la imagen con la id " + id);
        }else{
            imagen.nombre = req.file.originalname
            imagen.imagen = req.file.buffer
    
            const respuesta = await imagen.update()
    
            res.send(respuesta);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});

  


module.exports = r_imagen