let respostasQuiz = ['', '', '', ''];
let gabaritoQuiz = ['B', 'C', 'A', 'D'];
let jogosQuiz = ['Symphony of the Night', 'Circle of the Moon', 'Harmony of Dissonance', 'Aria of Sorrow'];
let quizEnviado = false;
let quizSalvando = false;

function corrigirQuiz() {
    let perguntasRespondidas = 0;
    for (let i = 0; i < respostasQuiz.length; i++) {
        if (respostasQuiz[i] != '') {
            perguntasRespondidas++;
        }
    }

    if (idUsuario == 0) {
        divMensagemQuiz.innerHTML = 'Entre na sua conta para registrar o quiz. <a href="login.html">Ir para o login</a>';
    } else if (quizEnviado == true) {
        divMensagemQuiz.innerHTML = 'Essa tentativa já foi registrada. Clique em Tentar novamente para iniciar outra.';
    } else if (quizSalvando == true) {
        divMensagemQuiz.innerHTML = 'Aguarde o registro da tentativa.';
    } else if (perguntasRespondidas < respostasQuiz.length) {
        divMensagemQuiz.innerHTML = 'Responda às quatro perguntas antes de conferir o resultado.';
    } else {
        quizSalvando = true;
        divMensagemQuiz.innerHTML = 'Registrando tentativa...';
        fetch('/quiz/registrar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: sessionStorage.CHAVE_SESSAO},
            body: JSON.stringify({respostasServer: respostasQuiz})
        }).then(function (resposta) {
            if (resposta.ok) {
                quizSalvando = false;
                quizEnviado = true;
                resposta.json().then(function (resultado) {
                    mostrarResultadoQuiz(Number(resultado.acertos));
                    divMensagemQuiz.innerHTML = 'Tentativa registrada no banco.';
                }).catch(function () {
                    divMensagemQuiz.innerHTML = 'Tentativa registrada. Não foi possível mostrar o resultado.';
                });
            } else {
                quizSalvando = false;
                resposta.text().then(function (mensagem) {
                    divMensagemQuiz.innerHTML = mensagem;
                });
            }
        }).catch(function () {
            quizSalvando = false;
            divMensagemQuiz.innerHTML = 'Não foi possível acessar a API. A tentativa não foi registrada.';
        });
    }
}

function mostrarResultadoQuiz(acertos) {
    let detalhesResultado = '';
    for (let i = 0; i < respostasQuiz.length; i++) {
        if (respostasQuiz[i] == gabaritoQuiz[i]) {
            detalhesResultado += '<p>' + jogosQuiz[i] + ': resposta correta!</p>';
        } else {
            detalhesResultado += '<p>' + jogosQuiz[i] + ': você marcou ' + respostasQuiz[i] + '. A alternativa correta é ' + gabaritoQuiz[i] + '.</p>';
        }
    }
    let erros = respostasQuiz.length - acertos;
    let porcentagemAcertos = acertos / respostasQuiz.length * 100;
    divResultadoQuiz.innerHTML = '<div class="painel"><p class="destaque">SEU RESULTADO</p><h2>' + acertos + ' de 4 acertos</h2><p>Você acertou ' + porcentagemAcertos.toFixed(0) + '% do quiz e teve ' + erros + ' erro(s).</p>' + detalhesResultado + '</div>';
}

function escolherResposta(indicePergunta, alternativa) {
    if (quizEnviado == false && quizSalvando == false) {
        respostasQuiz[indicePergunta] = alternativa;
        divResultadoQuiz.innerHTML = '';
        divMensagemQuiz.innerHTML = '';
    } else {
        divMensagemQuiz.innerHTML = 'Para alterar as respostas, inicie outra tentativa em Tentar novamente.';
    }
}
