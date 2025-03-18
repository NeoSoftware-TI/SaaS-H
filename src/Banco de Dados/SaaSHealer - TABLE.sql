USE saudenam_Clinica;

-- ----------------------------------------------------------------------
-- Tabela de PERMISSÕES com os níveis: Admin, Subadmin, Médico e Paciente
CREATE TABLE IF NOT EXISTS permissao (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('Admin', 'Subadmin', 'Medico', 'Paciente') NOT NULL UNIQUE
);

-- Inserindo os níveis de permissão (se já não existirem)
INSERT IGNORE INTO permissao (nivel) VALUES 
    ('Admin'), 
    ('Subadmin'), 
    ('Medico'),
    ('Paciente');

-- ----------------------------------------------------------------------
-- Tabela de USUÁRIOS UNIFICADOS
CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf CHAR(11) UNIQUE,
    sexo ENUM('Masculino', 'Feminino', 'Não Informado'),
    -- Campo usado para a especialidade do médico; poderá ser nulo para outros tipos de usuários
    especialidade VARCHAR(255),
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES permissao(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------
-- Tabela de AGENDAMENTOS
CREATE TABLE IF NOT EXISTS agendamento (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    paciente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    clinica VARCHAR(255) NOT NULL,
    data_consulta DATE NOT NULL,
    horario TIME NOT NULL,
    status ENUM('Agendado', 'Concluído', 'Cancelado') DEFAULT 'Agendado',
    FOREIGN KEY (paciente_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE,
    UNIQUE (medico_id, data_consulta, horario)
);

-- ----------------------------------------------------------------------
-- Tabela de PRONTUÁRIOS
CREATE TABLE IF NOT EXISTS prontuario (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    paciente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exame_realizado TEXT NOT NULL,
    diagnostico TEXT NOT NULL,
    observacoes TEXT,
    medicamentos_prescritos TEXT,
    fumante ENUM('Sim', 'Não'),
    FOREIGN KEY (paciente_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES usuario(id) ON DELETE CASCADE
);
