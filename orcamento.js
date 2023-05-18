// Função para adicionar um item ao orçamento
function adicionarItem() {
  const produto = document.getElementById('produto').value;
  const quantidade = document.getElementById('quantidade').value;
  const preco = document.getElementById('preco').value;
  const total = quantidade * preco;

  const tabelaOrcamento = document.getElementById('tabela-orcamento').getElementsByTagName('tbody')[0];
  const novaLinha = tabelaOrcamento.insertRow();

  const colunaProduto = novaLinha.insertCell(0);
  const colunaQuantidade = novaLinha.insertCell(1);
  const colunaPreco = novaLinha.insertCell(2);
  const colunaTotal = novaLinha.insertCell(3);

  colunaProduto.innerHTML = produto;
  colunaQuantidade.innerHTML = quantidade;
  colunaPreco.innerHTML = preco;
  colunaTotal.innerHTML = total.toFixed(2);

  calcularTotalGeral();
}

// Função para calcular o total geral do orçamento
function calcularTotalGeral() {
  const tabelaOrcamento = document.getElementById('tabela-orcamento').getElementsByTagName('tbody')[0];
  const linhas = tabelaOrcamento.getElementsByTagName('tr');
  let totalGeral = 0;

  for (let i = 0; i < linhas.length; i++) {
    const colunaTotal = parseFloat(linhas[i].getElementsByTagName('td')[3].innerHTML);
    totalGeral += colunaTotal;
  }

  document.getElementById('total-geral').innerHTML = 'R$ ' + totalGeral.toFixed(2);
}

// Função para converter o conteúdo da tabela em imagem e baixá-la
function baixarImagem() {
  const tabelaOrcamento = document.getElementById('tabela-orcamento');

  // Use a biblioteca html2canvas para converter a tabela em uma imagem
  html2canvas(tabelaOrcamento).then(function (canvas) {
    // Cria um elemento link para baixar a imagem
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'orcamento.png';
    link.click();
  });
}

document.getElementById('form-orcamento').addEventListener('submit', function (e) {
  e.preventDefault();
  adicionarItem();
  this.reset();
});


// Função para converter o conteúdo da tabela em imagem e baixá-la
function baixarImagem() {
  const tabelaOrcamento = document.getElementById('tabela-orcamento');

  // Use a biblioteca html2canvas para converter a tabela em uma imagem
  html2canvas(tabelaOrcamento).then(function (canvas) {
    // Cria um novo elemento de canvas com dimensões personalizadas
    const novoCanvas = document.createElement('canvas');
    const context = novoCanvas.getContext('2d');

    // Defina as dimensões do novo canvas
    novoCanvas.width = 400; // Largura personalizada
    novoCanvas.height = 400; // Altura personalizada

    // Estilize a imagem
    context.fillStyle = '#ffffff'; // Cor de fundo
    context.fillRect(0, 0, novoCanvas.width, novoCanvas.height);

    // Adicione um logotipo (substitua 'logo.png' pelo caminho para o logotipo)
    const logo = new Image();
    logo.src = 'logo.png';
    logo.onload = function () {
      context.drawImage(logo, 20, 20, 100, 100); // Posição e tamanho do logotipo
      context.font = 'bold 16px Arial'; // Estilo de fonte para as informações
      context.fillStyle = '#000000'; // Cor do texto

      // Adicione as informações do orçamento em retângulos separados
      context.fillRect(20, 150, 360, 50); // Retângulo para o produto
      context.fillRect(20, 210, 360, 50); // Retângulo para a quantidade
      context.fillRect(20, 270, 360, 50); // Retângulo para o preço

      // Adicione o texto das informações
      context.fillStyle = '#ffffff'; // Cor do texto nos retângulos
      context.fillText('Produto: ' + document.getElementById('produto').value, 30, 185); // Texto do produto
      context.fillText('Quantidade: ' + document.getElementById('quantidade').value, 30, 245); // Texto da quantidade
      context.fillText('Preço: ' + document.getElementById('preco').value, 30, 305); // Texto do preço

      // Desenhe a imagem do orçamento na posição desejada
      context.drawImage(canvas, 20, 350);

      // Crie um link de download para a imagem
      const link = document.createElement('a');
      link.href = novoCanvas.toDataURL('image/png');
      link.download = 'orçamento.png';
      link.click();
    };
  });
}

document.getElementById('btn-imprimir').addEventListener('click', baixarImagem);