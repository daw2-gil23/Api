const pool = require('../database')

module.exports = {
    leerPisos : async(req,res)=>{
        try {
            const pisos = await pool.query('Select * from piso')
            res.json(pisos)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido leer los pisos"
            })
        }
    },
    leerPisoID: async(req,res)=>{
        try {
            const id = req.params.id
            const piso = await pool.query('Select * from piso where id = ?', [id])
            res.json(piso)
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido leer el piso"
            })
        } 
    },
    insertarPiso: async(req,res)=>{
        try {
            const {cocina, salon, terraza, wifi, aseos, sexo } = req.body
            const nuevoPiso = {
                cocina,
                salon,
                terraza,
                wifi,
                aseos,
                sexo
            }
            await pool.query('insert into piso set ?',[nuevoPiso])
            res.json('Se ha creado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido crear el piso"
            })
        } 
    },
    actualizarPiso: async(req,res)=>{
        try {
            const id = req.params.id
            const {cocina, salon, terraza, wifi, aseos, sexo } = req.body
            const nuevoPiso = {
                cocina,
                salon,
                terraza,
                wifi,
                aseos,
                sexo
            }
            await pool.query('Update piso set ? where id = ?', [nuevoPiso, id])
            res.json('Se ha actualizado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido actualizar el piso"
            })
        } 
    },
    eliminarPiso: async(req,res)=>{
        try {
            const { id } = req.params 
            await pool.query('DELETE FROM piso WHERE ID = ?', [id])
            res.json('Se ha eliminado correctamente')
        } catch (error) {
            res.json({
                error:error,
                mensaje:"No se ha podido eliminar el piso"
            })
        } 
    }
}