const API_URL_PEDIDO = "http://localhost:3000/api/pedidos";

async function enviarPedido(pizza) {
    const token = localStorage.getItem('token');
    const response = await fetch(API_URL_PEDIDO, {
         method: "POST",
         headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
         },
         body: JSON.stringify(pizza)
    });
    if (!response.ok) {
         throw new Error("Erro ao cadastrar pizza.");
    }
    return await response.json();
}

// Nova função para enviar o pedido completo
async function enviarPedidoPedido(pedido) {
    const token = localStorage.getItem("token");

    try {
        const resposta = await fetch(API_URL_PEDIDO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(pedido)
        });

        if (!resposta.ok) {
            throw new Error('Erro ao cadastrar pedido');
        }

        return await resposta.json();
    } catch (error) {
        console.error('Erro ao enviar pedido:', error);
        throw error;
    }
}

async function loginFuncionario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    console.log('Enviando dados de login:', { email, senha });
    const resposta = await fetch('http://localhost:3000/api/funcionarios/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, senha })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
         localStorage.setItem('token', dados.token);
         alert('Login bem-sucedido!');
    } else {
         alert(dados.error);
    }
}
