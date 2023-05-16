document.getElementById('form-conta').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário
  
    var nomeInput = document.getElementById('nome-input');
    var boletoInput = document.getElementById('boleto-input');
    var dataInput = document.getElementById('data-vencimento-input');
    var nomeBoleto = nomeInput.value.trim();
    var boletoNumber = boletoInput.value.trim();
    var dataVencimento = new Date(dataInput.value); // Converte a data de vencimento para um objeto Date
  
    if (nomeBoleto !== '' && boletoNumber !== '') {
      var hoje = new Date(); // Data atual
      var diff = Math.ceil((dataVencimento - hoje) / (1000 * 60 * 60 * 24)); // Calcula a diferença em dias
  
      var contaElement = document.createElement('div');
      contaElement.className = 'conta';
  
      if (diff <= 0) { // Vencido
        contaElement.classList.add('vermelho');
        document.getElementById('contas-vencidas').appendChild(contaElement);
      } else if (diff <= 5) { // Faltam menos de 5 dias para o vencimento
        contaElement.classList.add('amarelo');
        document.getElementById('contas-prestes-a-vencer').appendChild(contaElement);
      } else if (diff <= 10) { // Faltam menos de 10 dias para o vencimento
        contaElement.classList.add('azul');
        document.getElementById('contas-no-prazo').appendChild(contaElement);
      } else { // Não vencido e nem perto de vencer
        contaElement.classList.add('azul');
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
  
      nomeInput.value = '';
      boletoInput.value = '';
      dataInput.value = '';
  
      // Salvar boleto no Firebase Firestore
      var db = firebase.firestore();
      db.collection('boletos').add({
        nome: nomeBoleto,
        boleto: boletoNumber,
        dataVencimento: dataVencimento
      })
      .then(function(docRef) {
        console.log('Boleto adicionado com ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Erro ao adicionar boleto: ', error);
      });
    }
  });


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVfIQWqWM73G8Gf4HMcXXnf-IeTd_VFFw",
    authDomain: "rtvidros-ae2a3.firebaseapp.com",
    projectId: "rtvidros-ae2a3",
    storageBucket: "rtvidros-ae2a3.appspot.com",
    messagingSenderId: "96212604029",
    appId: "1:96212604029:web:57334155b80d9e1f104d14",
    measurementId: "G-234V9C2Z21"
  };