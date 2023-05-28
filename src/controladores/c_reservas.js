const pool = require('../database')
const moment = require('moment')
const Cliente = require('./c_cliente')
const Habitacion = require('./c_habitacion')

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
            throw new Error('Error a eliminar de reserva');
          }
    }        

    static async validar(fecha_entrada,fecha_salida,cfCliente,cfHabitacion) {
        var errores = []
        
        const fechaEntradaValida = moment(fecha_entrada, 'YYYY-MM-DD', true).isValid();
        const fechaSalidaValida = moment(fecha_salida, 'YYYY-MM-DD', true).isValid();
        
        if (fechaEntradaValida && fechaSalidaValida) {
            const fechaEntrada = new Date(fecha_entrada);
            const fechaSalida = new Date(fecha_salida);
        
            if (fechaEntrada >= fechaSalida) {
                errores.push("Fecha entrada no puede ser mayor al de salida");
            }
        } else {
            errores.push("El formato de las fechas no es válido");
        }        
        
        try {
            const cliente = await Cliente.getById(cfCliente)
            if(cliente=="Error"){
                errores.push("No existe el cliente")
            }
        } catch (error) {
            errores.push("Error en buscar el cliente")
        }

        try {
            const reserva = await this.getByIdCliente(cfCliente)
            if (reserva.length !== 0) {
                errores.push("No puedes reservar más de una habitación");
            }
        } catch (error) {
            errores.push("Error en buscar la reserva")
        }

        try {
            const habitacion = await Habitacion.getById(cfHabitacion)
            if(habitacion=="Error"){
                errores.push("No existe la habitacion")
            }
            const reserva = await this.getByIdHabitacion(cfHabitacion)
            if (reserva.length !== 0) {
                errores.push("No puedes reservar esta habitacion por que ya esta reservada");
            }
        } catch (error) {
            errores.push("Error en buscar la habitacion")
        }

        return errores
    }        
        
}
