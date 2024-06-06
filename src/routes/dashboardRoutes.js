var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/perguntaMaisAcertada", function (req, res) {
    dashboardController.perguntaMaisAcertada(req, res);
});

router.get("/gabaritaram", function (req, res) {
    dashboardController.gabaritaram(req, res);
});

router.get("/grafico", function (req, res) {
    dashboardController.grafico(req, res);
});

module.exports = router;