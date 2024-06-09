var express = require("express");
var router = express.Router();

var aimlabController = require("../controllers/aimlabController");

//Recebendo os dados do html e direcionando para a função cadastrar de quiz.js
router.post("/enviarAimlab", function (req, res) {
    aimlabController.enviarAimlab(req, res);
})

module.exports = router;