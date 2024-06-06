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

module.exports = {
    perguntaMaisAcertada
}