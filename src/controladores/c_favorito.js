const pool = require('../database')

module.exports = {
    leerFavoritos : async(req,res)=>{
        try {
            const favoritos = await pool.query('Select * from favorito')
            res.json(favoritos)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido leer los favortios"
            })
        }
    },
    leerFavoritoIDCliente: async(req,res)=>{
        try {
            const idCliente = req.params.idCliente
            const favoritoCliente = await pool.query('Select * from favorito where cfCliente = ?', [idCliente])
            res.json(favoritoCliente)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido leer el usuario"
            })
        } 
    },
    insertarFavorito: async(req,res)=>{
        try {
            const {cfCliente, cfHabitacion} = req.body
            const nuevoFavorito = {
                cfCliente,
                cfHabitacion,
            }
            await pool.query('insert into favorito set ?',[nuevoFavorito])
            res.json('Se ha creado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido crear el usuario"
            })
        } 
    },
    eliminarfavorito: async(req,res)=>{
        try {
            const {cfCliente, cfHabitacion} = req.body
            await pool.query('DELETE FROM favorito WHERE cfCliente = ? and cfHabitacion = ?', [cfCliente,cfHabitacion])
            res.json('Se ha eliminado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido eliminar el cliente"
            })
        } 
    }
}