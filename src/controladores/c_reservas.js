const pool = require('../database')

module.exports = class Reserva {
    // Mapping de propiedades de la tabla piso
    constructor(id=null, fecha_entrada=null, fecha_salida=null,cfCliente=null,cfHabitacion=null) {
      this.id = id
      this.fecha_entrada = fecha_entrada
      this.fecha_salida = fecha_salida
      this.cfCliente = cfCliente
      this.cfHabitacion = cfHabitacion
    }
  
    //leer todos
    static async getAll() {
        const reservas = await pool.query('Select * from reserva')

        const reservasMap = reservas.map(({ id, fecha_entrada, fecha_salida,cfCliente,cfHabitacion}) => {
            return new Reserva(id, fecha_entrada, fecha_salida,cfCliente,cfHabitacion);
        });      

        return reservasMap
    }

    static async getByIdCliente(idCliente) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM reserva WHERE cfCliente = ?';
        const reservas = await pool.query(query, [idCliente]);
    
        const reservasMap = reservas.map(({ id, fecha_entrada, fecha_salida,cfCliente,cfHabitacion}) => {
            return new Reserva(id, fecha_entrada, fecha_salida,cfCliente,cfHabitacion);
        });      

        return reservasMap
    }

    static async getByIdHabitacion(idHabitacion) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado

        const query = 'SELECT * FROM reserva WHERE cfHabitacion = ?';
        const reservas = await pool.query(query, [idHabitacion]);
    
        const reservasMap = reservas.map(({ id, fecha_entrada, fecha_salida,cfCliente,cfHabitacion}) => {
            return new Reserva(id, fecha_entrada, fecha_salida,cfCliente,cfHabitacion);
        });      

        return reservasMap
    }

    static async create(nuevaReserva) {

        try {
            await pool.query('insert into reserva set ?',[nuevaReserva])

            return('Se ha guardado correctamente')
        } catch (error) {
            console.log(error)
            throw new Error('Error al reservar')
        }
    
    }
    
    static async delete(idCliente) {
        try {

            const query = 'DELETE FROM reserva WHERE cfCliente = ?';
            const result = await pool.query(query, [idCliente]);

            if (result.affectedRows === 0) {
                return "Error";
            }

            return `Se ha eliminado la reserva del cliente ${idCliente} `;

          } catch (error) {
            console.error(error);
            throw new Error('Error a eliminar de favoritos');
          }
    }        
        
}