var database = require("../database/config")

function perguntaMaisAcertada() {
    var instrucaoSql = `
    SELECT 
    CASE 
        WHEN SUM(pergunta1) >= SUM(pergunta2) AND SUM(pergunta1) >= SUM(pergunta3) AND SUM(pergunta1) >= SUM(pergunta4) AND SUM(pergunta1) >= SUM(pergunta5) AND SUM(pergunta1) >= SUM(pergunta6) THEN 1
        WHEN SUM(pergunta2) >= SUM(pergunta3) AND SUM(pergunta2) >= SUM(pergunta4) AND SUM(pergunta2) >= SUM(pergunta5) AND SUM(pergunta2) >= SUM(pergunta6) THEN 2
        WHEN SUM(pergunta3) >= SUM(pergunta4) AND SUM(pergunta3) >= SUM(pergunta5) AND SUM(pergunta3) >= SUM(pergunta6) THEN 3
        WHEN SUM(pergunta4) >= SUM(pergunta5) AND SUM(pergunta4) >= SUM(pergunta6) THEN 4
        WHEN SUM(pergunta5) >= SUM(pergunta6) THEN 5
        ELSE 6
    END AS questao_mais_acertada,
    CASE 
        WHEN SUM(pergunta1) <= SUM(pergunta2) AND SUM(pergunta1) <= SUM(pergunta3) AND SUM(pergunta1) <= SUM(pergunta4) AND SUM(pergunta1) <= SUM(pergunta5) AND SUM(pergunta1) <= SUM(pergunta6) THEN 1
        WHEN SUM(pergunta2) <= SUM(pergunta3) AND SUM(pergunta2) <= SUM(pergunta4) AND SUM(pergunta2) <= SUM(pergunta5) AND SUM(pergunta2) <= SUM(pergunta6) THEN 2
        WHEN SUM(pergunta3) <= SUM(pergunta4) AND SUM(pergunta3) <= SUM(pergunta5) AND SUM(pergunta3) <= SUM(pergunta6) THEN 3
        WHEN SUM(pergunta4) <= SUM(pergunta5) AND SUM(pergunta4) <= SUM(pergunta6) THEN 4
        WHEN SUM(pergunta5) <= SUM(pergunta6) THEN 5
        ELSE 6
    END AS questao_menos_acertada
FROM (
    SELECT 
        SUM(pergunta1) AS pergunta1,
        SUM(pergunta2) AS pergunta2,
        SUM(pergunta3) AS pergunta3,
        SUM(pergunta4) AS pergunta4,
        SUM(pergunta5) AS pergunta5,
        SUM(pergunta6) AS pergunta6
    FROM quiz
) subconsulta;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function gabaritaram() {
    var instrucaoSql = `
   SELECT COUNT(*) AS total_pessoas_acertaram_tudo
FROM quiz
WHERE totalAcertos = 6
AND pergunta1 = 1
AND pergunta2 = 1
AND pergunta3 = 1
AND pergunta4 = 1
AND pergunta5 = 1
AND pergunta6 = 1;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function grafico() {
    var instrucaoSql = `
SELECT 'pergunta1' AS pergunta, COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram
FROM quiz
WHERE pergunta1 = 1
UNION ALL
SELECT 'pergunta2' AS pergunta, COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram
FROM quiz
WHERE pergunta2 = 1
UNION ALL
SELECT 'pergunta3' AS pergunta, COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram
FROM quiz
WHERE pergunta3 = 1
UNION ALL
SELECT 'pergunta4' AS pergunta, COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram
FROM quiz
WHERE pergunta4 = 1
UNION ALL
SELECT 'pergunta5' AS pergunta, COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram
FROM quiz
WHERE pergunta5 = 1
UNION ALL
SELECT 'pergunta6' AS pergunta, COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram
FROM quiz
WHERE pergunta6 = 1;
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}


function ranking(){
    var instrucaoSql = `
SELECT
    (SELECT aimlab.velocidadeConclusao FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1) AS tempo1,
    (SELECT usuario.nome FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1) AS nome1,
    (SELECT aimlab.ranking FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1) AS rank1,
    (SELECT aimlab.velocidadeConclusao FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1 OFFSET 1) AS tempo2,
    (SELECT usuario.nome FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1 OFFSET 1) AS nome2,
    (SELECT aimlab.ranking FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1 OFFSET 1) AS rank2,
    (SELECT aimlab.velocidadeConclusao FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1 OFFSET 2) AS tempo3,
    (SELECT usuario.nome FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1 OFFSET 2) AS nome3,
    (SELECT aimlab.ranking FROM aimlab JOIN usuario ON fkUsuario = idUsuario ORDER BY aimlab.velocidadeConclusao ASC LIMIT 1 OFFSET 2) AS rank3;
`;
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}



module.exports = {
    perguntaMaisAcertada, gabaritaram, grafico, ranking
};

