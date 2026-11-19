var database = require("../database/config");

function buscarResumo() {
    var instrucaoSql = `
        SELECT (SELECT COUNT(*) FROM usuario) AS totalUsuarios,
        (SELECT COUNT(*) FROM favorito) AS totalFavoritos,
        (SELECT COUNT(*) FROM resultadoQuiz) AS totalTentativas,
        (SELECT COUNT(DISTINCT fkUsuario) FROM resultadoQuiz) AS participantes;
    `;
    return database.executar(instrucaoSql);
}

function buscarPersonagens() {
    var instrucaoSql = `
        SELECT p.idPersonagem, p.nome, COUNT(u.idUsuario) AS quantidade
        FROM personagem p
        LEFT JOIN usuario u ON u.fkPersonagem = p.idPersonagem
        GROUP BY p.idPersonagem, p.nome
        ORDER BY p.idPersonagem;
    `;
    return database.executar(instrucaoSql);
}

function buscarFavoritos() {
    var instrucaoSql = `
        SELECT j.idJogo, j.nome, COUNT(f.fkUsuario) AS quantidade
        FROM jogo j
        LEFT JOIN favorito f ON f.fkJogo = j.idJogo
        GROUP BY j.idJogo, j.nome
        ORDER BY j.idJogo;
    `;
    return database.executar(instrucaoSql);
}

function buscarQuiz() {
    var instrucaoSql = `
        SELECT acertos, COUNT(*) AS quantidade
        FROM resultadoQuiz
        GROUP BY acertos
        ORDER BY acertos;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarResumo,
    buscarPersonagens,
    buscarFavoritos,
    buscarQuiz
};
