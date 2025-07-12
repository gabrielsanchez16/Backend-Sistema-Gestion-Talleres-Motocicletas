const express = require('express')
const cors = require('cors')
const {db} = require('./config/db.js')
const dotenv = require('dotenv')
dotenv.config({path: ".env"})
const initModels = require("./models/initModels")


//* Archivos de Rutas

const workshopRouter = require('./routes/workshop.route.js').router


//* Configuraciones Iniciales
const app = express()


//Habilitar lectura de datos de formularios

app.use(express.urlencoded({extended:true}))


// Conexion a la base de datos

try {
    db.authenticate();
    db.sync()
    console.log('conexion correcta a la base de datos')
}catch(error){
    console.log(error)
}


app.use(cors()) //permitiendo acceso
app.use(express.json())
app.use("/api/v1/workshop", workshopRouter);


const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})


exports.default = app