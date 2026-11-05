CREATE DATABASE castlevaniaCollection;
USE castlevaniaCollection;


CREATE TABLE jogo (
idJogo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL UNIQUE,
plataforma VARCHAR(45) NOT NULL
);

CREATE TABLE personagem (
idPersonagem INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
imagem VARCHAR(255) NOT NULL,
fkJogo INT NOT NULL UNIQUE,
FOREIGN KEY (fkJogo) REFERENCES jogo(idJogo)
);

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nickname VARCHAR(100) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
fkPersonagem INT NOT NULL,
FOREIGN KEY (fkPersonagem) REFERENCES personagem(idPersonagem)
);

CREATE TABLE favorito (
fkUsuario INT NOT NULL,
fkJogo INT NOT NULL,
PRIMARY KEY (fkUsuario, fkJogo),
FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
FOREIGN KEY (fkJogo) REFERENCES jogo(idJogo)
);


INSERT INTO jogo (nome, plataforma) VALUES
('Symphony of the Night', 'PlayStation 1'),
('Circle of the Moon', 'Game Boy Advance'),
('Harmony of Dissonance', 'Game Boy Advance'),
('Aria of Sorrow', 'Game Boy Advance');

INSERT INTO personagem (nome, imagem, fkJogo) VALUES
('Alucard', 'imagens/alucard.png', 1),
('Nathan Graves', 'imagens/nathan.png', 2),
('Juste Belmont', 'imagens/juste.png', 3),
('Soma Cruz', 'imagens/soma.png', 4);

INSERT INTO usuario (nickname, email, senha, fkPersonagem) VALUES
('Cacador01', 'cacador01@example.com', 'Teste123!', 1),
('Belmont02', 'belmont02@example.com', 'Teste456!', 3),
('Explorador03', 'explorador03@example.com', 'Teste789!', 1),
('Soma04', 'soma04@example.com', 'Teste012!', 4);

INSERT INTO favorito (fkUsuario, fkJogo) VALUES
(1, 4),
(1, 1),
(2, 3),
(3, 1),
(3, 2);

DESC jogo;
DESC personagem;
DESC usuario;
DESC favorito;

SHOW CREATE TABLE personagem;
SHOW CREATE TABLE usuario;
SHOW CREATE TABLE favorito;

SELECT * FROM jogo;
SELECT * FROM personagem;
SELECT * FROM usuario;
SELECT * FROM favorito;

SELECT p.nome AS 'Personagem', j.nome AS 'Jogo', p.imagem AS 'Caminho da imagem'
FROM personagem p
JOIN jogo j ON p.fkJogo = j.idJogo;

SELECT u.nickname AS 'Usuario', p.nome AS 'Personagem', p.imagem AS 'Icone'
FROM usuario u
JOIN personagem p ON u.fkPersonagem = p.idPersonagem
ORDER BY u.idUsuario;

SELECT u.nickname AS 'Usuario', j.nome AS 'Jogo favorito'
FROM usuario u
JOIN favorito f ON f.fkUsuario = u.idUsuario
JOIN jogo j ON f.fkJogo = j.idJogo
WHERE u.idUsuario = 1
ORDER BY j.nome;

SELECT u.nickname AS 'Usuario', COUNT(f.fkJogo) AS 'Jogos favoritados'
FROM usuario u
LEFT JOIN favorito f ON f.fkUsuario = u.idUsuario
GROUP BY u.idUsuario, u.nickname
ORDER BY u.idUsuario;

SELECT u.nickname AS 'Usuario', u.email AS 'Email'
FROM usuario u
LEFT JOIN favorito f ON f.fkUsuario = u.idUsuario
WHERE f.fkUsuario IS NULL;

SELECT j.nome AS 'Jogo', COUNT(f.fkUsuario) AS 'Quantidade de favoritos'
FROM jogo j
LEFT JOIN favorito f ON f.fkJogo = j.idJogo
GROUP BY j.idJogo, j.nome
ORDER BY COUNT(f.fkUsuario) DESC, j.nome;
