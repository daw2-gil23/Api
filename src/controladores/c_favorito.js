const pool = require('../database')

module.exports = class Favorito {
    // Mapping de propiedades de la tabla piso
    constructor(id=null, cfCliente=null, cfHabitacion=null) {
      this.id = id
      this.cfCliente = cfCliente
      this.cfHabitacion = cfHabitacion
    }
  
    //leer todos
    static async getAll() {
        const favoritos = await pool.query('Select * from favorito')

        const favoritosMap = favoritos.map(({ id, cfCliente, cfHabitacion}) => {
            return new Favorito(id, cfCliente, cfHabitacion);
        });      

        return favoritosMap
    }

    static async getByIdCliente(idCliente) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM favorito WHERE cfCliente = ?';
        const favoritos = await pool.query(query, [idCliente]);
    
        const favoritosMap = favoritos.map(({ id, cfCliente, cfHabitacion}) => {
            return new Favorito(id, cfCliente, cfHabitacion);
        });      

        return favoritosMap
    }

    static async getByIDHabitacion(idHabitacion) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM favorito WHERE cfHabitacion = ?';
        const favoritos = await pool.query(query, [idHabitacion]);
    
        const favoritosMap = favoritos.map(({ id, cfCliente, cfHabitacion}) => {
            return new Favorito(id, cfCliente, cfHabitacion);
        });      

        return favoritosMap
    }

    static async create(nuevoFavorito) {

        try {
            await pool.query('insert into favorito set ?',[nuevoFavorito])

            return('Se ha guardado correctamente')
        } catch (error) {
            console.log(error)
            throw new Error('Error al guardar en favoritos')
        }
    
    }
    
    static async delete(idCliente,idHabitacion) {
        try {

            const query = 'DELETE FROM favorito WHERE cfCliente = ? and cfHabitacion = ?';
            const result = await pool.query(query, [idCliente,idHabitacion]);

            if (result.affectedRows === 0) {
                return "Error";
            }

            return `Se ha eliminado el favorito del usuario ${idCliente} de la habitacion ${idHabitacion} `;

          } catch (error) {
            console.error(error);
            throw new Error('Error a eliminar de favoritos');
          }
    }        
        
}