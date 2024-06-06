b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

function limparSessao(){
  sessionStorage.clear()
  
}

const dash = document.getElementById("dash");

new Chart(dash, {
  type: "bar",
  data: {
    labels: ['Questão 1', 'Questão 2', 'Questão 3', 'Questão 4', 'Questão 5', 'Questão 6'],
    datasets: [
      {
        label: "Pessoas que acertaram",
        data: [50, 45, 39, 33, 29, 24, 22, 19, 14, 12, 1, 0],
        borderWidth: 1,
        backgroundColor: "#2499ff",
        borderColor: "#00000",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Número de acertos", // Título do eixo X
          font: {
            weight: "bold", // Estilo da fonte (negrito)
            size: 20, // Tamanho da fonte
            family: "Arial", // Tipo de fonte
          },
          padding: {
            // Preenchimento do título
            top: 10,
            bottom: 10,
          },
        },
      },
      y: {
        display: false, // Ocultar escala do eixo Y
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top", // Posição da legenda
      },
    },
  },
});

function perguntaMaisAcertada(){
  fetch(`/dashboardRoutes/perguntaMaisAcertada`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DA MAIS ACERTADA()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(perguntaAcertada = json.perguntaMaisAcertada)

        var perguntaAcertada = json.perguntaMaisAcertada
        var perguntaMenosAcertada = json.perguntaMenosAcertada
        
        questaoErrada.innerHTML = `Questão: ${perguntaMenosAcertada}`
        questaoAcertada.innerHTML = `Questão: ${perguntaAcertada}`

      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });

}
