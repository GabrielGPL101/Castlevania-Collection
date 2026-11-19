let jogosFavoritos = [0, 0, 0, 0];
let nomesJogos = ['Symphony of the Night', 'Circle of the Moon', 'Harmony of Dissonance', 'Aria of Sorrow'];
let favoritosAberto = false;
let favoritoOcupado = false;

function mostrarBotoesFavoritos() {
    let locais = [localEstrela0, localEstrela1, localEstrela2, localEstrela3];
    for (let i = 0; i < locais.length; i++) {
        locais[i].innerHTML = '<button class="estrelaFavorito" id="estrelaJogo' + i + '" type="button" onclick="alternarFavorito(' + i + ')" aria-label="Favoritar ou desfavoritar ' + nomesJogos[i] + '">☆</button>';
    }
}

function carregarFavoritos() {
    if (idUsuario > 0) {
        favoritoOcupado = true;
        fetch('/favoritos/listar', {method: 'GET', headers: {Authorization: sessionStorage.CHAVE_SESSAO}})
            .then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(function (favoritos) {
                        jogosFavoritos = [0, 0, 0, 0];
                        for (let i = 0; i < favoritos.length; i++) {
                            let indiceJogo = Number(favoritos[i].fkJogo) - 1;
                            if (indiceJogo >= 0 && indiceJogo < 4) {
                                jogosFavoritos[indiceJogo] = 1;
                            }
                        }
                        favoritoOcupado = false;
                        atualizarEstrelas();
                        if (favoritosAberto == true) {
                            abrirFavoritos();
                        }
                    }).catch(function () {
                        favoritoOcupado = false;
                        mostrarMensagemFavoritos('Não foi possível ler a lista de favoritos.');
                    });
                } else {
                    favoritoOcupado = false;
                    mostrarMensagemFavoritos('Não foi possível consultar os favoritos. Confira a conexão com o banco.');
                }
            }).catch(function () {
                favoritoOcupado = false;
                mostrarMensagemFavoritos('Não foi possível acessar a API. Confira se o servidor está iniciado.');
            });
    }
}

function atualizarEstrelas() {
    let estrelas = [estrelaJogo0, estrelaJogo1, estrelaJogo2, estrelaJogo3];
    for (let i = 0; i < jogosFavoritos.length; i++) {
        if (jogosFavoritos[i] == 1) {
            estrelas[i].innerHTML = '★';
        } else {
            estrelas[i].innerHTML = '☆';
        }
    }
}

function alternarFavorito(indiceJogo) {
    if (idUsuario == 0) {
        mostrarMensagemFavoritos('Entre na sua conta para salvar seus favoritos. <a href="login.html">Ir para o login</a>');
    } else if (favoritoOcupado == true) {
        mostrarMensagemFavoritos('Aguarde a atualização dos favoritos.');
    } else {
        favoritoOcupado = true;
        let idJogo = indiceJogo + 1;
        let endereco = '/favoritos/cadastrar';
        let metodo = 'POST';
        if (jogosFavoritos[indiceJogo] == 1) {
            endereco = '/favoritos/remover/' + idJogo;
            metodo = 'DELETE';
        }
        fetch(endereco, {
            method: metodo,
            headers: {'Content-Type': 'application/json', Authorization: sessionStorage.CHAVE_SESSAO},
            body: JSON.stringify({jogoServer: idJogo})
        }).then(function (resposta) {
            if (resposta.ok) {
                carregarFavoritos();
            } else {
                favoritoOcupado = false;
                mostrarMensagemFavoritos('Não foi possível atualizar o favorito. Tente novamente.');
            }
        }).catch(function () {
            favoritoOcupado = false;
            mostrarMensagemFavoritos('Não foi possível acessar a API. Confira se o servidor está iniciado.');
        });
    }
}

function abrirFavoritos() {
    if (idUsuario == 0) {
        mostrarMensagemFavoritos('Entre na sua conta para ver seus favoritos. <a href="login.html">Ir para o login</a>');
    } else {
        favoritosAberto = true;
        let listaFavoritos = '';
        for (let i = 0; i < jogosFavoritos.length; i++) {
            if (jogosFavoritos[i] == 1) {
                listaFavoritos += '<p class="itemFavorito">★ ' + nomesJogos[i] + ' <button class="removerFavorito" type="button" onclick="alternarFavorito(' + i + ')">Remover</button></p>';
            }
        }
        if (favoritoOcupado == true) {
            listaFavoritos = '<p class="descricaoFormulario">Carregando favoritos...</p>';
        } else if (listaFavoritos == '') {
            listaFavoritos = '<p class="descricaoFormulario">Você ainda não favoritou nenhum jogo. Clique na estrela ao lado do nome de um jogo.</p>';
        }
        divFavoritos.innerHTML = '<div class="fundoFavoritos"><div class="painel painelFavoritos"><p class="destaque">SUA COLEÇÃO</p><h2>Meus favoritos</h2>' + listaFavoritos + '<button class="botao" type="button" onclick="fecharFavoritos()">Fechar</button></div></div>';
    }
}

function mostrarMensagemFavoritos(mensagem) {
    favoritosAberto = true;
    divFavoritos.innerHTML = '<div class="fundoFavoritos"><div class="painel painelFavoritos"><h2>Favoritos</h2><p class="descricaoFormulario">' + mensagem + '</p><button class="botao" type="button" onclick="fecharFavoritos()">Fechar</button></div></div>';
}

function fecharFavoritos() {
    favoritosAberto = false;
    divFavoritos.innerHTML = '';
}
