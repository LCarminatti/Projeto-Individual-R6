var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/perguntaMaisAcertada", function (req, res) {
    dashboardController.perguntaMaisAcertada(req, res);
});

module.exports = router;