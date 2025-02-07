function selecionarSabor(sabor) {
  localStorage.setItem('sabor', sabor);
}

function selecionarTamanho(tamanho) {
  localStorage.setItem('tamanho', tamanho);
}

function cadastrarCliente() {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const telefone = document.getElementById("telefone").value;
  const bairro = document.getElementById("bairro").value;

  if (!nome || !endereco || !telefone || !bairro) {
      alert("Preencha todos os campos!");
      return;
  }

  alert(`Cliente ${nome} cadastrado!`);
}

async function cadastrarPizza() {
  const sabor = localStorage.getItem("sabor");
  const tamanho = localStorage.getItem("tamanho");

  if (!sabor || !tamanho) {
      alert("Selecione um sabor e um tamanho!");
      return;
  }

  const preco = tamanho === "media" ? 35.0 : 50.0;

  const pizza = { nome: sabor, preco };

  try {
      const dados = await enviarPedido(pizza);
      alert("Pizza cadastrada com sucesso!");
      atualizarTabela(dados);
  } catch (error) {
      alert("Erro ao cadastrar pizza!");
  }
}


function atualizarTabela(pizza) {
  const tabela = document.getElementById("tabela-vendas");
  const novaLinha = tabela.insertRow();

  novaLinha.innerHTML = `
      <td>1</td>
      <td>${pizza.nome}</td>
      <td>${pizza.preco === 35.0 ? "Média" : "Grande"}</td>
      <td>R$ ${pizza.preco.toFixed(2)}</td>
  `;
}
