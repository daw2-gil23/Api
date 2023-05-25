const pool = require('../database')
const Cliente = require('./c_cliente')
const Servicio = require('./c_servicio')
const moment = require('moment')

module.exports = class ServicioContratado {
    // Mapping de propiedades de la tabla habitacion
    constructor(id=null, tiempoInicio=null, tiempoFinal=null, cfCliente=null, cfServicio=null, precioTotal = null, estado = "pendiente") {
      this.id = id
      this.tiempoInicio = tiempoInicio
      this.tiempoFinal = tiempoFinal
      this.cfCliente = cfCliente
      this.cfServicio = cfServicio
      this.precioTotal = precioTotal
      this.estado = estado 
    }
  
    //leer todos
    static async getAll() {
        const serviciosContratados = await pool.query('Select * from servicioscontratados')

        const serviciosContratadosMap = serviciosContratados.map(({ id, tiempoInicio, tiempoFinal, cfCliente, cfServicio, precioTotal, estado }) => {
            return new ServicioContratado(id, tiempoInicio, tiempoFinal, cfCliente,cfServicio, precioTotal, estado);
        });      

        return serviciosContratadosMap
    }

    static async getById(id) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM servicioscontratados WHERE id = ?';
        const resultados = await pool.query(query, [id]);
    
        // Si no se encuentra ninguna habitación con ese ID, devolver null
        if (resultados.length === 0) {
            return "Error";
        }

        const servicioContratado = resultados[0];
        // Crear un objeto Habitacion a partir de los resultados y devolverlo
        return new ServicioContratado
        (servicioContratado.id, servicioContratado.tiempoInicio, servicioContratado.tiempoFinal, servicioContratado.cfCliente,servicioContratado.cfServicio,servicioContratado.precioTotal,servicioContratado.estado)
    }

    static async create(nuevoServicioContratado) {
        // Insertar una nueva habitación en la base de datos

        try {
            await pool.query('insert into servicioscontratados set ?',[nuevoServicioContratado])
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
            const query = 'UPDATE servicioscontratados SET tiempoInicio = ?, tiempoFinal = ?, cfCliente = ?, cfServicio = ?, precioTotal = ? WHERE id = ?';
            await pool.query(query, [this.tiempoInicio, this.tiempoFinal, this.cfCliente, this.cfServicio, this.precioTotal, this.id]);

            return('Se ha actualizado correctamente')

        } catch (error) {
            console.log(error)
            throw new Error('Error en actualizarlo')
        }

    }

    static async delete(id) {
        try {
            const query = 'DELETE FROM servicioscontratados WHERE id = ?';
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

    static async sumarPreciosPorUsuario(cfCliente) {
        try {
            let query = 'SELECT SUM(preciototal) AS total FROM servicioscontratados WHERE cfCliente = ?';
            const result = await pool.query(query, [cfCliente]);

            const suma=result[0].total
            query = 'UPDATE servicioscontratados SET precioTotal = ? WHERE cfCliente = ?';
            await pool.query(query,[suma, cfCliente]);


          } catch (error) {
            console.error(error);
          }
    }  
    
    static async validar(tiempoInicio, tiempoFinal, cfCliente, cfServicio, precioTotal) {
        var errores = []
        
        const fechaEntradaValida = moment(tiempoInicio, 'YYYY-MM-DD', true).isValid();
        const fechaSalidaValida = moment(tiempoFinal, 'YYYY-MM-DD', true).isValid();
        
        if (fechaEntradaValida && fechaSalidaValida) {
            const fechaEntrada = new Date(tiempoInicio);
            const fechaSalida = new Date(tiempoFinal);
        
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

        if (Number.isInteger(precioTotal)) {
            console.log("Precio correctamente")
        } else {
            errores.push("El precio no es un número entero");
        }

        try {
            const cliente = await Servicio.getById(cfServicio)
            if(cliente=="Error"){
                errores.push("No existe el servicio")
            }
        } catch (error) {
            errores.push("Error en buscar el servicio")
        }

        return errores
    }        

        
}