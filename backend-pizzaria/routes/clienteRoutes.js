const express = require('express');
const router = express.Router();
const Cliente = require('../Models/Cliente');

// Criar um novo cliente
router.post('/', async (req, res) => {
    try {
        const { nome, endereco, telefone, bairro } = req.body;
        
        // Cria um novo cliente
        const novoCliente = new Cliente({ nome, endereco, telefone, bairro });
        await novoCliente.save();

        res.status(201).json(novoCliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao cadastrar cliente" });
    }
});

module.exports = router;
