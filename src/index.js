
const express = require('express')

//En la api final no servira por que esto sirve para mandar mensajes por html
const MySQLStore = require('express-mysql-session')

const bodyParser = require('body-parser')

// inicializaciones 
const app = express()
const pool = require('./database')
const r_habitacion = require('./routes/r_habitacion')
const r_piso = require('./routes/r_piso')
const r_cliente = require('./routes/r_cliente')
const r_favorito = require('./routes/r_favorito')
const r_reserva = require('./routes/r_reserva')
const r_servicio = require('./routes/r_servicio')
const r_servicioContratados = require('./routes/r_servicioContratados')

//El significado de esto codigo es:
//Voy a definir un puerto, si ahi algun puerto libre coge ese puerto sino coge e 40000
app.set('port',process.env.PORT || 4000)

//Middelwers 
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Rutas
app.use('/habitacion', r_habitacion)
app.use('/piso', r_piso)
app.use('/cliente', r_cliente)
app.use('/favorito', r_favorito)
app.use('/reserva', r_reserva)
app.use('/servicio', r_servicio)
app.use('/servicioContratado', r_servicioContratados)

//Empezar servidor
app.get('/',(req, res)=>{
    res.send("Estas en la raiz")
})

app.listen(app.get('port'),()=>{
    console.log("Server on port " + app.get('port'))
})








