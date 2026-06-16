DROP TABLE IF EXISTS cidade, estado;

CREATE TABLE estado (
    sigla_estado CHAR(2) PRIMARY KEY,
    nome_estado VARCHAR(255)
);
CREATE TABLE cidade (
    id_cidade SERIAL PRIMARY KEY,
    nome_cidade VARCHAR(255),
    sigla_estado CHAR(2),
    FOREIGN KEY (sigla_estado) REFERENCES estado(sigla_estado)
);

INSERT INTO estado (sigla_estado, nome_estado) VALUES ('PR', 'Paraná'), ('SP', 'São Paulo');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Terra Boa', 'PR'), ('Campo Mourão', 'PR'), ('São Paulo', 'SP');