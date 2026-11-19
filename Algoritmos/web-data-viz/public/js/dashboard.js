let modoDemonstracao = window.location.search == '?modo=demo';
let dadosDemonstracao = {
    resumo: [{totalUsuarios: 4, totalFavoritos: 5, totalTentativas: 4, participantes: 3}],
    personagens: [
        {idPersonagem: 1, quantidade: 2},
        {idPersonagem: 3, quantidade: 1},
        {idPersonagem: 4, quantidade: 1}
    ],
    favoritos: [
        {idJogo: 1, quantidade: 2},
        {idJogo: 2, quantidade: 1},
        {idJogo: 3, quantidade: 1},
        {idJogo: 4, quantidade: 1}
    ],
    quiz: [
        {acertos: 0, quantidade: 1},
        {acertos: 2, quantidade: 1},
        {acertos: 3, quantidade: 1},
        {acertos: 4, quantidade: 1}
    ]
};

function consultarPainel(tipo) {
    if (modoDemonstracao) {
        mostrarDadosPainel(tipo, dadosDemonstracao[tipo]);
    } else {
        fetch('/dashboard/' + tipo, {headers: {Authorization: sessionStorage.CHAVE_SESSAO}})
            .then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(function (dados) {
                        mostrarDadosPainel(tipo, dados);
                    }).catch(function () {
                        divMensagemPainel.innerHTML = 'Não foi possível carregar os dados do painel.';
                    });
                } else if (resposta.status == 401) {
                    window.location.replace('/login.html');
                } else {
                    divMensagemPainel.innerHTML = 'Não foi possível carregar todos os dados. Confira a conexão com o banco.';
                }
            }).catch(function () {
                divMensagemPainel.innerHTML = 'Não foi possível acessar a API.';
            });
    }
}

function mostrarDadosPainel(tipo, dados) {
    if (tipo == 'resumo') {
        mostrarResumo(dados);
    } else if (tipo == 'personagens') {
        mostrarPersonagens(dados);
    } else if (tipo == 'favoritos') {
        mostrarFavoritosPorJogo(dados);
    } else if (tipo == 'quiz') {
        mostrarAcertosQuiz(dados);
    }
}

let personagensDashboard = ['Alucard', 'Nathan Graves', 'Juste Belmont', 'Soma Cruz'];
let jogosDashboard = ['Symphony of the Night', 'Circle of the Moon', 'Harmony of Dissonance', 'Aria of Sorrow'];
let escolhasPersonagens = [0, 0, 0, 0];
let favoritosPorJogo = [0, 0, 0, 0];
let tentativasPorAcertos = [0, 0, 0, 0, 0];
let consultasConcluidas = 0;

function concluirConsulta() {
    consultasConcluidas++;
    if (consultasConcluidas == 4) {
        divMensagemPainel.innerHTML = '';
    }
}

function mostrarResumo(dados) {
    if (dados.length == 1) {
        let totalUsuarios = Number(dados[0].totalUsuarios);
        let participantes = Number(dados[0].participantes);
        let porcentagemParticipacao = 0;
        if (totalUsuarios > 0) {
            porcentagemParticipacao = participantes / totalUsuarios * 100;
        }
        divTotalUsuarios.innerHTML = totalUsuarios;
        divTotalFavoritos.innerHTML = dados[0].totalFavoritos;
        divTotalTentativas.innerHTML = dados[0].totalTentativas;
        divParticipantes.innerHTML = participantes;
        divParticipacao.innerHTML = porcentagemParticipacao.toFixed(0) + '% dos usuários';
        concluirConsulta();
    } else {
        divMensagemPainel.innerHTML = 'Não foi possível carregar os indicadores.';
    }
}

function mostrarPersonagens(dados) {
    for (let i = 0; i < dados.length; i++) {
        let indicePersonagem = Number(dados[i].idPersonagem) - 1;
        if (indicePersonagem >= 0 && indicePersonagem < 4) {
            escolhasPersonagens[indicePersonagem] = Number(dados[i].quantidade);
        }
    }
    desenhoPersonagens.update();
    concluirConsulta();
}

function mostrarFavoritosPorJogo(dados) {
    let totalFavoritos = 0;
    for (let i = 0; i < dados.length; i++) {
        let indiceJogo = Number(dados[i].idJogo) - 1;
        if (indiceJogo >= 0 && indiceJogo < 4) {
            favoritosPorJogo[indiceJogo] = Number(dados[i].quantidade);
            totalFavoritos += Number(dados[i].quantidade);
        }
    }
    divFavoritosSinfonia.innerHTML = favoritosPorJogo[0];
    divFavoritosCirculo.innerHTML = favoritosPorJogo[1];
    divFavoritosHarmonia.innerHTML = favoritosPorJogo[2];
    divFavoritosAria.innerHTML = favoritosPorJogo[3];
    if (totalFavoritos == 0) {
        divNotaFavoritos.innerHTML = 'Nenhum favorito registrado.';
    } else {
        divNotaFavoritos.innerHTML = 'Uma conta pode favoritar mais de um jogo.';
    }
    desenhoFavoritos.update();
    concluirConsulta();
}

function mostrarAcertosQuiz(dados) {
    for (let i = 0; i < dados.length; i++) {
        let acertos = Number(dados[i].acertos);
        if (acertos >= 0 && acertos <= 4) {
            tentativasPorAcertos[acertos] = Number(dados[i].quantidade);
        }
    }
    divQuizVerde.innerHTML = tentativasPorAcertos[3] + tentativasPorAcertos[4];
    divQuizLaranja.innerHTML = tentativasPorAcertos[2];
    divQuizVermelha.innerHTML = tentativasPorAcertos[0] + tentativasPorAcertos[1];
    if (dados.length == 0) {
        divNotaQuiz.innerHTML = 'Nenhuma tentativa registrada.';
    } else {
        divNotaQuiz.innerHTML = 'A classificação vale para cada tentativa.';
    }
    desenhoQuiz.update();
    concluirConsulta();
}

Chart.defaults.color = '#bcaeb4';
Chart.defaults.font.family = 'Arial, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.animation = false;

let desenhoPersonagens = new Chart(graficoPersonagens, {
    type: 'bar',
    data: {
        labels: personagensDashboard,
        datasets: [{
            label: 'Usuários',
            data: escolhasPersonagens,
            backgroundColor: '#b5a9cf',
            borderRadius: 3,
            barThickness: 22
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: false,
        plugins: {legend: {display: false}},
        scales: {
            x: {beginAtZero: true, suggestedMax: 1, ticks: {stepSize: 1}, grid: {color: '#34272d'}},
            y: {grid: {display: false}}
        }
    }
});

let desenhoFavoritos = new Chart(graficoFavoritos, {
    type: 'doughnut',
    data: {
        labels: jogosDashboard,
        datasets: [{
            label: 'Favoritos',
            data: favoritosPorJogo,
            backgroundColor: ['#c8ab80', '#9380b8', '#bcb2c9', '#8ca9c2'],
            borderColor: '#151113',
            borderWidth: 3
        }]
    },
    options: {
        responsive: false,
        cutout: '68%',
        plugins: {legend: {display: false}}
    }
});

let desenhoQuiz = new Chart(graficoQuiz, {
    type: 'bar',
    data: {
        labels: ['0 acertos', '1 acerto', '2 acertos', '3 acertos', '4 acertos'],
        datasets: [{
            label: 'Tentativas',
            data: tentativasPorAcertos,
            backgroundColor: ['#df6b78', '#df6b78', '#e7a45d', '#6bbd8e', '#6bbd8e'],
            borderRadius: 3,
            barThickness: 32
        }]
    },
    options: {
        responsive: false,
        plugins: {legend: {display: false}},
        scales: {
            x: {grid: {display: false}, ticks: {font: {size: 11}}},
            y: {beginAtZero: true, suggestedMax: 1, ticks: {stepSize: 1}, grid: {color: '#34272d'}}
        }
    }
});


if (modoDemonstracao) {
    modoPainel.innerHTML = '<a class="modoPainel" href="dashboard.html">Voltar aos dados reais</a><p class="notaGrafico">Dados fictícios para apresentação.</p>';
} else {
    modoPainel.innerHTML = '<a class="modoPainel" href="dashboard.html?modo=demo">Ver dados de demonstração</a>';
    divMensagemPainel.innerHTML = 'Carregando dados do banco...';
}
consultarPainel('resumo');
consultarPainel('personagens');
consultarPainel('favoritos');
consultarPainel('quiz');
