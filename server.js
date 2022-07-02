// Crea servidor con Express, incle incluye importación e integración del paquete body-parser.
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const res = require('express/lib/response')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Importa las funciones “newCurso”, "getCurso", "editCurso" y "deleteCurso" del archivo “consultas.js”.
const { newCurso, getCurso, editCurso, deleteCurso } = require('./consultas')

//Disponibiliza puerto
const port = 3000
app.listen(port)
console.log(`Servidor en puerto ${port}`)

//Disponibiliza ruta raiz que devuelve el archivo "index.html"
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//Disponibiliza ruta POST "/curso" que ejecuta las funciones async indicadas
//"newCurso()"
app.post("/curso", async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const response = await newCurso(nombre, nivelTecnico, fechaInicio, duracion)
    res.send(response)
})

//"newCurso()"
app.get("/cursos", async (req, res) => {
    const response = await getCurso()
    res.send(response)
})

//"editCurso()"
app.put("/curso", async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body
    const response = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion)
    res.send(response)
})

//"deleteCurso()"
app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params
    const response = await deleteCurso(id)
    console.log("response", response)
    res.send(response)
})




//Inicializar con
//npm init -y

//Instalaciones requeridas
//npm i --save pg
//npm i --save express 
//npm i --save body-parser