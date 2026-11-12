let respostasQuiz = ['', '', '', ''];
let gabaritoQuiz = ['B', 'C', 'A', 'D'];
let jogosQuiz = ['Symphony of the Night', 'Circle of the Moon', 'Harmony of Dissonance', 'Aria of Sorrow'];

function corrigirQuiz() {
    let perguntasRespondidas = 0;
    let acertos = 0;
    let detalhesResultado = '';

    for (let i = 0; i < respostasQuiz.length; i++) {
        if (respostasQuiz[i] != '') {
            perguntasRespondidas++;
        }
    }

    if (perguntasRespondidas < respostasQuiz.length) {
        divResultadoQuiz.innerHTML = '<p class="mensagem">Responda às quatro perguntas antes de conferir o resultado.</p>';
    } else {
        for (let i = 0; i < respostasQuiz.length; i++) {
            if (respostasQuiz[i] == gabaritoQuiz[i]) {
                acertos++;
                detalhesResultado += '<p>' + jogosQuiz[i] + ': resposta correta!</p>';
            } else {
                detalhesResultado += '<p>' + jogosQuiz[i] + ': você marcou ' + respostasQuiz[i] + '. A alternativa correta é ' + gabaritoQuiz[i] + '.</p>';
            }
        }

        let erros = respostasQuiz.length - acertos;
        let porcentagemAcertos = acertos / respostasQuiz.length * 100;

        divResultadoQuiz.innerHTML = '<div class="painel"><p class="destaque">SEU RESULTADO</p><h2>' + acertos + ' de 4 acertos</h2><p>Você acertou ' + porcentagemAcertos.toFixed(0) + '% do quiz e teve ' + erros + ' erro(s).</p>' + detalhesResultado + '</div>';
    }
}
