b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

function limparSessao(){
  sessionStorage.clear()
  window.location = '../index.html'
}


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

function gabaritaram(){
  fetch(`/dashboardRoutes/gabaritaram`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DA MAIS ACERTADA()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(gabarito = json.gabarito)

        var gabarito = json.gabaritaram
        
        qtdGabarito.innerHTML = `${gabarito}`

      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });
}


var questoes = []
var respostas = []

function grafico() {
  fetch(`/dashboardRoutes/grafico`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO grafico()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json)

        for (var i = 0; i < json.length; i++) {
          questoes.push(json[i].pergunta)
          respostas.push(json[i].total_pessoas_acertaram)
        }
        criarGrafico()
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });

}

function criarGrafico() {
  const dash = document.getElementById("dash");

  new Chart(dash, {
    type: "bar",
    data: {
      labels: questoes,
      datasets: [
        {
          label: "Total Acertos",
          data: respostas,
          borderWidth: 1,
          backgroundColor: "#2499ff",
          borderColor: "#000",
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
            text: "Questôes", // Título do eixo X
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
}

function ranking() {
  fetch(`/dashboardRoutes/ranking`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO ranking()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        console.log(json.rankingNome1, json.rankingTempo1)

        ranking1.innerHTML = `1° ${json.rankingNome1} - ${json.rankingTempo1} seg`;
        ranking2.innerHTML = `2° ${json.rankingNome2} - ${json.rankingTempo2} seg`;
        ranking3.innerHTML = `3° ${json.rankingNome3} - ${json.rankingTempo3} seg`;
      });
    } else {
      console.log("Houve um erro ao tentar realizar a requisição!");
    }
  });

}
