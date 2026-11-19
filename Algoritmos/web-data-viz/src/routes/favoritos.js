var express = require("express");
var router = express.Router();

var favoritoController = require("../controllers/favoritoController");
var sessao = require("../sessoes");

router.use(sessao.exigirLogin);

router.get("/listar", function (req, res) {
    favoritoController.listar(req, res);
});

router.post("/cadastrar", function (req, res) {
    favoritoController.cadastrar(req, res);
});

router.delete("/remover/:idJogo", function (req, res) {
    favoritoController.remover(req, res);
});

module.exports = router;
