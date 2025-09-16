import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwt = jsonwebtoken;
const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/usuarios', async (_req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const { email, senha, cargo } = req.body;
    const verificar = await prisma.usuario.findUnique({ where: { email } });

    if (verificar) {
      res.status(400).json({ message: "Usuário já existente" });
      return
    }

    const adicionar = await prisma.usuario.create({
      data: {
        email,
        senha: await bcrypt.hash(senha, 12),
        cargo: cargo
      }
    });

    const token = jwt.sign({ id: adicionar.id, email: adicionar.email }, "senha1234", { expiresIn: "1h" });

    res.status(201).json({ message: "Usuário adicionado com sucesso", data: { token } });
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.post('/logar', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      res.status(401).json({ message: "Email ou senha inválida" });
      return
    }

    const e_valido = await bcrypt.compare(senha, usuario.senha);

    if (!e_valido) {
      res.status(401).json({ message: "Email ou senha inválida" });
      return
    }

    res.json({ message: "Logado com sucesso", e_valido });
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { senha } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      res.status(404).json({ message: "ID não encontrado" });
      return
    }

    const alterar = await prisma.usuario.update({
      where: { id },
      data: { senha: await bcrypt.hash(senha, 12) }
    });

    res.json({ message: "Senha alterada com sucesso", alterar });
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      res.status(404).json({ message: "ID não encontrado" });
      return
    }

    const deletar = await prisma.usuario.delete({
      where: { id }
    });

    res.json({ message: "Usuário deletado com sucesso", deletar });
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.post('/usuarios/:id/notas', async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.id);
    const { valor, materia } = req.body;

    if (valor == null) {
      res.status(400).json({ message: "Valor inválido" });
      return
    }

    if (!materia) {
      res.status(400).json({ message: "Matéria é obrigatória" });
      return
    }

    const usuario = await prisma.usuario.findUnique({ where: { id: usuarioId } });

    if (!usuario) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return
    }

    const nota = await prisma.nota.create({
      data: { valor, materia, usuario: { connect: { id: usuarioId } } }
    });

    res.status(201).json({ message: "Nota criada com sucesso", nota });
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.get('/usuarios/:id/notas', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: { notas: true }
    });

    if (!usuario) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.put('/notas/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { valor, materia } = req.body;

    if (valor == null) {
      res.status(400).json({ message: "Valor inválido" });
      return
    }

    if (!materia) {
      res.status(400).json({ message: "Matéria é obrigatória" });
      return
    }

    const nota = await prisma.nota.update({
      where: { id },
      data: { valor, materia }
    });

    res.json({ message: "Nota atualizada com sucesso", nota });
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.delete('/notas/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const nota = await prisma.nota.delete({ where: { id } });

    res.json({ message: "Nota deletada com sucesso", nota });
  } catch (error) {
    res.status(500).json({ message: `Erro inesperado: ${error}` });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
