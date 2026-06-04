import express from "express"
import { prisma } from './lib/prisma.js'

const app = express()
app.use(express.json())

// Criar agendamento
app.post('/clients', async (req, res) => {
  try { 
    await prisma.clients.create({
      data: {
        name:     req.body.name,
        phone:    req.body.phone,
        date: new Date(req.body.date), 
        hour:     req.body.hour,
        price:    req.body.price,
        service:  req.body.service
      }
    });
    res.status(201).json(req.body);
    } catch (error) {
      console.log(error)
      res.status(400).json({error: 'Erro ao criar'});
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

// Listar horario de acordo com a data
app.get('/scheduleDate', async (req, res) => {
  try {
    const hours = await prisma.clients.findMany({
      where: {
        date: req.body.date
      }
    });
    res.status(400).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro na busca dos horarios'})
  }
})

app.listen(3000);