//guardaremos los datos que utilizaremos 
// module.exports={
//     database:{
//         host:'localhost',
//         user:'root',
//         password: 'root',
//         database: 'bdpensiontejada'
//     }
// }

module.exports={
    database:{
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
        port: process.env.portB 
    }
}
