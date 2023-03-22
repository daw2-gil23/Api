const express = require('express')
const { leerPisos, leerPisoID, insertarPiso, eliminarPiso, actualizarPiso } = require('../controladores/c_piso')
const r_piso = express.Router()
//base de datos pero el le llama pool


r_piso.get('/', leerPisos)

r_piso.get('/:id',leerPisoID)

r_piso.post('/',insertarPiso)

r_piso.delete('/:id',eliminarPiso)

r_piso.put('/:id',actualizarPiso)


module.exports = r_piso