const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    pizza: { type: String, required: true },
    quantidade: { type: Number, required: true },
    valor: { type: Number, required: true },
    tamanho: { type: String, required: true }
});

const PedidoSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    funcionario: { type: mongoose.Schema.Types.ObjectId, ref: 'Funcionario', required: true },
    itens: { type: [ItemSchema], required: true },
    data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
