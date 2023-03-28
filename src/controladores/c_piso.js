const pool = require('../database')

module.exports = class Piso {
    // Mapping de propiedades de la tabla piso
    constructor(id=null, cocina=null, salon=null, terraza=null, wifi=null, aseos=null, sexo=null) {
      this.id = id
      this.cocina = cocina
      this.salon = salon
      this.terraza = terraza
      this.wifi = wifi
      this.aseos = aseos
      this.sexo = sexo
    }
  
    //leer todos
    static async getAll() {
        const pisos = await pool.query('Select * from piso')

        const pisosMap = pisos.map(({ id, cocina, salon,terraza,wifi,aseos,sexo }) => {
            return new Piso(id, cocina, salon,terraza,wifi, aseos ,sexo );
        });      

        return pisosMap
    }

    static async getById(id) {
        // Consultar a la base de datos para obtener la habitación con el ID especificado
        const query = 'SELECT * FROM piso WHERE id = ?';
        const resultados = await pool.query(query, [id]);
    
        // Si no se encuentra ninguna habitación con ese ID, devolver null
        if (resultados.length === 0) {
          return "Error";
        }

        const piso = resultados[0];
        // Crear un objeto Habitacion a partir de los resultados y devolverlo
        return new Piso
        (piso.id, piso.cocina, piso.salon, piso.terraza, piso.wifi, piso.aseos, piso.sexo)
    }

    static async create(nuevoPiso) {

        try {
            await pool.query('insert into piso set ?',[nuevoPiso])

            return('Se ha creado correctamente')
        } catch (error) {
            console.log(error)
            throw new Error('Error en crear el piso')
        }
    
    }
    
    async update() {

        try {
            // Actualizar la habitación en la base de datos
            const query = 'UPDATE piso SET cocina = ?, salon = ?, terraza = ?, wifi = ?, aseos = ?, sexo = ? WHERE id = ?';
            await pool.query(query, [this.cocina, this.salon, this.terraza, this.wifi, this.aseos, this.sexo, this.id]);
            return('Se ha actualizado correctamente')

        } catch (error) {
            console.log(error)
            return('Error')
        }
    }

    static async delete(id) {
        try {
            const query = 'DELETE FROM piso WHERE id = ?';
            const result = await pool.query(query, [id]);

            if (result.affectedRows === 0) {
                return "Error";
            }

            return `Habitación con el ID ${id} eliminada correctamente`;

          } catch (error) {
            console.error(error);
            throw new Error('Error al eliminar la habitación');
          }
    }        
        
}