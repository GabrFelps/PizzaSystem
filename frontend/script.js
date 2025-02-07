function mostrarTelaCadastro() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('cadastro').style.display = 'block';
}

function voltarTelaLogin() {
  document.getElementById('cadastro').style.display = 'none';
  document.getElementById('login').style.display = 'block';
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
      window.location.href = 'dashboard.html';  // Redirecionar para a tela de cadastro de pedido
  } else {
      alert(dados.error);
  }
}

async function cadastrarFuncionario() {
  const nome = document.getElementById("funcionarioNome").value;
  const email = document.getElementById("funcionarioEmail").value;
  const senha = document.getElementById("funcionarioSenha").value;

  if (!nome || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
  }

  const funcionario = { nome, email, senha };
  console.log("Enviando cadastro de funcionário:", funcionario);

  try {
      const resposta = await fetch('http://localhost:3000/api/funcionarios/cadastro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(funcionario)
      });
      const dados = await resposta.json();
      if (resposta.ok) {
          alert("Funcionário cadastrado com sucesso!");
          console.log("Resposta do cadastro de funcionário:", dados);
          voltarTelaLogin();  // Voltar para a tela de login após cadastro
      } else {
          alert(dados.error || "Erro ao cadastrar funcionário!");
      }
  } catch (error) {
      alert("Erro ao cadastrar funcionário!");
      console.error("Erro no cadastro de funcionário:", error);
  }
}

async function cadastrarCliente() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const bairro = document.getElementById("bairro").value;

  if (!nome || !endereco || !telefone || !bairro) {
      alert("Preencha todos os campos!");
      return;
  }

  const cliente = { nome, endereco, telefone, bairro };
  console.log("Enviando cadastro de cliente:", cliente);

  try {
      const resposta = await fetch('http://localhost:3000/api/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cliente)
      });
      const dados = await resposta.json();
      if (resposta.ok) {
          alert(`Cliente ${dados.nome} cadastrado com sucesso!`);
          console.log("Resposta do cadastro de cliente:", dados);
      } else {
          alert(dados.message || "Erro ao cadastrar cliente!");
      }
  } catch (error) {
      alert("Erro ao cadastrar cliente!");
      console.error("Erro no cadastro de cliente:", error);
  }
}

function selecionarSabor(sabor) {
  localStorage.setItem('sabor', sabor);
}

function selecionarTamanho(tamanho) {
  localStorage.setItem('tamanho', tamanho);
}

async function cadastrarPizza() {
  const sabor = localStorage.getItem("sabor");
  const tamanho = localStorage.getItem("tamanho");

  if (!sabor || !tamanho) {
       alert("Selecione um sabor e um tamanho!");
       return;
  }

  const preco = tamanho === "media" ? 35.0 : 50.0;
  const pizza = { nome: sabor, preco, tamanho };
  console.log("Enviando cadastro de pizza:", pizza); // Adicionado para log

  try {
       const dados = await enviarPedido(pizza);
       alert("Pizza cadastrada com sucesso!");
       console.log("Resposta do cadastro de pizza:", dados); // Adicionado para log
       atualizarTabela(dados);
  } catch (error) {
       alert("Erro ao cadastrar pizza!");
       console.error("Erro no cadastro de pizza:", error); // Adicionado para log
  }
}

function atualizarTabela(pizza) {
  const tabela = document.getElementById("tabela-vendas");
  const novaLinha = tabela.insertRow();

  novaLinha.innerHTML = `
      <td>1</td>
      <td>${pizza.nome}</td>
      <td>${pizza.tamanho === "media" ? "Média" : "Grande"}</td>
      <td>R$ ${pizza.preco.toFixed(2)}</td>
  `;
}
