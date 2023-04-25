const pool = require('../database')

module.exports = class Administrador{
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

    static async login(email,contrasenya) {
        try {
            const query = 'SELECT * FROM administrador WHERE email = ? and contrasenya = ?';
            const resultados = await pool.query(query, [email,contrasenya]);

            
            const admin = resultados[0]

            if(resultados.length === 0){
                return { success: false, message: "Error en logearse", status: 500 };
            }else{
                return { success: true, admin: admin };
            }


          } catch (error) {

            return { success: false, message: 'Error logearse', status: 500 };

          }
    }   

}