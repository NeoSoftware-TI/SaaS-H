create database Clinica;

use Clinica;

DROP TABLE Usuarios;
-- Todas Tabelas: 'Especializacao' 'Agendamentos' 'Cliente' 'Medico' 'Usuarios' 'Permissoes' 'Prontuario'

-- --------------------------------------------------------------------------------------------------------------------------------------- PERMISSÕES
-- Niveis de permissões da Empresa.

CREATE TABLE IF NOT EXISTS Permissoes (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nivel ENUM('Cliente', 'Medico', 'Sub-Admin', 'Admin') NOT NULL UNIQUE
);

INSERT INTO Permissoes (nivel) VALUES 
    ('Cliente'), 
    ('Medico'), 
    ('Sub-Admin'), 
    ('Admin');

-- --------------------------------------------------------------------------------------------------------------------------------------- USUARIOS
-- Tabela dos (USUARIOS) sendo eles (ADMIN, SUB-ADMIN, MÉDICOS E CLIENTES) e seu COMANDO para registrar os mesmos.

CREATE TABLE IF NOT EXISTS Usuarios (
    ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(255) NOT NULL UNIQUE,
    sexo VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    permissao_id INTEGER NOT NULL,
    FOREIGN KEY (permissao_id) REFERENCES Permissoes(id) ON DELETE RESTRICT
);

INSERT INTO Usuarios (nome, cpf, email, telefone, sexo, senha, data_nascimento, permissao_id) 
SELECT 
    'SaaS-H', '000.000.000-00', 'clinica@hotmail.com', '00 0000-0000', 'NA', SHA2('senha123', 256), '2000-01-01', 4
WHERE 
    (SELECT CASE 
        WHEN (SELECT permissao_id FROM Usuarios WHERE id = 5) = 2 AND 1 IN (1) THEN 1 -- ---------------------------------------- Médico (2) pode cadastrar Cliente (1)
        WHEN (SELECT permissao_id FROM Usuarios WHERE id = 5) = 3 AND 3 IN (1,2) THEN NULL -- ----------------------------------- Sub-Admin (3) pode cadastrar Cliente (1) e Médico (2)
        WHEN (SELECT permissao_id FROM Usuarios WHERE id = 5) = 4 THEN 1 -- ----------------------------------------------------- Admin pode cadastrar qualquer um
        ELSE NULL
    END) IS NOT NULL;

UPDATE Usuarios 
SET nome = 'Desenvolvedor', email = 'Admin@email.com'
WHERE id = 10
AND (
    (SELECT permissao_id FROM Usuarios WHERE id = 5) = 2 AND (SELECT permissao_id FROM usuarios WHERE id = 10) = 1 -- ------------ Médico (2) pode atualizar Cliente (1)
    OR (SELECT permissao_id FROM Usuarios WHERE id = 5) = 3 AND (SELECT permissao_id FROM usuarios WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode atualizar Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM Usuarios WHERE id = 5) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);

DELETE FROM Usuarios 
WHERE id = 10
AND (
    (SELECT permissao_id FROM Usuarios WHERE id = 5) = 2 AND (SELECT permissao_id FROM Usuarios WHERE id = 10) = 1 -- ------------ Médico (2) pode excluir Cliente (1)
    OR (SELECT permissao_id FROM Usuarios WHERE id = 5) = 3 AND (SELECT permissao_id FROM Usuarios WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode excluir Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM Usuarios WHERE id = 5) = 4 -- ------------------------------------------------------------------- Admin (4) pode excluir qualquer um
);


-- --------------------------------------------------------------------------------------------------------------------------------------- CLIENTES
-- Tabela dos (CLIENTES) onde depois de cadastra-los na Tabela (USUARIOS), automaticamente vincula na Tabela (CLIENTES).

CREATE TABLE IF NOT EXISTS Cliente (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(255) NOT NULL UNIQUE,
    sexo VARCHAR(255) NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

DELIMITER $$
CREATE TRIGGER after_Usuario_insert
AFTER INSERT ON Usuarios
FOR EACH ROW
BEGIN
    IF NEW.permissao_id = 1 THEN
        INSERT INTO Cliente (usuario_id, nome, cpf, email, telefone, sexo)
        VALUES (NEW.id, NEW.nome, NEW.cpf, NEW.email, NEW.telefone, NEW.sexo);
    
    END IF;
END $$
DELIMITER ;

-- --------------------------------------------------------------------------------------------------------------------------------------- MÉDICOS
-- Tabela dos (MÉDICOS) onde depois de cadastra-los na Tabela (USUARIOS), automaticamente vincula na Tabela (MÉDICOS).

CREATE TABLE IF NOT EXISTS Medico (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(255) NOT NULL UNIQUE,
    sexo VARCHAR(255) NOT NULL,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

DELIMITER $$
CREATE TRIGGER after_usuario_insert
AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    IF NEW.permissao_id = 2 THEN
        SET @especialidade_id = NULL;

        SELECT id INTO @especialidade_id FROM Especializacao WHERE nome = NEW.especialidade LIMIT 1; -- ------ Verifica se a especialidade já existe
        
        IF @especialidade_id IS NULL THEN
            INSERT INTO Especializacao (especialidade) VALUES (NEW.especialidade); -- ---------- Se não existir, cria a especialidade e obtém seu ID
            SET @especialidade_id = LAST_INSERT_ID();
        END IF;
        
        INSERT INTO Medico (usuario_id, nome, cpf, email, telefone, sexo) -- ----------------- Insere o médico na tabela Médicos e vincula a especialidade
        VALUES (NEW.id, NEW.nome, NEW.cpf, NEW.email, NEW.telefone, NEW.sexo);
        
        INSERT INTO Especializacao (especialidade, medico_id) 
		VALUES (NEW.especialidade, NEW.id);
    
    END IF;
END $$
DELIMITER ;

-- --------------------------------------------------------------------------------------------------------------------------------------- ESPECIALIZAÇÃO
-- Tabela da (ESPECIALIZAÇÃO) Onde Registra as Especialização dos Médicos.

CREATE TABLE IF NOT EXISTS Especializacao (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    especialidade VARCHAR(255) NOT NULL,
    medico_id INTEGER NOT NULL,
    FOREIGN KEY (medico_id) REFERENCES Medico(id) ON DELETE CASCADE
);

INSERT INTO Especializacao (especialidade, medico_id)
VALUES
('Ortopedia e traumatologia', 1),
('Neurologia', 2),
('Pediatria', 3),
('Psiquiatria', 4),
('Radiologia e diagnóstico por imagem', 5),
('Reumatologia', 6),
('Urologia', 7),
('Medicina legal e perícia médica', 8),
('Gerontologia', 9),
('Mastologia', 10);

-- --------------------------------------------------------------------------------------------------------------------------------------- LOGIN
-- Comando para verificação de Autenticidade do Login.

SELECT id, nome, permissao_id 
FROM Usuarios 
WHERE email = 'usuario@email.com' 
AND senha = 'senha123';

-- --------------------------------------------------------------------------------------------------------------------------------------- AGENDAMENTOS
-- Tabela da (AGENDAMENTOS) Onde Agenda as consultas que o cliente criou, e já registra eles caso ainda não estão registrados.

CREATE TABLE IF NOT EXISTS Agendamentos (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    data_consulta DATE NOT NULL,
    horario TIME NOT NULL,
    FOREIGN KEY (medico_id) REFERENCES Medico(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE,
    UNIQUE (medico_id, data_consulta, horario)
);

-- Já registrado
INSERT INTO Agendamentos (medico_id, usuario_id, data_consulta, horario) 
VALUES (
    (SELECT id FROM Medicos WHERE usuario_id = (SELECT id FROM Usuarios WHERE email = 'medico@email.com')),
    (SELECT id FROM Usuarios WHERE email = 'cliente@email.com'),
    '2024-03-10',
    '14:00:00'
);

-- Sem Registro
INSERT INTO Usuarios (nome, cpf, email, telefone, sexo, senha, data_nascimento, permissao_id)
SELECT 'João Gomes', '000.000.000-00', 'cliente@email.com', '00 0000-0000', 'NA', SHA2('senha123', 256), 2000-01-01, 2
WHERE NOT EXISTS (SELECT 1 FROM Usuarios WHERE email = 'cliente@email.com');

INSERT INTO Agendamentos (medico_id, usuario_id, data_consulta, horario)
VALUES (
    (SELECT id FROM Medicos WHERE usuario_id = (SELECT id FROM Usuarios WHERE email = 'medico@email.com')),
    (SELECT id FROM Usuarios WHERE email = 'cliente@email.com'),
    '2024-03-10',
    '14:00:00'
);

-- --------------------------------------------------------------------------------------------------------------------------------------- DASHBOARD DO SUB-ADMIN
-- Uma seleção que traz o dashboard de todas as consultas que o médico teve na semana separado por dia, contendo seus nomes de (Segunda a Sexta-feira).

SELECT 
    medicos.id AS id_medico,
    usuarios.nome AS nome_medico,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 0 THEN 1 ELSE 0 END) AS segunda_feira,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 1 THEN 1 ELSE 0 END) AS terca_feira,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 2 THEN 1 ELSE 0 END) AS quarta_feira,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 3 THEN 1 ELSE 0 END) AS quinta_feira,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 4 THEN 1 ELSE 0 END) AS sexta_feira
FROM agendamentos
JOIN medicos ON agendamentos.medico_id = medicos.id
JOIN usuarios ON medicos.usuario_id = usuarios.id
WHERE agendamentos.data_consulta BETWEEN CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY 
                                    AND CURDATE() + INTERVAL (4 - WEEKDAY(CURDATE())) DAY
GROUP BY medicos.id, usuarios.nome
ORDER BY usuarios.nome;

-- --------------------------------------------------------------------------------------------------------------------------------------- DASHBOARD DO MÉDICO
-- Uma seleção que traz o dashboard de todas as consultas que o médico tem no dia, contendo seu (Nome), (Especialidade), (Paciente),(Data) e (Horário).

SELECT 
    Usuarios_medico.nome AS nome_medico,
    Especializacao.especialidade AS especialidade_medico,
    Usuarios_paciente.nome AS nome_paciente,
    Agendamentos.data_consulta AS data_consulta,
    Agendamentos.horario AS horario_consulta
FROM agendamentos
JOIN medicos ON agendamentos.medico_id = medicos.id
JOIN usuarios AS usuarios_medico ON medicos.usuario_id = usuarios_medico.id 
JOIN especializacao ON medicos.id = especializacao.medico_id
JOIN usuarios AS usuarios_paciente ON agendamentos.usuario_id = usuarios_paciente.id
WHERE agendamentos.data_consulta = CURDATE()
ORDER BY agendamentos.horario;

UPDATE agendamentos
SET horario = '15:30:00'
WHERE id = 10;

DELETE FROM Agendamentos
WHERE id = 10;

-- --------------------------------------------------------------------------------------------------------------------------------------- PRONTUARIO
-- Tabela do (Prontuario) onde depois de cadastra-los na Tabela (USUARIOS), deve ser vinculado agora na Tabela (ADMIN) pelo CPF.

CREATE TABLE IF NOT EXISTS Prontuario (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    medico_id INTEGER NOT NULL,
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exame_realizado TEXT NOT NULL,
    diagnostico TEXT,
    descriçao_do_resultado TEXT,
    medicamentos_prescritos TEXT,
    fumante ENUM('S', 'N') NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES Medico(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------------- Inserir as Informações no Prontuario após um Cliente Agendar se ainda não Tem
DELIMITER $$
CREATE TRIGGER after_agendamento_insert
AFTER INSERT ON Agendamentos
FOR EACH ROW
BEGIN
-- --------------------------------------------------------------------------- Verifica se já existe um prontuário para este cliente com este Médico
    IF NOT EXISTS (
        SELECT 1 
        FROM Prontuario 
        WHERE cliente_id = NEW.usuario_id 
        AND medico_id = NEW.medico_id
    ) THEN
        INSERT INTO Prontuario (cliente_id, medico_id, descricao)
        VALUES (NEW.usuario_id, NEW.medico_id, 'Primeira consulta - Prontuário');
    END IF;
END $$
DELIMITER ;

-- ------------------------------------------------------------------------------------------------ Inserir as Informações no Prontuario Diretamente

INSERT INTO Prontuario (cliente_id, medico_id, exame_realizado, diagnostico, descriçao_do_resultado, medicamentos_prescritos)
SELECT 
    (SELECT id FROM Cliente WHERE email = 'cliente@email.com'),
    (SELECT id FROM Medico WHERE email = 'medico@email.com'),
    'HEMOGRAMA COMPLETO',
	'COLERA DEVIDA A VIBRIO CHOLERAE 01, BIOTIPO CHOLERAE',
    'NORMAL',
    'DIPIRONA - 1 Comprimido ao dia'
WHERE 
    (SELECT permissao_id FROM Usuarios WHERE email = 'medico@email.com') = 2;

-- --------------------------------------------------------------------------------------------- Aqui vai Mostrar os dados registrados no Prontuario
SELECT 
    Prontuario.id AS id_prontuario,
    Cliente.nome AS nome_cliente,
    Medico.nome AS nome_medico,
    Prontuario.data_criacao,
    Prontuario.exame_realizado,
    Prontuario.diagnostico,
    Prontuario.descriçao_do_resultado,
    Prontuario.medicamentos_prescritos
FROM Prontuario
JOIN Cliente ON Prontuario.cliente_id = Cliente.id
JOIN Medico ON Prontuario.medico_id = Medico.id
WHERE Prontuario.cliente_id = (
    SELECT id 
    FROM Cliente 
    WHERE email = 'cliente@email.com'
);

-- --------------------------------------------------------------------------------------------------------------------------------------- FIM