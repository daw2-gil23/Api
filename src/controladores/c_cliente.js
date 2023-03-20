const pool = require('../database')

module.exports = {
    leerCliente : async(req,res)=>{
        try {
            const habitaciones = await pool.query('Select * from cliente')
            res.json(habitaciones)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido leer los usuarios"
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
                mensaje:"No se ha podido leer el usuario"
            })
        } 
    },
    insertarCliente: async(req,res)=>{
        try {
            const {nombre, primerApellido, segundoApellido, email, contrasenya, telefono } = req.body
            const nuevoUsuario = {
                nombre,
                primerApellido,
                segundoApellido,
                email,
                contrasenya,
                telefono
            }
            await pool.query('insert into cliente set ?',[nuevoUsuario])
            res.json('Se ha creado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido crear el usuario"
            })
        } 
    },
    eliminarCliente: async(req,res)=>{
        try {
            const { id } = req.params 
            await pool.query('DELETE FROM cliente WHERE ID = ?', [id])
            res.json('Se ha eliminado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido eliminar el cliente"
            })
        } 
    }
}