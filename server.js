const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const productosRouter = require('./routes/productos')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/productos",productosRouter)
app.use(express.static("public"))

const server = app.listen(PORT, ()=>{
  console.log(`escuchando ${PORT}`);
})

app.get("/",(req,res)=>{
  res.send("Pagina Principal")
})

server.on("error",(err)=>{
  console.log(`Error: ${err}`);
})