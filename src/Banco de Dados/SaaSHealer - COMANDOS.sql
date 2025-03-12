use Clinica;

-- ------------------------------------------------------------------------------------------------------------------------------------- INSERT - Inserir Dados nas Tabelas.

-- ---------------------------------------------------------------------- PERMISSÕES
INSERT INTO permissao (nivel) VALUES 
    ('Cliente'), 
    ('Medico'), 
    ('Sub-Admin'), 
    ('Admin');

-- ---------------------------------------------------------------------- ADMIN
INSERT INTO admin (nome, email, telefone, senha, data_nascimento, permissao_id) 
SELECT
	'Desenvolvedor', 'admin@hotmail.com', '00 0000-0000', SHA2('senha123', 256), '2000-01-01', 4
WHERE 
    (SELECT CASE 
        WHEN (SELECT permissao_id FROM usuario WHERE id = 1) = 4 THEN 1 -- ------------------------------------------------- Admin pode cadastrar qualquer um.
        ELSE NULL
    END) IS NOT NULL;
-- ---------------------------------------------------------------------- SUB-ADMIN
INSERT INTO subadmin (nome, cpf, email, clinica_nome, telefone, sexo, senha, data_nascimento, permissao_id)
SELECT
	'Clínica Serenity', '000.000.000-00', 'clinica@hotmail.com', 'NA', '00 0000-0000', 'NA', SHA2('senha123', 256), '2000-01-01', 3
WHERE 
    (SELECT CASE 
        WHEN (SELECT permissao_id FROM usuario WHERE id = 1) = 4 THEN 1 -- ------------------------------------------------- Admin pode cadastrar qualquer um.
        ELSE NULL
    END) IS NOT NULL;
    
-- ---------------------------------------------------------------------- MÉDICO
INSERT INTO medico (nome, cpf, email, clinica_nome, telefone, especialidade, sexo, senha, data_nascimento, permissao_id) 
SELECT 
    'João Carlos', '000.000.000-00', 'medico@hotmail.com', 'Clínica Serenity', '00 0000-0000', 'Pediatra', 'Masculino', SHA2('senha123', 256), '2000-01-01', 2
WHERE 
    (SELECT CASE 
        WHEN (SELECT permissao_id FROM usuario WHERE id = 2) = 3 AND 3 IN (1,2) THEN NULL -- ---------- Sub-Admin (3) pode cadastrar Cliente (1) e Médico (2).
        WHEN (SELECT permissao_id FROM usuario WHERE id = 1) = 4 THEN 1 -- ------------------------------------------------- Admin pode cadastrar qualquer um.
        ELSE NULL
    END) IS NOT NULL;
    
-- ---------------------------------------------------------------------- CLIENTE
INSERT INTO cliente (nome, cpf, email, clinica_nome, telefone, sexo, senha, data_nascimento, permissao_id)
SELECT 
	'Santo André', '000.000.000-00', 'paciente@hotmail.com', 'Clínica Serenity', '00 0000-0000', 'Masculino', SHA2('senha123', 256), '2000-01-01', 1
WHERE 
    (SELECT CASE 
        WHEN (SELECT permissao_id FROM usuario WHERE id = 5) = 2 AND 1 IN (1) THEN 1 -- ------------------------------- Médico (2) pode cadastrar Cliente (1).
        WHEN (SELECT permissao_id FROM usuario WHERE id = 2) = 3 AND 3 IN (1,2) THEN NULL -- ---------- Sub-Admin (3) pode cadastrar Cliente (1) e Médico (2).
        WHEN (SELECT permissao_id FROM usuario WHERE id = 1) = 4 THEN 1 -- ------------------------------------------------- Admin pode cadastrar qualquer um.
        ELSE NULL
    END) IS NOT NULL;

-- ---------------------------------------------------------------------- Prontuario
INSERT INTO prontuario (cliente_id, medico_id, data_criacao, exame_realizado, diagnostico, descriçao_do_resultado, medicamentos_prescritos, fumante)
SELECT 
    (SELECT id FROM cliente WHERE email = 'cliente@email.com'),
    (SELECT id FROM medico WHERE email = 'medico@email.com'),
    'HEMOGRAMA COMPLETO',
	'COLERA DEVIDA A VIBRIO CHOLERAE 01, BIOTIPO CHOLERAE',
    'NORMAL',
    'DIPIRONA - 1 Comprimido ao dia',
    'S/N'
WHERE 
    (SELECT permissao_id FROM usuario WHERE email = 'medico@email.com') = 2;

-- ---------------------------------------------------------------------- AGENDAMENTOS
INSERT INTO agendamento (medico_id, usuario_id, clinica_nome, data_consulta, horario)-- ----------------------------------- Sem Registro.
SELECT 
    (SELECT id FROM medico WHERE usuario_id = (SELECT permissao_id FROM usuario WHERE id = 5)),
    (SELECT id FROM usuario WHERE email = 'cliente@email.com'),
    '2024-03-10',
    '14:00:00'
WHERE EXISTS (SELECT 1 FROM usuario WHERE email = 'cliente@email.com')
AND EXISTS (SELECT 1 FROM medico WHERE usuario_id = (SELECT id FROM usuario WHERE email = 'medico@email.com'));

INSERT INTO usuario (nome, cpf, email, especialidade, telefone, sexo, senha, data_nascimento, permissao_id) -- Sem Registro.
SELECT 'João Gomes', '000.000.000-00', 'cliente@email.com', 'NA', '00 0000-0000', 'NA', SHA2('senha123', 256), 2000-01-01, 2
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email = 'cliente@email.com');

-- ------------------------------------------------------------------------------------------------------------------------------------- SELECT - Dashboard e Busca de dados.

-- ----------------------------------------------------------------------------------------- LOGIN - Comando para verificação de Autenticidade do Login.
SELECT id, nome, permissao_id 
FROM usuario 
WHERE email = 'usuario@email.com' 
AND senha = 'senha123';

-- Uma seleção que traz o "DASHBOARD" de todas as consultas que o médico tem no dia, contendo seu (Nome), (Especialidade), (Paciente),(Data) e (Horário).
SELECT 
    usuario_medico.nome AS nome_medico,
    usuario_medico.especialidade AS especialidade_medico,
    cliente.nome AS nome_paciente,
    agendamento.data_consulta AS data_consulta,
    agendamento.horario AS horario_consulta
FROM agendamento
JOIN medico ON agendamento.medico_id = medico.id
JOIN usuario AS usuario_medico ON medico.usuario_id = usuario_medico.id
JOIN cliente ON agendamento.usuario_id = cliente.usuario_id
WHERE agendamento.data_consulta = CURDATE()
ORDER BY agendamento.horario;

-- Uma seleção que traz o "DASHBOARD" de todas as consultas que o médico teve na semana separado por dia, contendo seus nomes de (Segunda a Sexta-feira).
SELECT 
    medico.id AS id_medico,
    usuario.nome AS nome_medico,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 0 THEN 1 ELSE 0 END) AS segunda_feira,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 1 THEN 1 ELSE 0 END) AS terca_feira,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 2 THEN 1 ELSE 0 END) AS quarta_feira,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 3 THEN 1 ELSE 0 END) AS quinta_feira,
    SUM(CASE WHEN WEEKDAY(agendamentos.data_consulta) = 4 THEN 1 ELSE 0 END) AS sexta_feira
FROM agendamento
JOIN medico ON agendamento.medico_id = medico.id
JOIN usuario ON medico.usuario_id = usuario.id
WHERE agendamento.data_consulta BETWEEN CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY 
                                    AND CURDATE() + INTERVAL (4 - WEEKDAY(CURDATE())) DAY
GROUP BY medico.id, usuario.nome
ORDER BY usuario.nome;

-- ------------------------------------------------------------------------------------------------ Aqui vai Mostrar os dados registrados no Prontuario.
SELECT 
    prontuario.id AS id_prontuario,
    cliente.nome AS nome_cliente,
    medico.nome AS nome_medico,
    prontuario.data_criacao,
    prontuario.exame_realizado,
    prontuario.diagnostico,
    prontuario.descriçao_do_resultado,
    prontuario.medicamentos_prescritos
FROM prontuario
JOIN cliente ON prontuario.cliente_id = cliente.id
JOIN medico ON prontuario.medico_id = medico.id
WHERE prontuario.cliente_id = (
    SELECT id 
    FROM cliente 
    WHERE email = 'cliente@email.com'
);

-- ------------------------------------------------------------------------------------------------------------------------------------- DELETE - Apagar Dados das Tabelas.

--  ------------------------- Delete um ID da Tabela "Usuario"
DELETE FROM usuario 
WHERE id = 10
AND (
    (SELECT permissao_id FROM usuario WHERE id = 7) = 2 AND (SELECT permissao_id FROM usuario WHERE id = 10) = 1 -- ------------ Médico (2) pode excluir Cliente (1)
    OR (SELECT permissao_id FROM usuario WHERE id = 6) = 3 AND (SELECT permissao_id FROM usuario WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode excluir Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM usuario WHERE id = 5) = 4 -- ------------------------------------------------------------------- Admin (4) pode excluir qualquer um
);

--  ------------------------- Delete um ID da Tabela "Cliente"
DELETE FROM cliente
WHERE id = 10;

--  ------------------------- Delete um ID da Tabela "Medico"
DELETE FROM medico
WHERE id = 10;

--  ------------------------- Delete um ID da Tabela "Agendamentos"
DELETE FROM agendamento
WHERE id = 10;

--  ------------------------- Delete um ID da Tabela "Prontuario"
DELETE FROM prontuario
WHERE id = 10;

-- ------------------------------------------------------------------------------------------------------------------------------------- UPDATE - Atualização de dados.

--  ------------------------- Atualiza um ID da Tabela "Usuario"
UPDATE usuario 
SET nome = 'Desenvolvedor', email = 'Admin@email.com'
WHERE id = 10
AND (
    (SELECT permissao_id FROM usuario WHERE id = 7) = 2 AND (SELECT permissao_id FROM usuario WHERE id = 10) = 1 -- ------------ Médico (2) pode atualizar Cliente (1)
    OR (SELECT permissao_id FROM usuario WHERE id = 6) = 3 AND (SELECT permissao_id FROM usuario WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode atualizar Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM usuario WHERE id = 5) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);

--  ------------------------- Atualiza um ID da Tabela "Cliente"
UPDATE cliente
SET email = 'cliente@hotmail.com'
WHERE id = 10;

--  ------------------------- Atualiza um ID da Tabela "Medico"
UPDATE medico
SET email = 'medico@hotmail.com'
WHERE id = 10;

--  ------------------------- Atualiza um ID da Tabela "Agendamentos"
UPDATE agendamento
SET data_consulta = '08/06/2025'
WHERE id = 10;

--  ------------------------- Atualiza um ID da Tabela "Prontuario"
UPDATE prontuario
SET descriçao_do_resultado = 'Gripe'
WHERE id = 10;