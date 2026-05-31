import express from "express"
import { prisma } from './lib/prisma.js'

const app = express()
app.use(express.json())

// Criar agendamento
app.post('/clients', async (req, res) => {
  try { 
    await prisma.clients.create({
      data: {
        name:    req.body.name,
        phone:   req.body.phone,
        date:    req.body.date, 
        hour:    req.body.hour,
        price:   req.body.price,
        service: req.body.service
      }
    });
    res.status(201).json(req.body);
    } catch (error) {
      res.status(500).json({error: 'Erro ao criar'});
    }
  })

// Listar agendamentos
app.get('/clients', async (req, res) => {
  try {
    const clients = await prisma.clients.findMany();
    console.log(clients);

    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
}); 

app.listen(3000);