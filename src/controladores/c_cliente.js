const pool = require('../database')

module.exports = {
    leerCliente : async(req,res)=>{
        try {
            const habitaciones = await pool.query('Select * from cliente')
            res.json(habitaciones)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"algo ha salido mal"
            })
        }
    },
    leerClienteID: async(req,res)=>{
        try {
            const id = req.params.id
            const habitacion = await pool.query('Select * from cliente where id = ?', [id])
            res.json(habitacion)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"algo ha salido mal"
            })
        } 
    },
    insertarCliente: async(req,res)=>{
        //saca por consola lo que ha recibido
        const data = req.body
        console.log(data)
        // Enviar el objeto recibido en la respuesta HTTP
        res.json(data)
    }
}