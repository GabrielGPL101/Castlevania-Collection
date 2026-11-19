var express = require("express");
var router = express.Router();

var path = require("path");
var pastaPaginas = path.join(__dirname, "../../private");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/cadastro.html", function (req, res) {
    res.set("Cache-Control", "no-store");
    res.sendFile("cadastro.html", { root: pastaPaginas });
});

router.get("/login.html", function (req, res) {
    res.set("Cache-Control", "no-store");
    res.sendFile("login.html", { root: pastaPaginas });
});

router.get("/quiz.html", function (req, res) {
    res.set("Cache-Control", "no-store");
    res.sendFile("quiz.html", { root: pastaPaginas });
});

router.get("/dashboard.html", function (req, res) {
    res.set("Cache-Control", "no-store");
    res.sendFile("dashboard.html", { root: pastaPaginas });
});

module.exports = router;
