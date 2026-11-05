let jogosFavoritos = [0, 0, 0, 0];
let nomesJogos = ['Symphony of the Night', 'Circle of the Moon', 'Harmony of Dissonance', 'Aria of Sorrow'];
let favoritosAberto = false;

function alternarFavorito(indiceJogo) {
    if (jogosFavoritos[indiceJogo] == 0) {
        jogosFavoritos[indiceJogo] = 1;
    } else {
        jogosFavoritos[indiceJogo] = 0;
    }

    let estrela = '☆';
    if (jogosFavoritos[indiceJogo] == 1) {
        estrela = '★';
    }

    if (indiceJogo == 0) {
        estrelaJogo0.innerHTML = estrela;
    } else if (indiceJogo == 1) {
        estrelaJogo1.innerHTML = estrela;
    } else if (indiceJogo == 2) {
        estrelaJogo2.innerHTML = estrela;
    } else {
        estrelaJogo3.innerHTML = estrela;
    }

    if (favoritosAberto == true) {
        abrirFavoritos();
    }
}

function abrirFavoritos() {
    favoritosAberto = true;
    let quantidadeFavoritos = 0;
    let listaFavoritos = '';

    for (let i = 0; i < jogosFavoritos.length; i++) {
        if (jogosFavoritos[i] == 1) {
            quantidadeFavoritos++;
            listaFavoritos += '<p class="itemFavorito">★ ' + nomesJogos[i] + ' <button class="removerFavorito" type="button" onclick="alternarFavorito(' + i + ')">Remover</button></p>';
        }
    }

    if (quantidadeFavoritos == 0) {
        listaFavoritos = '<p class="descricaoFormulario">Você ainda não favoritou nenhum jogo. Clique na estrela ao lado do nome de um jogo.</p>';
    }

    divFavoritos.innerHTML = '<div class="fundoFavoritos"><div class="painel painelFavoritos"><p class="destaque">SUA COLEÇÃO</p><h2>Meus favoritos</h2>' + listaFavoritos + '<button class="botao" type="button" onclick="fecharFavoritos()">Fechar</button></div></div>';
}

function fecharFavoritos() {
    favoritosAberto = false;
    divFavoritos.innerHTML = '';
}
