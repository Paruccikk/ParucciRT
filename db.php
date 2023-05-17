<?php
// Informações de acesso ao banco de dados
$hostname = 'u317257853_parucci';
$username = 'u317257853_parucci';
$password = 'Somerlate@2578';
$database = 'parucci';

// Conexão com o banco de dados
$conn = mysqli_connect($hostname, $username, $password, $database);

// Verifica se houve erros na conexão
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Exemplo de inserção de dados no banco de dados
$nomeBoleto = $_POST['nome'];
$boletoNumber = $_POST['boleto'];
$valorNumber = $_POST['valor'];
$dataVencimento = $_POST['data_vencimento'];

$sql = "INSERT INTO boletos (nome, boleto, valor, data_vencimento) VALUES ('$nomeBoleto', '$boletoNumber', '$valorNumber', '$dataVencimento')";

if (mysqli_query($conn, $sql)) {
    echo 'Boleto adicionado com sucesso.';
} else {
    echo 'Erro ao adicionar boleto: ' . mysqli_error($conn);
}

echo "Conexão bem-sucedida com o banco de dados.";

// Fechando a conexão com o banco de dados
mysqli_close($conn);
?>