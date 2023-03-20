const express = require('express')
const { leerCliente, leerClienteID, insertarCliente } = require('../controladores/c_cliente')
const r_favorito = express.Router()
//base de datos pero el le llama pool


r_favorito.get('/', leerCliente)

r_favorito.get('/:id',leerClienteID)

r_favorito.post('/',insertarCliente)

module.exports = r_favorito