let idUsuario = 0;
let imagensPersonagens = ['alucard.png', 'nathan.png', 'juste.png', 'soma.png'];

function carregarSessao(paginaInicial) {
    let chave = sessionStorage.CHAVE_SESSAO;

    if (chave) {
        fetch('/usuarios/sessao', {headers: {Authorization: chave}})
            .then(function (resposta) {
                if (resposta.ok) {
                    resposta.json().then(function (usuario) {
                        if (usuario.id > 0 && paginaInicial == 'visitante') {
                            window.location.replace('/index.html');
                        } else if (usuario.id > 0) {
                            mostrarMenuConectado(usuario, paginaInicial);
                        } else {
                            sessionStorage.removeItem('CHAVE_SESSAO');
                            mostrarVisitante(paginaInicial);
                        }
                    }).catch(function () {
                        mostrarErroSessao(paginaInicial);
                    });
                } else {
                    mostrarErroSessao(paginaInicial);
                }
            }).catch(function () {
                mostrarErroSessao(paginaInicial);
            });
    } else {
        mostrarVisitante(paginaInicial);
    }
}

function mostrarVisitante(paginaInicial) {
    if (paginaInicial == true) {
        opcoesMenu.innerHTML = '<a href="cadastro.html">Cadastro</a> <a href="login.html">Login</a>';
        botaoPersonagem.innerHTML = '<a class="botao" href="cadastro.html#personagens">Escolher personagem <span aria-hidden="true">→</span></a>';
    } else if (paginaInicial == false) {
        window.location.replace('/login.html');
    }
}

function mostrarErroSessao(paginaInicial) {
    if (paginaInicial != 'visitante') {
        nomeUsuario.innerHTML = 'Sessão indisponível';
    }
}

function mostrarMenuConectado(usuario, paginaInicial) {
    idUsuario = Number(usuario.id);
    mostrarUsuario(usuario);
    if (paginaInicial == true) {
        opcoesMenu.innerHTML = '<button class="botaoFavoritosMenu" type="button" onclick="abrirFavoritos()">Favoritos</button> '
            + '<a href="quiz.html">Quiz</a> <a href="dashboard.html">Dashboard</a>';
        mostrarBotoesFavoritos();
        carregarFavoritos();
    }
}

function mostrarUsuario(usuario) {
    let apelido = '';
    for (let i = 0; i < usuario.nome.length; i++) {
        let letra = usuario.nome[i];
        if (letra == '&') {
            apelido += '&amp;';
        } else if (letra == '<') {
            apelido += '&lt;';
        } else if (letra == '>') {
            apelido += '&gt;';
        } else {
            apelido += letra;
        }
    }
    nomeUsuario.innerHTML = apelido;

    let idPersonagem = Number(usuario.fkPersonagem);
    if (idPersonagem >= 1 && idPersonagem <= imagensPersonagens.length) {
        let imagem = imagensPersonagens[idPersonagem - 1];
        divIconeUsuario.innerHTML = '<img class="imagemIcone" src="imagens/' + imagem + '" alt="">';
    }

    localBotaoSair.innerHTML = '<button class="botaoSair" type="button" onclick="sair()">Sair</button>';
}

function sair() {
    fetch('/usuarios/sair', {method: 'POST', headers: {Authorization: sessionStorage.CHAVE_SESSAO}})
        .then(function (resposta) {
            if (resposta.ok) {
                sessionStorage.removeItem('CHAVE_SESSAO');
                window.location.replace('/index.html');
            } else {
                alert('Não foi possível sair. Tente novamente.');
            }
        }).catch(function () {
            alert('Não foi possível sair. Confira a conexão e tente novamente.');
        });
}

window.onpageshow = function (evento) {
    if (evento.persisted) {
        window.location.reload();
    }
};
