var quizModel = require("../models/quizModel");

function enviarQuiz(req, res) {
console.log('FETCH SERVER')
    var totalAcertosVar = req.body.totalAcertosServer;
    var pergunta1 = req.body.pergunta1Server
    var pergunta2 = req.body.pergunta2Server
    var pergunta3 = req.body.pergunta3Server
    var pergunta4 = req.body.pergunta4Server
    var pergunta5 = req.body.pergunta5Server
    var pergunta6 = req.body.pergunta6Server
    var idUsuario = req.body.idUsuarioServer;

    quizModel.enviarQuiz(totalAcertosVar, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o envio dos dados do quiz! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    enviarQuiz
}