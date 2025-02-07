// backend/routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const Pedido = require('../Models/Pedido');
const authMiddleware = require('../middleware/authMiddleware');

// Rota para criar um novo pedido (protegida)
router.post('/', authMiddleware, async (req, res) => {
  try {
      const { cliente, itens } = req.body;

      if (!req.funcionario || !req.funcionario.id) {
          return res.status(401).json({ error: "Funcionário não autenticado" });
      }

      const novoPedido = new Pedido({
          cliente,
          itens,
          funcionario: req.funcionario.id // Pegando ID do funcionário autenticado
      });

      await novoPedido.save();
      res.status(201).json(novoPedido);
  } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
      res.status(500).json({ error: "Erro ao cadastrar pedido" });
  }
});

// (Opcional) Rota para listar pedidos
router.get('/', authMiddleware, async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('cliente')
            .populate('funcionario');
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pedidos" });
    }
});

module.exports = router;
