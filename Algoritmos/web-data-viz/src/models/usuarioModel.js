var database = require("../database/config");
var mysql = require("mysql2");

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT u.idUsuario, u.nickname, u.fkPersonagem
        FROM usuario u
        WHERE u.email = ${mysql.escape(email)} AND u.senha = ${mysql.escape(senha)};
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, fkPersonagem) {
    var instrucaoSql = `
        INSERT INTO usuario (nickname, email, senha, fkPersonagem)
        VALUES (${mysql.escape(nome)}, ${mysql.escape(email)}, ${mysql.escape(senha)}, ${mysql.escape(fkPersonagem)});
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};
