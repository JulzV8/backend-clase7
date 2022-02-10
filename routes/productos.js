const express = require("express");
const {Router} = express;
const router = Router();

class Producto{
  constructor(id,nombre,stock,precio){
    this.id=id;
    this.nombre=nombre;
    this.stock=stock;
    this.precio=precio;
  }
}

arrayProductos = [ 
  new Producto(1,"hotwheels",20,250),
  new Producto(2,"max-steel",5,900),
  new Producto(3,"woody",10,1275)
]

router.get("/",(req,res)=>{
  const {nombre} = req.query
  if (nombre) {
    res.send(arrayProductos.find(m=> m.nombre == nombre))
  }else{
    res.send(arrayProductos)
  }
})

router.get("/:id",(req,res)=>{
  const {id} = req.params
  const producto = arrayProductos.find(m=> m.id == id)
  if (!producto) {
    res.status(404).send({
      error:"Producto no encontrado"
    })
    return
  }
  res.send(producto)
})


router.get("/productoRandom",(req,res)=>{
  const numRandom = Math.floor(Math.random() * arrayProductos.length);
  res.send(arrayProductos[numRandom])
})

router.put("/:id",(req,res)=>{
  const {id} = req.params
  const producto = arrayProductos.find(m=> m.id == id)
  if (!producto) {
    res.status(404).send({
      error:"Producto no encontrado"
    })
    return
  }
  const {nombre,stock,precio} = req.body
  if (nombre) {
    producto.nombre = nombre
  }
  if (stock) {
    producto.stock = stock
  }
  if (precio) {
    producto.precio = precio
  }
  res.sendStatus(200)
})

router.delete("/:id",(req,res)=>{
  const {id} = req.params
  const producto = arrayProductos.find(m=> m.id == id)
  if (!producto) {
    res.status(404).send({
      error:"Producto no encontrado"
    })
    return
  }
  const index = arrayProductos.indexOf(producto)
  arrayProductos.splice(index,1)
  res.sendStatus(200)
})

router.post("/",(req,res)=>{
  const {nombre,stock,precio} = req.body
  let biggestId = 0;
  if (arrayProductos) {
    arrayProductos.forEach(element => {
      if (element.id>biggestId) {
        biggestId = element.id;
      }
    });
  }
  biggestId++
  const producto = new Producto(biggestId,nombre,stock,precio)
  arrayProductos.push(producto)
  // res.sendStatus(201)
  res.send(arrayProductos.find(m=> m.id == biggestId))
})

module.exports = router;