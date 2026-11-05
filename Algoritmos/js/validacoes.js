let personagemEscolhido = '';

function validarCadastro() {
    let apelido = iptApelido.value;
    let email = iptEmail.value.trim();
    let senha = iptSenha.value;
    let posicaoArroba = email.indexOf('@');
    let posicaoPonto = email.indexOf('.', posicaoArroba + 1);
    let confirmacao = iptConfirmacao.value;
    let caracteresInvalidos = 0;
    let caracteresPermitidos = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '_'
    ];

    if (personagemEscolhido == '') {
        divMensagem.innerHTML = 'Escolha um personagem antes de continuar.';
    } else if (apelido.trim() == '' || email == '' || senha.trim() == '' || confirmacao.trim() == '') {
        divMensagem.innerHTML = 'Preencha todos os campos.';
    } else if (apelido.length < 3 || apelido.length > 100) {
        divMensagem.innerHTML = 'O apelido deve ter entre 3 e 100 caracteres.';
    } else {
        for (let i = 0; i < apelido.length; i++) {
            if (caracteresPermitidos.indexOf(apelido[i]) == -1) {
                caracteresInvalidos++;
            }
        }

        if (caracteresInvalidos > 0) {
            divMensagem.innerHTML = 'Use apenas letras sem acento, números e sublinhado no apelido.';
        } else if (posicaoArroba <= 0 || email.indexOf('@', posicaoArroba + 1) != -1 || posicaoPonto <= posicaoArroba + 1 || posicaoPonto >= email.length - 1 || email[0] == '.' || email[posicaoArroba - 1] == '.' || email[email.length - 1] == '.' || email.includes(' ') || email.includes('..') || email.includes('\t') || email.includes('\n')) {
            divMensagem.innerHTML = 'Informe um e-mail válido, como nome@exemplo.com.';
        } else if (senha.length < 8) {
            divMensagem.innerHTML = 'A senha deve ter pelo menos 8 caracteres.';
        } else if (senha != confirmacao) {
            divMensagem.innerHTML = 'A senha e a confirmação devem ser iguais.';
        } else {
            divMensagem.innerHTML = 'Campos preenchidos corretamente.';
        }
    }
}

function validarLogin() {
    let email = iptEmail.value.trim();
    let senha = iptSenha.value;
    let posicaoArroba = email.indexOf('@');
    let posicaoPonto = email.indexOf('.', posicaoArroba + 1);

    if (email == '' || senha.trim() == '') {
        divMensagem.innerHTML = 'Preencha o e-mail e a senha.';
    } else if (posicaoArroba <= 0 || email.indexOf('@', posicaoArroba + 1) != -1 || posicaoPonto <= posicaoArroba + 1 || posicaoPonto >= email.length - 1 || email[0] == '.' || email[posicaoArroba - 1] == '.' || email[email.length - 1] == '.' || email.includes(' ') || email.includes('..') || email.includes('\t') || email.includes('\n')) {
        divMensagem.innerHTML = 'Informe um e-mail válido, como nome@exemplo.com.';
    } else {
        divMensagem.innerHTML = 'Campos preenchidos corretamente.';
    }
}
