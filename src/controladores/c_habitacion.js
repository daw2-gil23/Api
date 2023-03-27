const pool = require('../database')

module.exports = class Habitacion {
    // Mapping de propiedades de la tabla perfiles
    constructor(id=null, cama=null, escritorio=null, armario=null, precio=null, cfPiso=null) {
      this.id = id
      this.cama = cama
      this.escritorio = escritorio
      this.armario = armario
      this.precio = precio
      this.cfPiso = cfPiso
    }
  
    //leer todos
    static async getAll() {
        const habitaciones = await pool.query('Select * from habitacion')

        const habitacionesMap = habitaciones.map(({ id, cama, escritorio,armario,precio,cfPiso }) => {
            return new Habitacion(id, cama, escritorio,armario,precio,cfPiso);
        });      

        return habitacionesMap
    }

    static async getById(id) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM habitacion WHERE id = ?';
        const resultados = await pool.query(query, [id]);
    
        // Si no se encuentra ninguna habitación con ese ID, devolver null
        if (resultados.length === 0) {
          return null;
        }

        const habitacion = resultados[0];
        // Crear un objeto Habitacion a partir de los resultados y devolverlo
        return new Habitacion
        (habitacion.id, habitacion.cama, habitacion.escritorio, habitacion.armario, habitacion.precio, habitacion.cfPiso)
    }

    static async create(nuevaHabitacion) {
        // Insertar una nueva habitación en la base de datos

        try {
            await pool.query('insert into habitacion set ?',[nuevaHabitacion])
            // Crear un nuevo objeto Habitacion a partir de los resultados y devolverlo
            return('Se ha creado correctamente')
        } catch (error) {
            console.log(error)
            throw new Error('Error en crear la habitación')
        }
    
    }
    
    async update() {

        try {
            // Actualizar la habitación en la base de datos
            const query = 'UPDATE habitacion SET cama = ?, escritorio = ?, armario = ?, precio = ? WHERE id = ?';
            await pool.query(query, [this.cama, this.escritorio, this.armario, this.precio, this.id]);
            return('Se ha actualizado correctamente')

        } catch (error) {
            console.log(error)
            throw new Error('Error en actualizarlo')
        }
    }

    static async delete(id) {
        try {
            const query = 'DELETE FROM habitacion WHERE id = ?';
            const result = await pool.query(query, [id]);

            if (result.affectedRows === 0) {
              throw new Error(`No se encontró ninguna habitación con el ID ${id}`);
            }

            return `Habitación con el ID ${id} eliminada correctamente`;

          } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar la habitación');
          }
    }        
        
}