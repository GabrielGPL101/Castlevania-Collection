var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/sessao", function (req, res) {
    usuarioController.buscarSessao(req, res);
});

router.post("/sair", function (req, res) {
    usuarioController.sair(req, res);
});

module.exports = router;
