import express from "express"
import { prisma } from './lib/prisma.js'

const app = express()
app.use(express.json())

app.get('/clients', async (req, res) => {
  try {
    const clients = await prisma.clients.findMany();
    console.log(clients);

    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}); 

app.listen(3000)