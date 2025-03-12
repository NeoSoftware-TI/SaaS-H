create database Clinica;

use Clinica;

DROP TABLE prontuario; -- Tabelas:  permissao, agendamento, prontuario, cliente, medico, admin, subadmin, `Clínica Serenity`, `Clínica InnovateHealth`, `Clínica QualityCare`;

-- ------------------------------------------------------------------------------------------------------------------------------------- TABELAS - Armazenamento dos Dados

-- ---------------------------------------------------------------------- PERMISSÕES - Niveis de permissões da Empresa.
CREATE TABLE IF NOT EXISTS permissao (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('Cliente', 'Medico', 'Sub-Admin', 'Admin') NOT NULL UNIQUE
);

-- ---------------------------------------------------------------------- ADMIN - Onde todos irão estar registrados.
CREATE TABLE IF NOT EXISTS admin (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE RESTRICT
);

-- ---------------------------------------------------------------------- SUB-ADMIN - Onde todos irão estar registrados.
CREATE TABLE IF NOT EXISTS subadmin (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
	sexo ENUM('Masculino', 'Feminino') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE RESTRICT
);

-- ---------------------------------------------------------------------- MÉDICOS - Onde vão estar registrados.
CREATE TABLE IF NOT EXISTS medico (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
	sexo ENUM('Masculino', 'Feminino') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
	especialidade VARCHAR(255) NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE RESTRICT
);

-- ---------------------------------------------------------------------- CLIENTES - Onde vão estar registrados.
CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
	sexo ENUM('Masculino', 'Feminino') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE RESTRICT
);

-- ---------------------------------------------------------------------- AGENDAMENTOS - Onde as Consultas vão permanecer.
CREATE TABLE IF NOT EXISTS agendamento (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    clinica_nome VARCHAR(255) NOT NULL,
    data_consulta DATE NOT NULL,
    horario TIME NOT NULL,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    UNIQUE (medico_id, data_consulta, horario)
);

-- ---------------------------------------------------------------------- PRONTUARIO - dos Clientes.
CREATE TABLE IF NOT EXISTS prontuario (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exame_realizado TEXT NOT NULL,
    diagnostico TEXT,
    descriçao_do_resultado TEXT,
    medicamentos_prescritos TEXT,
    fumante ENUM('Sim', 'Não') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- CLINICAS.

CREATE TABLE IF NOT EXISTS `Clínica Serenity` (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    subadmin_id INTEGER NOT NULL,
	agendamento_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS `Clínica InnovateHealth` (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    subadmin_id INTEGER NOT NULL,
	agendamento_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS `Clínica QualityCare` (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    subadmin_id INTEGER NOT NULL,
	agendamento_id INTEGER NOT NULL
);