const pool = require('../database')

module.exports = {
    leerHabitaciones : async(req,res)=>{
        try {
            const habitaciones = await pool.query('Select * from habitacion')
            res.json(habitaciones)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"algo ha salido mal"
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
                mensaje:"algo ha salido mal"
            })
        } 
    }
}