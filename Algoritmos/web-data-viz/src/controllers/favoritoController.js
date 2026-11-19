var favoritoModel = require("../models/favoritoModel");

function listar(req, res) {
    var idUsuario = req.usuario.id;
    favoritoModel.listar(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        }).catch(function (erro) {
            console.log("Erro ao consultar favoritos: ", erro.code);
            res.status(500).send("Não foi possível consultar os favoritos.");
        });
}

function cadastrar(req, res) {
    var idUsuario = req.usuario.id;
    var idJogo = Number(req.body.jogoServer);
    if (!(idJogo >= 1 && idJogo <= 4) || idJogo % 1 != 0) {
        res.status(400).send("Jogo inválido.");
    } else {
        favoritoModel.cadastrar(idUsuario, idJogo)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                if (erro.code == "ER_DUP_ENTRY") {
                    res.json({ mensagem: "O jogo já está nos favoritos." });
                } else if (erro.code == "ER_NO_REFERENCED_ROW_2") {
                    res.status(400).send("Usuário ou jogo não encontrado.");
                } else {
                    console.log("Erro ao favoritar: ", erro.code);
                    res.status(500).send("Não foi possível favoritar o jogo.");
                }
            });
    }
}

function remover(req, res) {
    var idUsuario = req.usuario.id;
    var idJogo = Number(req.params.idJogo);
    if (!(idJogo >= 1 && idJogo <= 4) || idJogo % 1 != 0) {
        res.status(400).send("Jogo inválido.");
    } else {
        favoritoModel.remover(idUsuario, idJogo)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log("Erro ao remover favorito: ", erro.code);
                res.status(500).send("Não foi possível remover o favorito.");
            });
    }
}

module.exports = {
    listar,
    cadastrar,
    remover
};
