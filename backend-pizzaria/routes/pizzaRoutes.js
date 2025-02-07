const express = require('express');
const router = express.Router();
const Pizza = require('../Models/Pizza');

// Criar nova pizza
router.post('/', async (req, res) => {
    try {
        const { nome, preco, tamanho } = req.body;
        const novaPizza = new Pizza({ nome, preco, tamanho });
        await novaPizza.save();
        res.status(201).json(novaPizza);
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar pizza" });
    }
});

// Listar todas as pizzas
router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pizzas" });
    }
});

module.exports = router;
