var dashboardModel = require("../models/dashboardModel");

function buscarResumo(req, res) {
    dashboardModel.buscarResumo()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("Erro ao consultar o painel: ", erro.code);
            res.status(500).send("Não foi possível consultar os dados do painel.");
        });
}

function buscarPersonagens(req, res) {
    dashboardModel.buscarPersonagens()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("Erro ao consultar o painel: ", erro.code);
            res.status(500).send("Não foi possível consultar os dados do painel.");
        });
}

function buscarFavoritos(req, res) {
    dashboardModel.buscarFavoritos()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("Erro ao consultar o painel: ", erro.code);
            res.status(500).send("Não foi possível consultar os dados do painel.");
        });
}

function buscarQuiz(req, res) {
    dashboardModel.buscarQuiz()
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("Erro ao consultar o painel: ", erro.code);
            res.status(500).send("Não foi possível consultar os dados do painel.");
        });
}

module.exports = {
    buscarResumo,
    buscarPersonagens,
    buscarFavoritos,
    buscarQuiz
};
