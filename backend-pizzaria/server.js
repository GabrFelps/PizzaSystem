const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const pizzaRoutes = require('./routes/pizzaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/pizzas', pizzaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/funcionarios', funcionarioRoutes);

app.get('/', (req, res) => {
    res.send('API da Pizzaria está rodando...');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
