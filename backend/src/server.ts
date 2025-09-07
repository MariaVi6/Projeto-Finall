import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";


const jwt = jsonwebtoken;
const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/usuarios', async (_req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios)
});

app.get('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {

        const usuarios = await prisma.usuario.findUnique({
            where: { id }
        })
        if (!usuarios) {
            res.status(500).json({ message: "id nao encontrado" })
        }
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ message: `erro inesperado ${error}` })
    }

});

app.post('/usuarios', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const verificar = await prisma.usuario.findUnique({
            where: { email }
        });
        if (verificar) {
            res.status(404).json({ message: "usuario ja existente", status: res.statusCode });
            return
        }
        const adicionar = await prisma.usuario.create({
            data: { email, senha: await bcrypt.hash(senha, 12) }
        })
        const token = jwt.sign(adicionar, "senha1234", { expiresIn: "1h" })
        res.status(201).json({ message: "usuario adicionado com sucesso", status: res.statusCode, data: { token } })
    } catch (error) {
        res.status(500).json({ mensagem: `erro inesperado ${error}` })
    }
})

app.post('/logar', async (req, res) => {
    const { email, senha } = req.body
    try {
        const usuario = await prisma.usuario.findUnique({

            where: { email }

        })
        if (!usuario) {
            res.status(401).json({ message: "email ou senha invalida " })
            return
        }
        const e_valido = await bcrypt.compare(senha, usuario.senha)
        if (e_valido == false) {
            res.status(401).json({ message: "email ou senha invalida " })
            return
        }
        res.json({ message: "logado com sucesso", e_valido })
    } catch (error) {
        res.status(500).json({ message: `erro inesperado ${error}` })
    }
})
app.put('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const { senha } = req.body
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        })
        if (!usuario) {
            res.status(404).json({ message: "id nao encontrado" })
            return
        }
        const alterar = await prisma.usuario.update({
            where: { id },
            data: { senha: await bcrypt.hash(senha, 12) }
        })
        res.json(alterar)
    } catch (error) {
        res.status(500).json({ message: `erro inesperado ${error}` })
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id }
        })
        if (!usuario) {
            res.status(401).json({ message: "id nao encontrado" })
            return
        }
        const deletar = await prisma.usuario.delete({
            where: { id }
        })
        res.json({ message: "usuario deletado com sucesso", deletar })
    } catch (error) {

    }

})


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})