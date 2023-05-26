const pool = require('../database')
const jwt = require('jsonwebtoken')

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
                const token = await jwt.sign(
                    {
                        data: {
                            userID: admin.id,
                            rol: 'admin'
                        } //datos que queremos encriptar
                    }, 
                    process.env.secret, //palabra secreta para hacer la encriptación
                    { expiresIn: 60 * 60 } //1 hora antes de caducar
                )

                console.log("gola")

                return { success: true, admin: admin , token:token};
            }


          } catch (error) {

            return { success: false, message: 'Error logearse', status: 500 };

          }
    }   

}