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
        console.log("hola")
        const habitaciones = await pool.query('Select * from habitacion')

        const habitacionesMap = habitaciones.map(({ id, cama, escritorio,armario,precio,cfPiso }) => {
            return new Habitacion(id, cama, escritorio,armario,precio,cfPiso);
        });      

        return habitacionesMap
    }

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

        console.log(resultados)
    
        const habitacion = resultados[0];
        // Crear un objeto Habitacion a partir de los resultados y devolverlo
        return new Habitacion
        (habitacion.id, habitacion.cama, habitacion.escritorio, habitacion.armario, habitacion.precio, habitacion.cfPiso)
    }

    static async create(nuevaHabitacion) {
        // Insertar una nueva habitación en la base de datos
        await pool.query('insert into habitacion set ?',[nuevaHabitacion])
    
        // Crear un nuevo objeto Habitacion a partir de los resultados y devolverlo
        return('Se ha creado correctamente')
    }
    
    static async update() {
        // Actualizar la habitación en la base de datos
        const query = 'UPDATE habitaciones SET numero = ?, tipo = ? WHERE id = ?';
        await pool.query(query, [this.numero, this.tipo, this.id]);
    
    }
    
    
}

  
  

