const pool = require('../database')
const bcrypt = require('bcrypt');

module.exports = class Cliente {
    // Mapping de propiedades de la tabla piso
    constructor(id=null, nombre=null, primerApellido=null, segundoApellido=null, email=null, contrasenya=null, telefono=null,avatar=1) {
      this.id = id
      this.nombre = nombre
      this.primerApellido = primerApellido
      this.segundoApellido = segundoApellido
      this.email = email
      this.contrasenya = contrasenya
      this.telefono = telefono
      this.avatar = avatar 
    }
  
    //leer todos
    static async getAll() {
        const clientes = await pool.query('Select * from cliente')

        const clientesMap = clientes.map(({ id, nombre, primerApellido,segundoApellido,email,contrasenya,telefono,avatar }) => {
            return new Cliente(id, nombre, primerApellido,segundoApellido,email, contrasenya ,telefono,avatar );
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
        (cliente.id, cliente.nombre, cliente.primerApellido, cliente.segundoApellido, cliente.email, cliente.contrasenya, cliente.telefono,cliente.avatar)
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
            const query = 'UPDATE cliente SET nombre = ?, primerApellido = ?, segundoApellido = ?, email = ?, contrasenya = ?, telefono = ?, avatar = ? WHERE id = ?';
            await pool.query(query, [this.nombre, this.primerApellido, this.segundoApellido, this.email, this.contrasenya, this.telefono, this.avatar, this.id]);
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
            throw new Error('Error al eliminar el cliente');
          }
    } 
    
    static async login(email,contrasenya) {
        try {
        
            const query = 'SELECT * FROM cliente WHERE email = ?';
            const resultados = await pool.query(query, [email]);

            const cliente = resultados[0];

            console.log(cliente)

            if(resultados.length === 0){
                return { success: false, message: "El email es incorrecto", status: 500 };
            }else{
                // Si hay resultados, comprobar si la contraseña es correcta
                const storedPassword = cliente.contrasenya;
                const passwordsMatch = bcrypt.compareSync(contrasenya, storedPassword);
                if (passwordsMatch) {
                    return { success: true, cliente: cliente };
                } else {
                    console.log('La contraseña es incorrecta');
                    return { success: false, message: "La contrasenya es incorrecta", status: 500 };
                }

            }


          } catch (error) {

            return { success: false, message: 'Error logearse', status: 500 };

          }
    }   

    static async revisarCorreo(email) {
        
        const query = 'SELECT * FROM cliente WHERE email = ? '
        const resultados = await pool.query(query, [email]);

        if(resultados.length === 0){
            return false
        }else{
            return true
        }

    }   

    
    static async validar(nombre, primerApellido, segundoApellido, email, password,telefono,avatar) {
        var regex = /^[a-zA-Z0-9]+$/;

        var errores = []
        
        if (!nombre || nombre.length < 2 || nombre.length > 20 || !(regex.test(nombre))) {
            errores.push("El nombre es inválido")
        }

        if (!primerApellido || primerApellido.length < 2 || primerApellido.length > 20 || !(regex.test(primerApellido))) {
            errores.push("El primer apellido es inválido")
        }

        if (!segundoApellido || segundoApellido.length < 2 || segundoApellido.length > 20 || !(regex.test(segundoApellido))) {
            errores.push("El segundo apellido es inválido")
        }

        regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || email.length > 50 || !(regex.test(email))) {
            errores.push("El email es inválido")
        }

        try {
            const emailExistente = await Cliente.revisarCorreo(email)
            if(emailExistente===true){
                errores.push("El email ya existe")
            }
        } catch (error) {
            errores.push("Error en comparar email")
        }

        regex = /^[0-9]+$/;

        if (!telefono || telefono.length < 8 || telefono.length > 11 || !(regex.test(telefono))) {
            errores.push("El telefono es inválido")
        }

        if (!avatar || avatar < 0 || avatar > 10 || !(regex.test(avatar))) {
            errores.push("El avatar es inválido")
        }

        regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,}$/;

        if (!password || password > 200 ||  !(regex.test(password))) {
            errores.push("La contraseña es inválida")
        }

        return errores

    }   
        
}