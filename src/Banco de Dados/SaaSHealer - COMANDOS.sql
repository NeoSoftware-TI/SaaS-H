-- Selecionando o banco de dados correto 
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

-- Criação das Tabelas

-- Tabela de PERMISSÕES (os níveis aqui são: Cliente, Medico, Sub-Admin e Admin)
CREATE TABLE permissao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('Cliente', 'Medico', 'Sub-Admin', 'Admin') NOT NULL UNIQUE
);

-- Inserindo os níveis de permissão iniciais (sem duplicatas)
INSERT IGNORE INTO permissao (nivel) VALUES 
    ('Cliente'), 
    ('Medico'), 
    ('Sub-Admin'), 
    ('Admin');

-- Tabela unificada de USUÁRIOS
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado'),
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    especialidade VARCHAR(255),   -- Apenas para médicos; pode ser NULL para os demais
    clinica_nome VARCHAR(255),    -- Nome da clínica associada, se aplicável
    permissao_id INT NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- Tabela de AGENDAMENTOS
CREATE TABLE agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL, -- Referência ao usuário com permissão 'Cliente'
    medico_id INT NOT NULL,   -- Referência ao usuário com permissão 'Medico'
    clinica VARCHAR(255) NOT NULL,
    data_consulta DATE NOT NULL,
    horario TIME NOT NULL,
    status ENUM('Agendado', 'Concluído', 'Cancelado') DEFAULT 'Agendado',
    FOREIGN KEY (paciente_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE,
    UNIQUE (medico_id, data_consulta, horario)
);

-- Tabela de PRONTUÁRIOS
CREATE TABLE prontuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,  -- Referência ao usuário 'Cliente'
    medico_id INT NOT NULL,    -- Referência ao usuário 'Medico'
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exame_realizado TEXT NOT NULL,
    diagnostico TEXT,
    descricao_do_resultado TEXT,
    medicamentos_prescritos TEXT,
    fumante ENUM('Sim', 'Não') NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabela de CLÍNICAS (opcional – caso a aplicação deseje associar um sub-admin e/ou médico à unidade)
CREATE TABLE clinica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,  -- Ex.: 'Clínica Serenity', 'Clínica InnovateHealth', etc.
    subadmin_id INT DEFAULT NULL, -- Referência ao usuário com permissão 'Sub-Admin'
    medico_id INT DEFAULT NULL,   -- Referência ao usuário com permissão 'Medico'
    FOREIGN KEY (subadmin_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- NOTA:
-- Nenhum usuário (Admin, Sub-Admin, Médico, Cliente) é criado via SQL.
-- As operações de INSERT, UPDATE e DELETE para os registros devem ser realizadas pela aplicação.
