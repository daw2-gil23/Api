const pool = require('../database')

module.exports = {
    leerHabitaciones : async(req,res)=>{
        try {
            const habitaciones = await pool.query('Select * from habitacion')
            res.json(habitaciones)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido leer las habitaciones"
            })
        }
    },
    leerHabitacionId: async(req,res)=>{
        try {
            const id = req.params.id
            const habitacion = await pool.query('Select * from habitacion where id = ?', [id])
            res.json(habitacion)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido leer la habitación"
            })
        } 
    },
    insertarHabitacion: async(req,res)=>{
        try {
            const {cama, escritorio, armario, precio, cfPiso } = req.body
            const nuevaHabitacion = {
                cama,
                escritorio,
                armario,
                precio,
                cfPiso
            }
            await pool.query('insert into habitacion set ?',[nuevaHabitacion])
            res.json('Se ha creado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido crear la habitación"
            })
        } 
    },
    actualizarHabitacion: async(req,res)=>{
        try {
            const id = req.params.id
            const {cama, escritorio, armario, precio, cfPiso } = req.body
            const nuevaHabitacion = {
                cama,
                escritorio,
                armario,
                precio,
                cfPiso
            }
            await pool.query('Update habitacion set ? where id = ?', [nuevaHabitacion, id])
            res.json('Se ha actualizado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido actualizar la habitación"
            })
        } 
    },
    eliminarHabitacion: async(req,res)=>{
        try {
            const { id } = req.params 
            await pool.query('DELETE FROM habitacion WHERE ID = ?', [id])
            res.json('Se ha eliminado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido eliminar la habitación"
            })
        } 
    }
}