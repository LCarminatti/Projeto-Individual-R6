var aimlabModel = require("../models/aimlabModel");

function enviarAimlab(req, res) {
console.log('FETCH SERVER')
    var tempoConclusaoVar = req.body.tempoConclusaoServer;
    var rankingVar = req.body.rankingServer;
    var idUsuario = req.body.idUsuarioServer;

    aimlabModel.enviarAimlab(tempoConclusaoVar, rankingVar,idUsuario)
        .then(
            function (resultadoAimlab) {
                res.json(resultadoAimlab);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o envio dos dados do aimlab! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    enviarAimlab
}