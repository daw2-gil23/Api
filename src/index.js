
const express = require('express')

//morgan sirve para ver las peticiones que estan llegando
const morgan = require('morgan')

//En la api final no servira por que esto sirve para mandar mensajes por html
const MySQLStore = require('express-mysql-session')
const {database} = require('./keys')

// inicializaciones 
const app = express()
const pool = require('./database')
const r_habitacion = require('./routes/habitaciones')

//El significado de esto codigo es:
//Voy a definir un puerto, si ahi algun puerto libre coge ese puerto sino coge e 40000
app.set('port',process.env.PORT || 4000)

//Middelwers 
app.use('/habitaciones', r_habitacion)

//Empezar servidor
app.get('/',(req, res)=>{
    res.send("Estas en la raiz")
})

app.listen(app.get('port'),()=>{
    console.log("Server on port " + app.get('port'))
})
