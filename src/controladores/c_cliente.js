const pool = require('../database')

module.exports = class Cliente {
    // Mapping de propiedades de la tabla piso
    constructor(id=null, nombre=null, primerApellido=null, segundoApellido=null, email=null, contrasenya=null, telefono=null) {
      this.id = id
      this.nombre = nombre
      this.primerApellido = primerApellido
      this.segundoApellido = segundoApellido
      this.email = email
      this.contrasenya = contrasenya
      this.telefono = telefono
    }
  
    //leer todos
    static async getAll() {
        const clientes = await pool.query('Select * from cliente')

        const clientesMap = clientes.map(({ id, nombre, primerApellido,segundoApellido,email,contrasenya,telefono }) => {
            return new Cliente(id, nombre, primerApellido,segundoApellido,email, contrasenya ,telefono );
        });      

        return clientesMap
    }

    static async getById(id) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM cliente WHERE id = ?';
        const resultados = await pool.query(query, [id]);
    
        // Si no se encuentra ninguna habitación con ese ID, devolver null
        if (resultados.length === 0) {
          return "Error";
        }

        const cliente = resultados[0];
        // Crear un objeto Habitacion a partir de los resultados y devolverlo
        return new Cliente
        (cliente.id, cliente.nombre, cliente.primerApellido, cliente.segundoApellido, cliente.email, cliente.contrasenya, cliente.telefono)
    }

    static async create(nuevoCliente) {

        try {
            await pool.query('insert into cliente set ?',[nuevoCliente])

            return('Se ha creado correctamente')
        } catch (error) {
            console.log(error)
            throw new Error('Error en crear el usuario')
        }
    
    }
    
    async update() {

        try {
            const query = 'UPDATE cliente SET nombre = ?, primerApellido = ?, segundoApellido = ?, email = ?, contrasenya = ?, telefono = ? WHERE id = ?';
            await pool.query(query, [this.nombre, this.primerApellido, this.segundoApellido, this.email, this.contrasenya, this.telefono, this.id]);
            return('Se ha actualizado correctamente')

        } catch (error) {
            console.log(error)
            return('Error')
        }
    }

    static async delete(id) {
        try {
            const query = 'DELETE FROM cliente WHERE id = ?';
            const result = await pool.query(query, [id]);

            if (result.affectedRows === 0) {
                return "Error";
            }

            return `Cliente con el ID ${id} eliminada correctamente`;

          } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar la habitación');
          }
    }        
        
}