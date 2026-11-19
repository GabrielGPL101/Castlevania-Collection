var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");
var sessao = require("../sessoes");

router.use(sessao.exigirLogin);

router.post("/registrar", function (req, res) {
    quizController.registrar(req, res);
});

module.exports = router;
