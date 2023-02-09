const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors());
server.use(express.json());

const TaskRoutes = require('./routes/TaskRoutes');

server.use('/task', TaskRoutes);


server.listen(3001, () => {
    console.log("Api online"); 
})


/* server.get('/test' , (req, res) => {
    res.send("status:true")
    //res.json(usuario)
}) */




/* const usuario = [
    {nome: "Matheus", idade: 18},
    {nome: "Jorge", idade: 44},
    {nome: "Julia", idade: 24}
] */