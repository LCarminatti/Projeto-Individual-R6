var dashboardModel = require("../models/dashboardModel");

function perguntaMaisAcertada(req, res) {
    dashboardModel.perguntaMaisAcertada()
      .then(function (resultadoMaisAcertado) {
        res.json({
            perguntaMaisAcertada: resultadoMaisAcertado[0].questao_mais_acertada,
            perguntaMenosAcertada: resultadoMaisAcertado[0].questao_menos_acertada
        });
      })
      .catch(function (erro) {
        console.error(erro);
        console.error("Houve um erro ao obter a questão mais acertada! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
}

function gabaritaram(req, res) {
  dashboardModel.gabaritaram()
    .then(function (resultadoQtdGabarito) {
      res.json({
          gabaritaram: resultadoQtdGabarito[0].total_pessoas_acertaram_tudo
      });
    })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter a questão mais acertada! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function grafico(req, res) {
  dashboardModel.grafico()
    .then(function (resultadoGrafico) {
      res.json(resultadoGrafico);
    })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter os dados do Gráfico Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ranking(req, res) {
  dashboardModel.ranking()
    .then(function (resultadoRanking) {
      res.json({
          rankingNome1: resultadoRanking[0].nome1,
          rankingTempo1: resultadoRanking[0].tempo1,
          rankingNome2: resultadoRanking[0].nome2,
          rankingTempo2: resultadoRanking[0].tempo2,
          rankingNome3: resultadoRanking[0].nome3,
          rankingTempo3: resultadoRanking[0].tempo3
      });
    })
    .catch(function (erro) {
      console.error(erro);
      console.error("Houve um erro ao obter o ranking! Erro: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    perguntaMaisAcertada, gabaritaram, grafico, ranking
};