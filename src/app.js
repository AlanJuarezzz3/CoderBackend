import express from "express"
import {Server as Socket} from "socket.io"
import ContenedorSQL from "../contenedor/contenedorSQL"
import sqliteOptions from "./dbs/knew"

const app = express()
const server = app.listen(808, () => console.log("escuchando en el 8080"))
const io = new Socket(server)

const productSQL = new ContenedorSQL(sqliteOptions, "products")
const messagesSQL = new ContenedorSQL(sqliteOptions, "messages")

io.on("connection", async socket => {
    console.log("usuario conectado");

socket.emit("products", await productSQL.listarTodo())

socket.on("update", async producto => {
    await productSQL.save(producto)
    io.sockets.emit("products", await productSQL.listarTodo())
})

socket.on("nuevoMensaje", async mensaje => {
    mensaje.fechayhora = new Date().toLocaleDateString()
    await messagesSQL.save(mensaje)
    io.sockets.emit("mensajes", await messagesSQL.listarTodo())
    })
})
app.use(express.json())
app.use(express.static("public"))