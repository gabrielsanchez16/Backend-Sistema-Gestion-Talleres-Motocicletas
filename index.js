const express = require('express')
const cors = require('cors')
const {db} = require('./config/db.js')
const dotenv = require('dotenv')
dotenv.config({path: ".env"})
const initModels = require("./models/initModels")
initModels() // Inicializar las asociaciones de los modelos
const { WorkOrder} = require('./models/WorkOrder.js')

//* Archivos de Rutas

const workshopRouter = require('./routes/workshop.route.js').router
const ownerRouter = require('./routes/owner.route.js').router
const brandRouter = require('./routes/brand.route.js').router
const motorcycleRouter = require('./routes/motorcycle.route.js').router
const typeRouter = require('./routes/type.route.js').router
const serviceRouter = require('./routes/service.route.js').router
const mechanicRouter = require('./routes/mechanic.route.js').router
const workOrderRouter = require('./routes/workOrder.route.js').router
const serviceByWorkshopRouter = require('./routes/serviceByWorkshop.route.js').router
const photoRouter = require('./routes/photo.route.js').router

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
app.use("/api/v1/owner", ownerRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/motorcycle", motorcycleRouter);
app.use("/api/v1/type", typeRouter);
app.use("/api/v1/mechanic", mechanicRouter);
app.use("/api/v1/workOrder", workOrderRouter);
app.use("/api/v1/serviceByWorkshop", serviceByWorkshopRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/photo", photoRouter);

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})


exports.default = app