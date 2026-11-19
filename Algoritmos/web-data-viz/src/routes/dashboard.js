var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");
var sessao = require("../sessoes");

router.use(sessao.exigirLogin);

router.get("/resumo", function (req, res) {
    dashboardController.buscarResumo(req, res);
});

router.get("/personagens", function (req, res) {
    dashboardController.buscarPersonagens(req, res);
});

router.get("/favoritos", function (req, res) {
    dashboardController.buscarFavoritos(req, res);
});

router.get("/quiz", function (req, res) {
    dashboardController.buscarQuiz(req, res);
});

module.exports = router;
