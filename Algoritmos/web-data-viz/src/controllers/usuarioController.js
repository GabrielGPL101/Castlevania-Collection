var usuarioModel = require("../models/usuarioModel");
var sessao = require("../sessoes");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (sessao.buscarUsuario(req)) {
        res.status(409).send("Você já está conectado.");
    } else if (typeof email != "string" || email.trim() == "") {
        res.status(400).send("Informe o e-mail.");
    } else if (typeof senha != "string" || senha.trim() == "") {
        res.status(400).send("Informe a senha.");
    } else {
        usuarioModel.autenticar(email.trim(), senha)
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        var usuario = {
                            id: resultadoAutenticar[0].idUsuario,
                            nome: resultadoAutenticar[0].nickname,
                            fkPersonagem: resultadoAutenticar[0].fkPersonagem
                        };
                        var chave = sessao.iniciarSessao(usuario);
                        res.json({ chave: chave });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("E-mail ou senha inválidos.");
                    } else {
                        res.status(403).send("Foi encontrada mais de uma conta com essas credenciais.");
                    }
                }
            ).catch(
                function (erro) {
                    console.log("Houve um erro ao realizar o login: ", erro.code);
                    res.status(500).send("Não foi possível realizar o login. Confira a conexão com o banco.");
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkPersonagem = Number(req.body.personagemServer);
    var caracteresPermitidos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
    var caracteresInvalidos = 0;

    if (sessao.buscarUsuario(req)) {
        res.status(409).send("Você já está conectado.");
    } else if (typeof nome != "string" || nome.length < 3 || nome.length > 100) {
        res.status(400).send("O apelido deve ter entre 3 e 100 caracteres.");
    } else if (typeof email != "string" || email.trim() == "" || email.length > 255) {
        res.status(400).send("Informe um e-mail válido.");
    } else if (typeof senha != "string" || senha.trim() == "" || senha.length < 8 || senha.length > 255) {
        res.status(400).send("A senha deve ter entre 8 e 255 caracteres.");
    } else if (!(fkPersonagem >= 1 && fkPersonagem <= 4) || fkPersonagem % 1 != 0) {
        res.status(400).send("Escolha um dos quatro personagens.");
    } else {
        for (var i = 0; i < nome.length; i++) {
            if (caracteresPermitidos.indexOf(nome[i]) == -1) {
                caracteresInvalidos++;
            }
        }
        email = email.trim();
        var posicaoArroba = email.indexOf("@");
        var posicaoPonto = email.indexOf(".", posicaoArroba + 1);
        var arrobaInvalida = posicaoArroba <= 0 || email.indexOf("@", posicaoArroba + 1) != -1;
        var pontoInvalido = posicaoPonto <= posicaoArroba + 1 || posicaoPonto >= email.length - 1
            || email[0] == "." || email[posicaoArroba - 1] == "." || email[email.length - 1] == "." || email.includes("..");
        var espacoInvalido = email.includes(" ") || email.includes("\t") || email.includes("\n");

        if (caracteresInvalidos > 0) {
            res.status(400).send("Use apenas letras sem acento, números e sublinhado no apelido.");
        } else if (arrobaInvalida || pontoInvalido || espacoInvalido) {
            res.status(400).send("Informe um e-mail válido.");
        } else {
            usuarioModel.cadastrar(nome, email, senha, fkPersonagem)
                .then(
                    function (resultado) {
                        res.json({ idUsuario: resultado.insertId });
                    }
                ).catch(
                    function (erro) {
                        if (erro.code == "ER_DUP_ENTRY") {
                            res.status(409).send("Apelido ou e-mail já cadastrado.");
                        } else {
                            console.log("Houve um erro ao realizar o cadastro: ", erro.code);
                            res.status(500).send("Não foi possível cadastrar. Confira o banco e os personagens cadastrados.");
                        }
                    }
                );
        }
    }
}

function buscarSessao(req, res) {
    res.set("Cache-Control", "no-store");
    res.json(sessao.buscarUsuario(req) || {});
}

function sair(req, res) {
    sessao.encerrarSessao(req);
    res.status(204).end();
}

module.exports = {
    autenticar,
    cadastrar,
    buscarSessao,
    sair
};
