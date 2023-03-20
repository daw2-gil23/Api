const express = require('express')
const { leerCliente, leerClienteID, insertarCliente } = require('../controladores/c_cliente')
const r_cliente = express.Router()
//base de datos pero el le llama pool


r_cliente.get('/', leerCliente)

r_cliente.get('/:id',leerClienteID)

r_cliente.post('/',insertarCliente)

module.exports = r_cliente