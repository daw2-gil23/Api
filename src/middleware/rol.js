const rol = (arrayRoles)=>{
    console.log('arrayroles: ',arrayRoles);
    return (
        (req,res,next)=>{
            console.log('roles de req.query.roles: ', req.query.roles)
            //controlamos que el usuario tenga los roles apropiados 
            //según nuestro endpoint
            var permiso = false
            //recorremos roles de usuario
            if(arrayRoles == req.query.roles){
                console.log('tiene permisos')
                permiso = true
            }
            //si ha encontrado un rol con permiso pasa a c_usuarios
            if(permiso){
                next()
            }
            else{
                res.status(400).json({
                    mensaje: 'No tienes el rol necesario'
                })
            }
            
            
        }
    )
}

module.exports = rol