var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função cadastrar de quiz.js
router.post("/enviarQuiz", function (req, res) {
    quizController.enviarQuiz(req, res);
})

module.exports = router;