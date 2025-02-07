const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    tamanho: { type: String, required: true }
});

module.exports = mongoose.model('Pizza', PizzaSchema);
