const express = require('express')
const { leerCliente, leerClienteID, insertarCliente, eliminarCliente, actualizarCliente } = require('../controladores/c_cliente')
const r_cliente = express.Router()
//base de datos pero el le llama pool


// r_cliente.get('/', leerCliente)

// r_cliente.get('/:id',leerClienteID)

// r_cliente.post('/',insertarCliente)

// r_cliente.delete('/:id',eliminarCliente)

// r_cliente.put('/:id',actualizarCliente)


module.exports = r_cliente