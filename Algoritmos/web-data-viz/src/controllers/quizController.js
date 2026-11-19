var quizModel = require("../models/quizModel");

function registrar(req, res) {
    var idUsuario = req.usuario.id;
    var respostas = req.body.respostasServer;
    var alternativas = ["A", "B", "C", "D"];
    var gabarito = ["B", "C", "A", "D"];
    var acertos = 0;
    var respostasInvalidas = 0;

    if (!Array.isArray(respostas) || respostas.length != 4) {
        res.status(400).send("Responda às quatro perguntas.");
    } else {
        for (var i = 0; i < respostas.length; i++) {
            if (alternativas.indexOf(respostas[i]) == -1) {
                respostasInvalidas++;
            }
            if (respostas[i] == gabarito[i]) {
                acertos++;
            }
        }
        if (respostasInvalidas > 0) {
            res.status(400).send("Escolha uma alternativa de A a D em cada pergunta.");
        } else {
            quizModel.registrar(idUsuario, acertos)
                .then(function (resultado) {
                    res.json({ idResultado: resultado.insertId, acertos: acertos });
                }).catch(function (erro) {
                    if (erro.code == "ER_NO_REFERENCED_ROW_2") {
                        res.status(400).send("Usuário não encontrado. Entre novamente.");
                    } else {
                        console.log("Erro ao registrar quiz: ", erro.code);
                        res.status(500).send("Não foi possível registrar o resultado do quiz.");
                    }
                });
        }
    }
}

module.exports = {
    registrar
};
