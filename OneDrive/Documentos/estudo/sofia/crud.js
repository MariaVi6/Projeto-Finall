const express=require('express')
const { PrismaClient } = require('@prisma/client');
const App=express();
const PORT=3000
App.use(express.json())
const prisma = new PrismaClient();


App.get('/tabela',async(req,res)=>{
    const usuario= await prisma.tabela.findMany() //procurar
    res.json(usuario)//mostrar em json
})
App.post('/tabela',async(req,res)=>{
    const {nome,email}=req.body
    //try catch = if else do certo e errado
    try {
        const Novousuario= await prisma.tabela.create({
            data:{nome,email}
        })
        res.json(Novousuario)


    } catch (error) {
        res.status(500).json({error:"error"})
    }

   
})

App.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    
})