let apelidosDashboard = ['Cacador01', 'Belmont02', 'Explorador03', 'Soma04'];
let personagensUsuarios = [1, 3, 1, 4];
let personagensDashboard = ['Alucard', 'Nathan Graves', 'Juste Belmont', 'Soma Cruz'];
let jogosDashboard = ['Symphony of the Night', 'Circle of the Moon', 'Harmony of Dissonance', 'Aria of Sorrow'];
let jogosFavoritosDashboard = [4, 1, 3, 1, 2];
let usuariosTentativas = [1, 1, 2, 3];
let acertosTentativas = [3, 4, 2, 0];
let escolhasPersonagens = [0, 0, 0, 0];
let favoritosPorJogo = [0, 0, 0, 0];
let tentativasPorAcertos = [0, 0, 0, 0, 0];

function carregarDashboard() {
    let participantes = 0;
    let quantidadeVerde = 0;
    let quantidadeLaranja = 0;
    let quantidadeVermelha = 0;
    let porcentagemParticipacao = 0;

    for (let i = 0; i < apelidosDashboard.length; i++) {
        if (usuariosTentativas.indexOf(i + 1) != -1) {
            participantes++;
        }
    }

    for (let i = 0; i < personagensUsuarios.length; i++) {
        escolhasPersonagens[personagensUsuarios[i] - 1]++;
    }

    for (let i = 0; i < jogosFavoritosDashboard.length; i++) {
        favoritosPorJogo[jogosFavoritosDashboard[i] - 1]++;
    }

    for (let i = 0; i < acertosTentativas.length; i++) {
        tentativasPorAcertos[acertosTentativas[i]]++;
        if (acertosTentativas[i] >= 3) {
            quantidadeVerde++;
        } else if (acertosTentativas[i] == 2) {
            quantidadeLaranja++;
        } else {
            quantidadeVermelha++;
        }
    }

    if (apelidosDashboard.length > 0) {
        porcentagemParticipacao = participantes / apelidosDashboard.length * 100;
    }

    divTotalUsuarios.innerHTML = apelidosDashboard.length;
    divTotalFavoritos.innerHTML = jogosFavoritosDashboard.length;
    divTotalTentativas.innerHTML = acertosTentativas.length;
    divParticipantes.innerHTML = participantes;
    divParticipacao.innerHTML = porcentagemParticipacao.toFixed(0) + '% dos usuários';
    divFavoritosSinfonia.innerHTML = favoritosPorJogo[0];
    divFavoritosCirculo.innerHTML = favoritosPorJogo[1];
    divFavoritosHarmonia.innerHTML = favoritosPorJogo[2];
    divFavoritosAria.innerHTML = favoritosPorJogo[3];
    divQuizVerde.innerHTML = quantidadeVerde;
    divQuizLaranja.innerHTML = quantidadeLaranja;
    divQuizVermelha.innerHTML = quantidadeVermelha;

    if (jogosFavoritosDashboard.length == 0) {
        divNotaFavoritos.innerHTML = 'Nenhum favorito registrado.';
    }
    if (acertosTentativas.length == 0) {
        divNotaQuiz.innerHTML = 'Nenhuma tentativa registrada.';
    }
}

carregarDashboard();

Chart.defaults.color = '#bcaeb4';
Chart.defaults.font.family = 'Arial, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.animation = false;

new Chart(graficoPersonagens, {
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

new Chart(graficoFavoritos, {
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

new Chart(graficoQuiz, {
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
