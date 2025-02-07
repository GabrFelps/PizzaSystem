const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Funcionario = require('../Models/Funcionario');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Cadastro de funcionário
router.post('/cadastro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const funcionarioExistente = await Funcionario.findOne({ email });

        if (funcionarioExistente) {
            return res.status(400).json({ error: 'Funcionário já cadastrado!' });
        }

        const novoFuncionario = new Funcionario({ nome, email, senha });
        await novoFuncionario.save();

        res.status(201).json({ mensagem: 'Funcionário cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro no cadastro!' });
    }
});

// Login de funcionário
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        console.log('Recebendo dados de login:', { email, senha });

        const funcionario = await Funcionario.findOne({ email });

        if (!funcionario) {
            console.log('Funcionário não encontrado');
            return res.status(400).json({ error: 'Funcionário não encontrado!' });
        }

        const senhaValida = await bcrypt.compare(senha, funcionario.senha);
        if (!senhaValida) {
            return res.status(400).json({ error: 'Senha incorreta!' });
        }

        const token = jwt.sign({ id: funcionario._id, nome: funcionario.nome }, 'secreto', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no login!' });
    }
});

// Rota protegida (apenas logados)
router.get('/perfil', authMiddleware, (req, res) => {
    res.json({ funcionario: req.funcionario });
});

module.exports = router;
