const pool = require('../database')

module.exports = {
    leerPisos : async(req,res)=>{
        try {
            const habitaciones = await pool.query('Select * from piso')
            res.json(habitaciones)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"algo ha salido mal"
            })
        }
    },
    leerPisoID: async(req,res)=>{
        try {
            const id = req.params.id
            const habitacion = await pool.query('Select * from piso where id = ?', [id])
            res.json(habitacion)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"algo ha salido mal"
            })
        } 
    },
    insertarPiso: async(req,res)=>{
        //saca por consola lo que ha recibido
        const data = req.body
        console.log(data)
        // Enviar el objeto recibido en la respuesta HTTP
        res.json(data)
    }
}