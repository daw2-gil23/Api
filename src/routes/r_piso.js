const express = require('express')
const { leerPisos, leerPisoID, insertarPiso } = require('../controladores/c_piso')
const r_piso = express.Router()
//base de datos pero el le llama pool


r_piso.get('/', leerPisos)

r_piso.get('/:id',leerPisoID)

r_piso.post('/',insertarPiso)

module.exports = r_piso