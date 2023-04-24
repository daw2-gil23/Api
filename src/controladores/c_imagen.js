const pool = require('../database')

module.exports = class Imagen {
    // Mapping de propiedades de la tabla habitacion
    constructor(id=null, nombre=null, imagen=null, cfHabitacion=null) {
      this.id = id
      this.nombre = nombre
      this.imagen = imagen
      this.cfHabitacion = cfHabitacion
    }

    static async create(imagen,nombre,IdHabitacion){
        // Insertar una nueva habitación en la base de datos

        try {
            // preparar la consulta SQL      
            const query = 'INSERT INTO imagen (nombre, imagen, cfHabitacion) VALUES (?, ?, ?)';
            await pool.query(query, [nombre, imagen, IdHabitacion]);

        } catch (error) {
            console.log(error)
            throw new Error('Error en crear la habitación')
        }
    
    }

    static async getByIdHabitacion(idHabitacion) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM imagen WHERE cfHabitacion = ?';
        const imagenes = await pool.query(query, [idHabitacion]);
    
        const imagenesMap = imagenes.map(({ id, nombre, imagen, cfHabitacion}) => {
            return new Imagen(id, nombre, imagen,cfHabitacion);
        });      

        return imagenesMap
    }


    static async getById(id) {
        const query = 'SELECT * FROM imagen WHERE id = ?';
        const resultados = await pool.query(query, [id]);
    
        // Si no se encuentra ninguna pisoión con ese ID, devolver null
        if (resultados.length === 0) {
          return "Error";
        }

        const imagen = resultados[0];
        // Crear un objeto pisoion a partir de los resultados y devolverlo
        return new Imagen
        (imagen.id, imagen.nombre, imagen.imagen, imagen.cfHabitacion)
    }

    async update() {
        try {
            // Actualizar la piso en la base de datos
            const query = 'UPDATE imagen SET imagen = ?, nombre = ? WHERE id = ?';
            await pool.query(query, [this.imagen, this.nombre, this.id]);
            return('Se ha actualizado correctamente')

        } catch (error) {
            console.log(error)
            return('Error')
        }
    }

    static async delete(id) {
        try {
            const query = 'DELETE FROM imagen WHERE id = ?';
            const result = await pool.query(query, [id]);

            if (result.affectedRows === 0) {
                return "Error";
            }

            return `Piso con el ID ${id} eliminada correctamente`;

          } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar la piso');
          }
    }        
    

        
}