const pool = require('../database')

module.exports = class Servicio {
    // Mapping de propiedades de la tabla habitacion
    constructor(id=null, nombre=null, precio=null, description=null) {
      this.id = id
      this.nombre = nombre
      this.precio = precio
      this.description = description
    }
  
    //leer todos
    static async getAll() {
        const servicios = await pool.query('Select * from servicio')

        const serviciosMap = servicios.map(({ id, nombre, precio, description }) => {
            return new Servicio(id, nombre, precio, description);
        });      

        return serviciosMap
    }

    static async getById(id) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM servicio WHERE id = ?';
        const resultados = await pool.query(query, [id]);
    
        // Si no se encuentra ninguna habitación con ese ID, devolver null
        if (resultados.length === 0) {
            return "Error";
        }

        const servicio = resultados[0];
        // Crear un objeto Habitacion a partir de los resultados y devolverlo
        return new Servicio
        (servicio.id, servicio.nombre, servicio.precio, servicio.description)
    }

    static async create(nuevoServicio) {
        // Insertar una nueva habitación en la base de datos

        try {
            await pool.query('insert into servicio set ?',[nuevoServicio])
            // Crear un nuevo objeto Habitacion a partir de los resultados y devolverlo
            return('Se ha creado correctamente')
        } catch (error) {
            console.log(error)
            throw new Error('Error en crear el servicio')
        }
    
    }
    
    async update() {

        try {
            // Actualizar la habitación en la base de datos
            const query = 'UPDATE servicio SET nombre = ?, precio = ?, description = ? WHERE id = ?';
            await pool.query(query, [this.nombre, this.precio, this.description, this.id]);
            return('Se ha actualizado correctamente')

        } catch (error) {
            console.log(error)
            throw new Error('Error en actualizarlo')
        }

    }

    static async delete(id) {
        try {
            const query = 'DELETE FROM servicio WHERE id = ?';
            const result = await pool.query(query, [id]);

            if (result.affectedRows === 0) {
              throw new Error(`No se encontró ningun servicio con el ID ${id}`);
            }

            return `Servicio con el ID ${id} eliminado correctamente`;

          } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar el servicio');
          }
    }        

    static async validar(nombre, description, precio) {
        var errores = []
        var regex = /^[a-zA-Z]+$/;

        console.log(nombre, description,precio)

        if (!nombre || nombre.length < 2 || nombre.length > 20 || !(regex.test(nombre))) {
            errores.push("El nombre es inválido")
        }

        if (!description || !(regex.test(description))) {
            errores.push("La descripcion es inválida")
        }

        var regex = /^[0-9]+$/;

        if (regex.test(precio)) {
            if (precio > 1000 || precio < 0) {
              errores.push("El precio es incorrecto");
            }
          } else {
            errores.push("El precio no es un número entero");
        }
          
        return errores
    }        
        
}