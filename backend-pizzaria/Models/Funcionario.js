const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const FuncionarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

// Hash da senha antes de salvar no banco
FuncionarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);
