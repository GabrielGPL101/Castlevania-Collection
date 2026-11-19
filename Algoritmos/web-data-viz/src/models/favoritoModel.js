var database = require("../database/config");
var mysql = require("mysql2");

function listar(idUsuario) {
    var instrucaoSql = `
        SELECT fkJogo FROM favorito WHERE fkUsuario = ${mysql.escape(idUsuario)} ORDER BY fkJogo;
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(idUsuario, idJogo) {
    var instrucaoSql = `
        INSERT INTO favorito (fkUsuario, fkJogo) VALUES (${mysql.escape(idUsuario)}, ${mysql.escape(idJogo)});
    `;
    return database.executar(instrucaoSql);
}

function remover(idUsuario, idJogo) {
    var instrucaoSql = `
        DELETE FROM favorito WHERE fkUsuario = ${mysql.escape(idUsuario)} AND fkJogo = ${mysql.escape(idJogo)};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    remover
};
