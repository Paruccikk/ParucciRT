<!DOCTYPE html>
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <title>R.T Vidros</title>
  <link rel="stylesheet" href="app.css" />
  <link rel="icon" href="logo.png" type="image/x-icon">
</head>


  <body>
    <header>
      <nav>
        <a class="logo" href="app.php"> APP RT.Vidros </a>
        <div class="mobile-menu">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
        <ul class="nav-list">
          <li><a href="app.php">Contas</a></li>
          <li><a href="serviços.html">Serviços</a></li>
          <li><a href="orçamento.html">Orçamentos</a></li>
        </ul>
      </nav>
    </header>
     
      <div class="footer-container">
      <div class="content">
<html>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <center>
    <form id="form-conta">
        <input type="text" id="nome-input" placeholder="Nome do boleto">
        <input type="text" id="boleto-input" placeholder="Número do boleto">
        <input type="text" id="valor-input" placeholder="Valor do boleto">
        <input type="date" id="data-vencimento-input">
        <button type="submit" id="adicionar"> Adicionar </button>
    </form>
    <br>
    <br>
    <br>
    <h2> Todos os Boletos </h2> <span id="valor-total"></span>
    <ul id="lista-boletos" class="boletos-lista"></ul>
        <!-- Aqui serão exibidos os boletos adicionados -->

    
    <div id="contas">  
        <div id="contas-vencidas"></div>
        <div id="contas-prestes-a-vencer"></div>
        <div id="contas-no-prazo"></div>
    </div>

</center>

    <script src="script.js"></script>
    
    
    <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
  </script>
  
  <script src="firebase.js"></script>
  
</body>
</html>