create database individual_pi;
use individual_pi;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(45) unique, constraint chkEmail check (email like("%@%")),
senha varchar(45));

create table quiz (
idQuiz int primary key auto_increment,
totalAcertos int,
pergunta1 int,
pergunta2 int,
pergunta3 int,
pergunta4 int,
pergunta5 int,
pergunta6 int,
fkUsuario int,
constraint fkUsuarioQuiz foreign key (fkUsuario) references usuario(idUsuario));

-- Inserindo dados na tabela usuario
INSERT INTO usuario (nome, email, senha) VALUES
('João Silva', 'joao@example.com', 'senha123'),
('Maria Santos', 'maria@example.com', 'senha456'),
('Pedro Oliveira', 'pedro@example.com', 'senha789');

-- Inserindo dados na tabela quiz
INSERT INTO quiz (totalAcertos, pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, fkUsuario) VALUES
(4, 1, 0, 1, 1, 0, 1, 1),
(2, 1, 0, 0, 1, 0, 0, 2),
(6, 1, 1, 1, 1, 1, 1, 3),
(4, 1, 1, 1, 0, 0, 1, 3);


-- SELECIONAR QUANTAS PESSOAS ACERTARAM AS 6 QUESTOES
SELECT COUNT(*) AS total_pessoas_acertaram_tudo
FROM quiz
WHERE totalAcertos = 6
AND pergunta1 = 1
AND pergunta2 = 1
AND pergunta3 = 1
AND pergunta4 = 1
AND pergunta5 = 1
AND pergunta6 = 1;


-- SELECIONAR QUANTAS PESSOAS ACERTARAM CADA QUESTAO
SELECT COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram_questao1
FROM quiz
WHERE pergunta1 = 1;

SELECT COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram_questao2
FROM quiz
WHERE pergunta2 = 1;

SELECT COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram_questao3
FROM quiz
WHERE pergunta3 = 1;

SELECT COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram_questao4
FROM quiz
WHERE pergunta4 = 1;

SELECT COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram_questao5
FROM quiz
WHERE pergunta5 = 1;

SELECT COUNT(DISTINCT fkUsuario) AS total_pessoas_acertaram_questao6
FROM quiz
WHERE pergunta6 = 1;



-- QUESTÃO QUE MAIS ACERTARAM
SELECT 
    CASE 
        WHEN SUM(pergunta1) >= SUM(pergunta2) AND SUM(pergunta1) >= SUM(pergunta3) AND SUM(pergunta1) >= SUM(pergunta4) AND SUM(pergunta1) >= SUM(pergunta5) AND SUM(pergunta1) >= SUM(pergunta6) THEN 1
        WHEN SUM(pergunta2) >= SUM(pergunta3) AND SUM(pergunta2) >= SUM(pergunta4) AND SUM(pergunta2) >= SUM(pergunta5) AND SUM(pergunta2) >= SUM(pergunta6) THEN 2
        WHEN SUM(pergunta3) >= SUM(pergunta4) AND SUM(pergunta3) >= SUM(pergunta5) AND SUM(pergunta3) >= SUM(pergunta6) THEN 3
        WHEN SUM(pergunta4) >= SUM(pergunta5) AND SUM(pergunta4) >= SUM(pergunta6) THEN 4
        WHEN SUM(pergunta5) >= SUM(pergunta6) THEN 5
        ELSE 6
    END AS questao_mais_acertada
FROM quiz;

-- QUESTÃO QUE MENOS ACERTARAM
SELECT 
    CASE 
        WHEN SUM(pergunta1) <= SUM(pergunta2) AND SUM(pergunta1) <= SUM(pergunta3) AND SUM(pergunta1) <= SUM(pergunta4) AND SUM(pergunta1) <= SUM(pergunta5) AND SUM(pergunta1) <= SUM(pergunta6) THEN 1
        WHEN SUM(pergunta2) <= SUM(pergunta3) AND SUM(pergunta2) <= SUM(pergunta4) AND SUM(pergunta2) <= SUM(pergunta5) AND SUM(pergunta2) <= SUM(pergunta6) THEN 2
        WHEN SUM(pergunta3) <= SUM(pergunta4) AND SUM(pergunta3) <= SUM(pergunta5) AND SUM(pergunta3) <= SUM(pergunta6) THEN 3
        WHEN SUM(pergunta4) <= SUM(pergunta5) AND SUM(pergunta4) <= SUM(pergunta6) THEN 4
        WHEN SUM(pergunta5) <= SUM(pergunta6) THEN 5
        ELSE 6
    END AS questao_menos_acertada
FROM quiz;




