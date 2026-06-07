import express from "express";
import cors from 'cors';
import { prisma } from './lib/prisma.js';

const app = express();


app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.use(express.json());

// Criar agendamento
app.post('/clients', async (req, res) => {  // {name: string, phone: string, date: string, hour: string, price: float, service: string}
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

    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
}); 

// Listar horario de acordo com a data
app.get('/scheduleAt', async (req, res) => {  // {"date": "2026-06-03"}
  try {
    const hours = await prisma.clients.findMany({
      where: {
        date: new Date(req.body.date)
      }
    });
    res.status(200).json(hours.map(item => item.hour));
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Erro na busca dos horarios'})
  }
});

// Editar Agendamento
app.put('/clients/:id', async (req, res) => {
  try{
    await prisma.clients.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        name:     req.body.name,
        phone:    req.body.phone,
        date: new Date(req.body.date), 
        hour:     req.body.hour,
        price:    req.body.price,
        service:  req.body.service
      }
    });
    res.status(200).json(req.body)
  } catch (error) {
    console.log(error)
    res.status(400).json({error: 'ID não encontrado'})
  }
});

// Deletar Agendamento por telefone
app.delete('/clients/:id', async (req, res) => {
  try{
    await prisma.clients.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json({Successfully: 'Agendamento deletado'})
  } catch (error) {
    console.log(error)
    res.status(400).json({error: 'ID não encontrado'})
  }
});

app.listen(3000);