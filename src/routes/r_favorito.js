const express = require('express')
const { insertarFavorito, leerFavoritoIDCliente, leerFavoritos, eliminarfavorito} = require('../controladores/c_favorito.js')

const r_favorito = express.Router()
//base de datos pero el le llama pool


r_favorito.get('/', leerFavoritos)

r_favorito.get('/favoritosCliente/:idCliente',leerFavoritoIDCliente)

r_favorito.post('/',insertarFavorito)

r_favorito.delete('/',eliminarfavorito)


module.exports = r_favorito