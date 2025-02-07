const API_URL = "http://localhost:3000/api/pizzas";

async function loginFuncionario() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Log para ver os dados enviados
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
