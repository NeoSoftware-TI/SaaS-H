-- Selecionando o banco de dados
USE saudenam_Clinica;

-- Desabilitando as verificações de chaves estrangeiras para dropar as tabelas sem erros
SET FOREIGN_KEY_CHECKS = 0;

-- Dropar as tabelas existentes na ordem inversa de dependência
DROP TABLE IF EXISTS clinica;
DROP TABLE IF EXISTS prontuario;
DROP TABLE IF EXISTS agendamento;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS permissao;

-- Reabilitando as verificações de chaves estrangeiras
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------
-- PERMISSÕES - Níveis de permissões da Empresa.
CREATE TABLE permissao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('Paciente', 'Medico', 'Subadmin', 'Admin') NOT NULL UNIQUE
);

-- Inserindo os níveis de permissão, evitando duplicatas
INSERT IGNORE INTO permissao (nivel) VALUES 
    ('Paciente'), 
    ('Medico'), 
    ('Subadmin'), 
    ('Admin');

-- ----------------------------------------------------------------------
-- USUÁRIOS - Tabela unificada para todos os usuários (Admin, Subadmin, Médico e Paciente)
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado'),
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    especialidade VARCHAR(255), -- Somente para médicos; poderá ser nulo para os demais
    clinica_nome VARCHAR(255),  -- Nome da clínica associada, se aplicável
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------
-- AGENDAMENTOS - Onde as consultas serão registradas.
CREATE TABLE agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    clinica VARCHAR(255) NOT NULL,
    data_consulta DATE NOT NULL,
    horario TIME NOT NULL,
    status ENUM('Agendado', 'Concluído', 'Cancelado') DEFAULT 'Agendado',
    FOREIGN KEY (paciente_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE,
    UNIQUE (medico_id, data_consulta, horario)
);

-- ----------------------------------------------------------------------
-- PRONTUÁRIO - Registro dos atendimentos realizados.
CREATE TABLE prontuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exame_realizado TEXT NOT NULL,
    diagnostico TEXT,
    descricao_do_resultado TEXT,
    medicamentos_prescritos TEXT,
    fumante ENUM('Sim', 'Não') NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------
-- CLÍNICAS - (Opcional) Tabela para representar as unidades, se necessário.
CREATE TABLE clinica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    subadmin_id INT DEFAULT NULL,
    medico_id INT DEFAULT NULL,
    FOREIGN KEY (subadmin_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE
);
