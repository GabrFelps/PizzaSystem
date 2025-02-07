const mongoose = require('mongoose');

// Carregando as variáveis de ambiente
require('dotenv').config();

const connectDB = async () => {
    try {
        // Conectando ao MongoDB usando a URI do Atlas a partir do .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado ao Atlas!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        process.exit(1);  // Finaliza o processo em caso de erro
    }
};

module.exports = connectDB;
