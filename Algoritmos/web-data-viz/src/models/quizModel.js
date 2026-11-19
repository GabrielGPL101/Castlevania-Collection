var database = require("../database/config");
var mysql = require("mysql2");

function registrar(idUsuario, acertos) {
    var instrucaoSql = `
        INSERT INTO resultadoQuiz (acertos, fkUsuario) VALUES (${mysql.escape(acertos)}, ${mysql.escape(idUsuario)});
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar
};
