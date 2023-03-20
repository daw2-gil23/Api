
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

//El significado de esto codigo es:
//Voy a definir un puerto, si ahi algun puerto libre coge ese puerto sino coge e 40000
app.set('port',process.env.PORT || 4000)

//Middelwers 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/habitacion', r_habitacion)
app.use('/piso', r_piso)
app.use('/cliente', r_cliente)


//Empezar servidor
app.get('/',(req, res)=>{
    res.send("Estas en la raiz")
})

app.listen(app.get('port'),()=>{
    console.log("Server on port " + app.get('port'))
})








