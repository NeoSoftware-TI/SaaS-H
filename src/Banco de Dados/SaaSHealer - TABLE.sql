USE saudenam_Clinica;

-- Removendo tabelas de clínicas físicas
DROP TABLE IF EXISTS clinica_serenity, clinica_innovatehealth, clinica_qualitycare;

-- ---------------------------------------------------------------------- PERMISSÕES
CREATE TABLE IF NOT EXISTS permissao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('Cliente', 'Medico', 'Sub-Admin', 'Admin') NOT NULL UNIQUE
);

INSERT IGNORE INTO permissao (nivel) VALUES 
    ('Cliente'), 
    ('Medico'), 
    ('Sub-Admin'), 
    ('Admin');

-- ---------------------------------------------------------------------- ADMIN
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- SUB-ADMIN
CREATE TABLE IF NOT EXISTS subadmin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('M', 'F', 'N') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- MÉDICOS
CREATE TABLE IF NOT EXISTS medico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    crm VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('M', 'F', 'N') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- CLIENTES
CREATE TABLE IF NOT EXISTS cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('M', 'F', 'N') NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------- AGENDAMENTOS
CREATE TABLE IF NOT EXISTS agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    medico_id INT NOT NULL,
    data_agendamento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_consulta DATE NOT NULL,
    horario TIME NOT NULL,
    status ENUM('agendado', 'realizado', 'cancelado') DEFAULT 'agendado',
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE,
    UNIQUE (medico_id, data_consulta, horario)
);

-- ---------------------------------------------------------------------- PRONTUÁRIOS
CREATE TABLE IF NOT EXISTS prontuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    medico_id INT NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    diagnostico TEXT NOT NULL,
    prescricao TEXT,
    observacoes TEXT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medico(id) ON DELETE CASCADE
);
