// Variável global para armazenar os itens do pedido atual
let currentOrder = [];

// Funções de tela de login e cadastro de funcionário/cliente (não modificadas)
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
      window.location.href = 'dashboard.html';
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
          voltarTelaLogin();
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
          // Armazena o ID do cliente para associar ao pedido
          localStorage.setItem('clienteId', dados._id);
      } else {
          alert(dados.message || "Erro ao cadastrar cliente!");
      }
  } catch (error) {
      alert("Erro ao cadastrar cliente!");
      console.error("Erro no cadastro de cliente:", error);
  }
}

// Funções para seleção de pizza (toggle)
function selecionarSabor(botao, sabor) {
  document.querySelectorAll('#sabores .pizza-button').forEach(btn => btn.classList.remove('active'));
  botao.classList.add('active');
  localStorage.setItem('sabor', sabor);
}

function selecionarTamanho(botao, tamanho) {
  document.querySelectorAll('#tamanhos .pizza-button').forEach(btn => btn.classList.remove('active'));
  botao.classList.add('active');
  localStorage.setItem('tamanho', tamanho);
}

// Função para adicionar uma pizza (item) ao pedido atual
function adicionarPizza() {
  const sabor = localStorage.getItem("sabor");
  const tamanho = localStorage.getItem("tamanho");
  const quantidade = parseInt(document.getElementById("quantidade").value) || 1;
  
  if (!sabor || !tamanho) {
      alert("Selecione um sabor e um tamanho!");
      return;
  }
  
  const precoUnitario = tamanho === "media" ? 35.0 : 50.0;
  const valor = precoUnitario * quantidade;
  
  const item = { pizza: sabor, quantidade, valor, tamanho };
  currentOrder.push(item);
  
  atualizarTabelaItens();
  resetPizzaForm();
}

// Atualiza a tabela de itens do pedido atual
function atualizarTabelaItens() {
  const tabela = document.getElementById("tabela-itens");
  tabela.innerHTML = "";
  
  currentOrder.forEach(item => {
    const row = tabela.insertRow();
    row.innerHTML = `
      <td>${item.quantidade}</td>
      <td>${item.pizza}</td>
      <td>${item.tamanho === "media" ? "Média" : "Grande"}</td>
      <td>R$ ${item.valor.toFixed(2)}</td>
    `;
  });
}

// Finaliza o pedido e envia todos os itens para o back-end
async function finalizarPedido() {
  const clienteId = localStorage.getItem("clienteId");
  if (!clienteId) {
      alert("É necessário cadastrar o cliente antes de finalizar o pedido!");
      return;
  }
  
  if (currentOrder.length === 0) {
      alert("Adicione pelo menos uma pizza ao pedido!");
      return;
  }
  
  const pedido = { 
      cliente: clienteId, 
      itens: currentOrder
  };
  console.log("Enviando cadastro de pedido:", pedido);
  
  try {
       const dados = await enviarPedidoPedido(pedido);
       alert("Pedido cadastrado com sucesso!");
       console.log("Resposta do cadastro de pedido:", dados);
       atualizarTabelaPedidos(dados);
       resetPedidoForm();
  } catch (error) {
       alert("Erro ao cadastrar pedido!");
       console.error("Erro no cadastro de pedido:", error);
  }
}

// Atualiza a tabela de pedidos realizados (exemplo simples)
function atualizarTabelaPedidos(pedido) {
  const tabela = document.getElementById("tabela-vendas");
  const row = tabela.insertRow();
  row.innerHTML = `
      <td>${pedido.cliente}</td>
      <td>${pedido.funcionario}</td>
      <td>${pedido.itens.map(item => `${item.quantidade}x ${item.pizza} (${item.tamanho})`).join(", ")}</td>
      <td>${new Date(pedido.data).toLocaleString()}</td>
  `;
}

// Cancela o pedido atual, limpando os dados do formulário e o array temporário
function cancelarPedido() {
  if (confirm("Deseja cancelar o pedido atual?")) {
      resetPedidoForm();
  }
}

// Reinicia o formulário de pedido e os dados temporários
function resetPedidoForm() {
  currentOrder = [];
  atualizarTabelaItens();
  resetPizzaForm();
}

// Limpa apenas os dados do formulário de pizza
function resetPizzaForm() {
  document.querySelectorAll('#sabores .pizza-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('#tamanhos .pizza-button').forEach(btn => btn.classList.remove('active'));
  localStorage.removeItem('sabor');
  localStorage.removeItem('tamanho');
  document.getElementById("quantidade").value = 1;
}
