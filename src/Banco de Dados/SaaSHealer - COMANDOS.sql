-- Selecionando o banco de dados
USE saudenam_Clinica;

-- Desabilitando as verificações de chaves estrangeiras para dropar as tabelas sem erros
SET FOREIGN_KEY_CHECKS = 0;

-- Dropar as tabelas existentes na ordem inversa de dependência
DROP TABLE IF EXISTS clinica_qualitycare;
DROP TABLE IF EXISTS clinica_innovatehealth;
DROP TABLE IF EXISTS clinica_serenity;
DROP TABLE IF EXISTS prontuario;
DROP TABLE IF EXISTS agendamento;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS medico;
DROP TABLE IF EXISTS subadmin;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS permissao;

-- Reabilitando as verificações de chaves estrangeiras
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------
-- PERMISSÕES - Níveis de permissões da Empresa.
CREATE TABLE permissao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('Cliente', 'Medico', 'Sub-Admin', 'Admin') NOT NULL UNIQUE
);

-- Inserindo os níveis de permissão, evitando duplicatas
INSERT IGNORE INTO permissao (nivel) VALUES 
    ('Cliente'), 
    ('Medico'), 
    ('Sub-Admin'), 
    ('Admin');

-- ----------------------------------------------------------------------
-- ADMIN - Onde todos irão estar registrados.
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------
-- SUB-ADMIN - Onde todos irão estar registrados.
CREATE TABLE subadmin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------
-- MÉDICOS - Onde vão estar registrados.
CREATE TABLE medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------
-- CLIENTES - Onde vão estar registrados.
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------
-- AGENDAMENTOS - Onde as Consultas vão permanecer.
CREATE TABLE agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    medico_id INT NOT NULL,
    clinica_nome VARCHAR(255) NOT NULL,
    data_consulta DATE NOT NULL,
    horario TIME NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    UNIQUE (medico_id, data_consulta, horario)
);

-- ----------------------------------------------------------------------
-- PRONTUÁRIO - dos Clientes.
CREATE TABLE prontuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    medico_id INT NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exame_realizado TEXT NOT NULL,
    diagnostico TEXT,
    descricao_do_resultado TEXT,
    medicamentos_prescritos TEXT,
    fumante ENUM('Sim', 'Não') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------
-- CLÍNICAS - Tabelas representando as unidades.
CREATE TABLE clinica_serenity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    medico_id INT NOT NULL,
    subadmin_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    FOREIGN KEY (subadmin_id) REFERENCES subadmin(id) ON DELETE CASCADE
);

CREATE TABLE clinica_innovatehealth (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    medico_id INT NOT NULL,
    subadmin_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    FOREIGN KEY (subadmin_id) REFERENCES subadmin(id) ON DELETE CASCADE
);

CREATE TABLE clinica_qualitycare (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    medico_id INT NOT NULL,
    subadmin_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    FOREIGN KEY (subadmin_id) REFERENCES subadmin(id) ON DELETE CASCADE
);
