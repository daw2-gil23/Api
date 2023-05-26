const jwt = require('jsonwebtoken')
const Cliente = require('../controladores/c_cliente');

const auth = async (req, res, next)=>{
    //capturamos el token que envian en la cabecera
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        //desencriptamos el token
        try {
            const tokenVerificado = jwt.verify(token, process.env.secret)

            //buscamos en base de datos el usario con el id
            const usuarioEncontrado = await Cliente.getById(tokenVerificado.data.userID)
            
            req.query.userID = tokenVerificado.data.userID
            req.query.roles = tokenVerificado.data.roles
            //Pasamos al siguiente middleware (en este caso el controlador c_mascotas)
            next()

        } catch (error) {
            res.status(500).json({
                error: error,
                mensaje: 'El token no es valido'
            })
        }
    }else{
        res.status(400).json({
            mensaje: 'No tienes permisos'
        })
    }    
}

module.exports = auth