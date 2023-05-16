document.getElementById('form-conta').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    var nomeInput = document.getElementById('nome-input');
    var boletoInput = document.getElementById('boleto-input');
    var dataInput = document.getElementById('data-vencimento-input');
    var nomeBoleto = nomeInput.value.trim();
    var boletoNumber = boletoInput.value.trim();
    var dataVencimento = new Date(dataInput.value); // Converte a data de vencimento para um objeto Date

    if (nomeBoleto !== '' && boletoNumber !== '') {
        adicionarBoleto(nomeBoleto, boletoNumber, dataVencimento);

        nomeInput.value = '';
        boletoInput.value = '';
        dataInput.value = '';
    }
});

// Função para adicionar um boleto à lista
function adicionarBoleto(nomeBoleto, boletoNumber, dataVencimento) {
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

    var dataElement = document.createElement('span');
    dataElement.textContent = dataVencimento.toLocaleDateString();

    contaElement.appendChild(nomeElement);
    contaElement.appendChild(document.createTextNode(' - '));
    contaElement.appendChild(boletoElement);
    contaElement.appendChild(document.createTextNode(' - '));
    contaElement.appendChild(dataElement);

// Armazena o boleto no localStorage
var boletos = obterBoletos();
var novoBoleto = {
    nome: nomeBoleto,
    boleto: boletoNumber,
    dataVencimento: dataVencimento.toISOString(), // Armazena a data como string no formato ISO
    categoria: categoria // Adiciona a categoria ao objeto do boleto
};
boletos.push(novoBoleto);
localStorage.setItem('boletos', JSON.stringify(boletos));

atualizarListaBoletos();
}

// Função para obter os boletos armazenados no localStorage
function obterBoletos() {
var boletos = localStorage.getItem('boletos');
if (boletos) {
    return JSON.parse(boletos);
} else {
    return [];
}
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
      itemBoleto.textContent = `${boleto.nome}: ${boleto.boleto} (Vencimento: ${new Date(boleto.dataVencimento).toLocaleDateString()})`;
  
      // Aplica a classe correta ao item do boleto com base na categoria
      if (boleto.categoria === 'vencidas') {
        itemBoleto.classList.add('vermelho');
      } else if (boleto.categoria === 'prestes-a-vencer') {
        itemBoleto.classList.add('amarelo');
      } else {
        itemBoleto.classList.add('azul');
      }
  
      // Cria o botão de exclusão
      var botaoExcluir = document.createElement('button');
      botaoExcluir.textContent = 'Excluir';
      botaoExcluir.setAttribute('data-id', boleto.id); // Define o atributo de identificador único
  
      // Registra o evento de clique no botão de exclusão
      botaoExcluir.addEventListener('click', function() {
        var boletoId = this.getAttribute('data-id');
        excluirBoleto(boletoId);
      });
  
      // Adiciona o botão de exclusão ao item do boleto
      itemBoleto.appendChild(botaoExcluir);
  
      // Adiciona o item do boleto à lista
      listaBoletos.appendChild(itemBoleto);
    });
  }
  
  // Função para excluir um boleto da lista
function excluirBoleto(boletoId) {
    // Obtém os boletos do armazenamento local
    var boletos = obterBoletos();
  
    // Procura o boleto pelo identificador único
    var boletoIndex = boletos.findIndex(function(boleto) {
      return boleto.id === boletoId;
    });
  
    // Verifica se o boleto foi encontrado
    if (boletoIndex !== -1) {
      // Exibe uma mensagem de confirmação antes da exclusão
      var confirmacao = confirm('Tem certeza que deseja excluir este boleto?');
  
      // Verifica se o usuário confirmou a exclusão
      if (confirmacao) {
        // Remove o boleto da lista
        boletos.splice(boletoIndex, 1);
  
        // Atualiza o armazenamento local com a lista atualizada de boletos
        localStorage.setItem('boletos', JSON.stringify(boletos));
  
        // Atualiza a exibição da lista de boletos na página
        atualizarListaBoletos();
      }
    }
  }