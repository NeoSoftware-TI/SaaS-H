-- Selecionando o banco de dados
USE saudenam_Clinica;

-- Excluindo a tabela prontuario caso já exista
DROP TABLE IF EXISTS prontuario;

-- ---------------------------------------------------------------------- PERMISSÕES - Níveis de permissões da Empresa.
CREATE TABLE IF NOT EXISTS permissao (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('Cliente', 'Medico', 'Sub-Admin', 'Admin') NOT NULL UNIQUE
);

-- Inserindo os níveis de permissão, evitando duplicatas
INSERT IGNORE INTO permissao (nivel) VALUES 
    ('Cliente'), 
    ('Medico'), 
    ('Sub-Admin'), 
    ('Admin');

-- ---------------------------------------------------------------------- ADMIN - Onde todos irão estar registrados.
CREATE TABLE IF NOT EXISTS admin (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- SUB-ADMIN - Onde todos irão estar registrados.
CREATE TABLE IF NOT EXISTS subadmin (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- MÉDICOS - Onde vão estar registrados.
CREATE TABLE IF NOT EXISTS medico (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- CLIENTES - Onde vão estar registrados.
CREATE TABLE IF NOT EXISTS cliente (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    clinica_nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- AGENDAMENTOS - Onde as Consultas vão permanecer.
CREATE TABLE IF NOT EXISTS agendamento (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    clinica_nome VARCHAR(255) NOT NULL,
    data_consulta DATE NOT NULL,
    horario TIME NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    UNIQUE (medico_id, data_consulta, horario)
);

-- ---------------------------------------------------------------------- PRONTUÁRIO - dos Clientes.
CREATE TABLE IF NOT EXISTS prontuario (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exame_realizado TEXT NOT NULL,
    diagnostico TEXT,
    descricao_do_resultado TEXT,
    medicamentos_prescritos TEXT,
    fumante ENUM('Sim', 'Não') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- CLÍNICAS - Tabelas representando as unidades.
CREATE TABLE IF NOT EXISTS clinica_serenity (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    subadmin_id INTEGER NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    FOREIGN KEY (subadmin_id) REFERENCES subadmin(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clinica_innovatehealth (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    subadmin_id INTEGER NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    FOREIGN KEY (subadmin_id) REFERENCES subadmin(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clinica_qualitycare (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    subadmin_id INTEGER NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    FOREIGN KEY (subadmin_id) REFERENCES subadmin(id) ON DELETE CASCADE
);
