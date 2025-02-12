const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    endereco: { type: String, required: true },
    telefone: { type: String, required: true },
    bairro: { type: String, required: true }
});

module.exports = mongoose.model('Cliente', ClienteSchema);
