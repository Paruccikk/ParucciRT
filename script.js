document.getElementById('form-conta').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  var nomeInput = document.getElementById('nome-input');
  var boletoInput = document.getElementById('boleto-input');
  var valorInput = document.getElementById('valor-input');
  var dataInput = document.getElementById('data-vencimento-input');
  var nomeBoleto = nomeInput.value.trim();
  var boletoNumber = boletoInput.value.trim();
  var valorNumber = valorInput.value.trim();
  var dataVencimento = new Date(dataInput.value); // Converte a data de vencimento para um objeto Date

  if (nomeBoleto !== '' && boletoNumber !== '') {
      adicionarBoleto(nomeBoleto, boletoNumber, valorNumber, dataVencimento);

      nomeInput.value = '';
      boletoInput.value = '';
      valorInput.value = '';
      dataInput.value = '';
  }
});

// Função para adicionar um boleto à lista
function adicionarBoleto(nomeBoleto, boletoNumber, valorNumber, dataVencimento) {
  var hoje = new Date(); // Data atual
  var diff = Math.ceil((dataVencimento - hoje) / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias

  var contaElement = document.createElement('div');
  contaElement.className = 'conta';

  var categoria = '';
  if (diff <= 0) { // Vencido
      contaElement.classList.add('vermelho');
      categoria = 'vencidas';
      document.getElementById('contas-vencidas').appendChild(contaElement);
  } else if (diff <= 5) { // Faltam menos de 5 dias para o vencimento
      contaElement.classList.add('amarelo');
      categoria = 'prestes-a-vencer';
      document.getElementById('contas-prestes-a-vencer').appendChild(contaElement);
  } else if (diff <= 10) { // Faltam menos de 10 dias para o vencimento
      contaElement.classList.add('azul');
      categoria = 'no-prazo';
      document.getElementById('contas-no-prazo').appendChild(contaElement);
  } else { // Não vencido e nem perto de vencer
      contaElement.classList.add('azul');
      categoria = 'no-prazo';
      document.getElementById('contas-no-prazo').appendChild(contaElement);
  }

  var nomeElement = document.createElement('span');
  nomeElement.textContent = nomeBoleto;

  var boletoElement = document.createElement('span');
  boletoElement.textContent = boletoNumber;

  var valorElement = document.createElement('span');
  valorElement.textContent = valorNumber;

  var dataElement = document.createElement('span');
  dataElement.textContent = dataVencimento.toLocaleDateString();

  contaElement.appendChild(nomeElement);
  contaElement.appendChild(document.createTextNode(' - '));
  contaElement.appendChild(boletoElement);
  contaElement.appendChild(document.createTextNode(' - '));
  contaElement.appendChild(valorElement);
  contaElement.appendChild(document.createTextNode(' - '));
  contaElement.appendChild(dataElement);
}

// Ao carregar a página
window.addEventListener('load', function() {
  atualizarListaBoletos();
});

// Função para atualizar a lista de boletos na página
function atualizarListaBoletos() {
var listaBoletos = document.getElementById('lista-boletos');
listaBoletos.innerHTML = ''; // Limpa a lista de boletos

var boletos = obterBoletos();

// Ordena os boletos com base na data de vencimento
boletos.sort(function(a, b) {
  var dataA = new Date(a.dataVencimento);
  var dataB = new Date(b.dataVencimento);
  return dataA - dataB;
});


boletos.forEach(function(boleto) {
  var itemBoleto = document.createElement('li');
  itemBoleto.textContent = `${boleto.nome}: ${boleto.boleto} (Valor: R$ ${boleto.valor}, Vencimento: ${new Date(boleto.dataVencimento).toLocaleDateString()})`;

  // Aplica a classe correta ao item do boleto com base na categoria
  if (boleto.categoria === 'vencidas') {
    itemBoleto.classList.add('vermelho');
  } else if (boleto.categoria === 'prestes-a-vencer') {
    itemBoleto.classList.add('amarelo');
  } else {
    itemBoleto.classList.add('azul');
  }

      // Verifica se os boletos estão vencidos há mais de 10 dias e remove-os
boletos = boletos.filter(function(boleto) {
  var dataVencimento = new Date(boleto.dataVencimento);
  var diff = Math.ceil((dataVencimento - new Date()) / (1000 * 60 * 60 * 24));
  return diff >= -10; // Mantém apenas os boletos que não estão vencidos há mais de 10 dias
  });



  // Adiciona o item do boleto à lista
  listaBoletos.appendChild(itemBoleto);
});
}

// Procura o boleto pelo identificador único
var boletoIndex = boletos.findIndex(function(boleto) {
  return boleto.id === boletoId;
});

    // Atualiza o armazenamento local com a lista atualizada de boletos
    localStorage.setItem('boletos', JSON.stringify(boletos));

// Atualiza a exibição da lista de boletos na página
    atualizarListaBoletos();
  
  // Função para adicionar um boleto ao banco de dados
function adicionarBoleto(nomeBoleto, boletoNumber, valorNumber, dataVencimento) {
  // Cria um novo nó no banco de dados com as informações do boleto
  database.ref('boletos').push({
    nome: nomeBoleto,
    boleto: boletoNumber,
    valor: valorNumber,
    dataVencimento: dataVencimento.toISOString()
  })
  .then(() => {
    console.log('Boleto adicionado com sucesso ao banco de dados!');
    atualizarListaBoletos(); // Atualiza a lista de boletos na página
  })
  .catch((error) => {
    console.error('Erro ao adicionar o boleto:', error);
  });
}

// Função para obter todos os boletos do banco de dados
function obterBoletos() {
  return database.ref('boletos').once('value')
    .then((snapshot) => {
      const boletos = [];
      snapshot.forEach((childSnapshot) => {
        const boleto = childSnapshot.val();
        boletos.push(boleto);
      });
      return boletos;
    });
}

const database = firebase.database();