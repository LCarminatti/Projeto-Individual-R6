var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function enviarQuiz(totalAcertosVar, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", totalAcertosVar, idUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO quiz ( totalAcertos, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, fkUsuario) VALUES ('${totalAcertosVar}','${pergunta1}','${pergunta2}','${pergunta3}','${pergunta4}','${pergunta5}','${pergunta6}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviarQuiz
};