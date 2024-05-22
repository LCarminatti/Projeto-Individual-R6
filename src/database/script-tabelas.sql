create database individual_pi;
use individual_pi;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(45) unique, constraint chkEmail check (email like("%@%")),
senha varchar(45));

