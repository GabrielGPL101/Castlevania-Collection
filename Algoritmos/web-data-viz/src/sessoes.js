var crypto = require("crypto");
var sessoes = new Map();
var duracaoSessao = 8 * 60 * 60 * 1000;

function iniciarSessao(usuario) {
    var chave = crypto.randomBytes(32).toString("hex");
    sessoes.set(chave, usuario);
    setTimeout(function () {
        sessoes.delete(chave);
    }, duracaoSessao).unref();
    return chave;
}

function buscarUsuario(req) {
    return sessoes.get(req.get("Authorization"));
}

function encerrarSessao(req) {
    sessoes.delete(req.get("Authorization"));
}

function exigirLogin(req, res, next) {
    res.set("Cache-Control", "no-store");
    req.usuario = buscarUsuario(req);
    if (req.usuario && req.usuario.id > 0 && req.usuario.id % 1 == 0) {
        next();
    } else {
        res.status(401).send("Entre na sua conta para continuar.");
    }
}

module.exports = {
    iniciarSessao,
    buscarUsuario,
    encerrarSessao,
    exigirLogin
};
