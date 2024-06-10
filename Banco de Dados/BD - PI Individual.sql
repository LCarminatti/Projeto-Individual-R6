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


create table aimlab (
idAimlab int auto_increment,
fkUsuario int,
constraint pkComposta primary key(idAimlab, fkUsuario),
velocidadeConclusao int,
ranking varchar(45),
totalPontos int,
constraint fkAimlabUsuario foreign key (fkUsuario) references usuario (idUsuario));







