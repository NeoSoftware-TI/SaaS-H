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
        WHEN (SELECT permissao_id FROM usuario WHERE id = 5) = 2 AND 1 IN (1) THEN 1 -- ------------------------------- Médico (2) pode cadastrar Cliente (1).
        WHEN (SELECT permissao_id FROM usuario WHERE id = 2) = 3 AND 3 IN (1,2) THEN NULL -- ---------- Sub-Admin (3) pode cadastrar Cliente (1) e Médico (2).
        WHEN (SELECT permissao_id FROM usuario WHERE id = 1) = 4 THEN 1 -- ------------------------------------------------- Admin pode cadastrar qualquer um.
        ELSE NULL
    END) IS NOT NULL;
-- ---------------------------------------------------------------------- SUB-ADMIN
INSERT INTO subadmin (nome, cpf, email, clinica_nome, telefone, sexo, senha, data_nascimento, permissao_id)
SELECT
	'Clínica Serenity', '000.000.000-00', 'clinica@hotmail.com', 'Clínica Serenity', '00 0000-0000', 'Masculino', SHA2('senha123', 256), '2000-01-01', 3
WHERE 
    (SELECT CASE 
        WHEN (SELECT permissao_id FROM usuario WHERE id = 5) = 2 AND 1 IN (1) THEN 1 -- ------------------------------- Médico (2) pode cadastrar Cliente (1).
        WHEN (SELECT permissao_id FROM usuario WHERE id = 2) = 3 AND 3 IN (1,2) THEN NULL -- ---------- Sub-Admin (3) pode cadastrar Cliente (1) e Médico (2).
        WHEN (SELECT permissao_id FROM usuario WHERE id = 1) = 4 THEN 1 -- ------------------------------------------------- Admin pode cadastrar qualquer um.
        ELSE NULL
    END) IS NOT NULL;
    
-- ---------------------------------------------------------------------- MÉDICO
INSERT INTO medico (nome, cpf, email, clinica_nome, telefone, especialidade, sexo, senha, data_nascimento, permissao_id) 
SELECT 
    'João Carlos', '000.000.000-00', 'medico@hotmail.com', 'Clínica Serenity', '00 0000-0000', 'Pediatra', 'Masculino', SHA2('senha123', 256), '2000-01-01', 2
WHERE 
    (SELECT CASE 
        WHEN (SELECT permissao_id FROM usuario WHERE id = 5) = 2 AND 1 IN (1) THEN 1 -- ------------------------------- Médico (2) pode cadastrar Cliente (1).
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

-- ---------------------------------------------------------------------- PRONTUARIO
INSERT INTO prontuario (
    cliente_id, 
    medico_id, 
    data_criacao, 
    exame_realizado, 
    diagnostico, 
    descriçao_do_resultado, 
    medicamentos_prescritos, 
    fumante
)
SELECT 
    cliente.id, 
    medico.id, 
    NOW(),
    'HEMOGRAMA COMPLETO',
    'COLERA DEVIDA A VIBRIO CHOLERAE 01, BIOTIPO CHOLERAE',
    'NORMAL',
    'DIPIRONA - 1 Comprimido ao dia',
    'Não'
FROM cliente
JOIN medico ON cliente.clinica_nome = medico.clinica_nome
WHERE 
    cliente.email = 'cliente@email.com'
    AND medico.email = 'medico@email.com'
    AND (SELECT permissao_id FROM medico WHERE email = 'medico@email.com') = 2;

-- ---------------------------------------------------------------------- AGENDAMENTOS

INSERT INTO agendamento (medico_id, cliente_id, clinica_nome, data_consulta, horario)
SELECT 
    (SELECT id FROM medico WHERE nome = 'Dr. João Silva' AND clinica_nome = 'Clínica Serenity'),
    (SELECT id FROM cliente WHERE nome = 'Maria Oliveira' AND email = 'cliente@hotmail.com'),
    'Clínica Serenity',
    '2024-03-10',
    '14:00:00'
WHERE EXISTS (
    SELECT 1 FROM cliente 
    WHERE nome = 'Maria Oliveira' 
    AND email = 'cliente@hotmail.com'
)
AND EXISTS (
    SELECT 1 FROM medico 
    WHERE nome = 'Dr. João Silva' 
    AND clinica_nome = 'Clínica Serenity'
);

-- ------------------------------------------------------------------------------------------------------------------------------------- SELECT - Dashboard e Busca de dados.

-- ----------------------------------------------------------------------------------------- LOGIN - Comando para verificação de Autenticidade do Login.
SELECT id, nome, permissao_id 
FROM cliente 
WHERE email = 'cliente@hotmail.com' 
AND senha = 'senha123';

SELECT id, nome, permissao_id 
FROM medico 
WHERE email = 'medico@hotmail.com' 
AND senha = 'senha123';

SELECT id, nome, permissao_id 
FROM subadmin 
WHERE email = 'clinica@hotmail.com' 
AND senha = 'senha123';

SELECT id, nome, permissao_id 
FROM admin 
WHERE email = 'admin@hotmail.com' 
AND senha = 'senha123';

-- Uma seleção que traz o "DASHBOARD" de todas as consultas que o médico tem no dia, contendo seu (Nome), (Especialidade), (Paciente),(Data) e (Horário).
SELECT 
    medico.nome AS nome_medico,
    medico.especialidade AS especialidade_medico,
    cliente.nome AS nome_paciente,
    agendamento.data_consulta AS data_consulta,
    agendamento.horario AS horario_consulta
FROM agendamento
JOIN medico ON agendamento.medico_id = medico.id
JOIN cliente ON agendamento.cliente_id = cliente.id
WHERE agendamento.data_consulta = CURDATE()
    AND (
        EXISTS (
            SELECT 1
            FROM `Clínica Serenity`
            WHERE `Clínica Serenity`.medico_id = medico.id
            AND `Clínica Serenity`.cliente_id = cliente.id
        )
        OR EXISTS (
            SELECT 1
            FROM `Clínica InnovateHealth`
            WHERE `Clínica InnovateHealth`.medico_id = medico.id
            AND `Clínica InnovateHealth`.cliente_id = cliente.id
        )
        OR EXISTS (
            SELECT 1
            FROM `Clínica QualityCare`
            WHERE `Clínica QualityCare`.medico_id = medico.id
            AND `Clínica QualityCare`.cliente_id = cliente.id
        )
    )
ORDER BY agendamento.horario;

-- Uma seleção que traz o "DASHBOARD" de todas as consultas que o médico teve na semana separado por dia, contendo seus nomes de (Segunda a Sexta-feira).
SELECT 
    medico.id AS id_medico,
    medico.nome AS nome_medico,
    SUM(CASE WHEN WEEKDAY(agendamento.data_consulta) = 0 THEN 1 ELSE 0 END) AS segunda_feira,
    SUM(CASE WHEN WEEKDAY(agendamento.data_consulta) = 1 THEN 1 ELSE 0 END) AS terca_feira,
    SUM(CASE WHEN WEEKDAY(agendamento.data_consulta) = 2 THEN 1 ELSE 0 END) AS quarta_feira,
    SUM(CASE WHEN WEEKDAY(agendamento.data_consulta) = 3 THEN 1 ELSE 0 END) AS quinta_feira,
    SUM(CASE WHEN WEEKDAY(agendamento.data_consulta) = 4 THEN 1 ELSE 0 END) AS sexta_feira
FROM agendamento
JOIN medico ON agendamento.medico_id = medico.id
JOIN cliente ON agendamento.cliente_id = cliente.id
WHERE agendamento.data_consulta BETWEEN CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY 
                                    AND CURDATE() + INTERVAL (4 - WEEKDAY(CURDATE())) DAY
    AND EXISTS (
        SELECT 1 
        FROM `Clínica Serenity` 
        WHERE `Clínica Serenity`.medico_id = medico.id 
        AND `Clínica Serenity`.cliente_id = cliente.id
    )
    OR EXISTS (
        SELECT 1 
        FROM `Clínica InnovateHealth`
        WHERE `Clínica InnovateHealth`.medico_id = medico.id 
        AND `Clínica InnovateHealth`.cliente_id = cliente.id
    )
    OR EXISTS (
        SELECT 1 
        FROM `Clínica QualityCare`
        WHERE `Clínica QualityCare`.medico_id = medico.id 
        AND `Clínica QualityCare`.cliente_id = cliente.id
    )
GROUP BY medico.id, medico.nome
ORDER BY medico.nome;

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
    WHERE email = 'cliente@hotmail.com'
);

-- ------------------------------------------------------------------------------------------------------------------------------------- DELETE - Apagar Dados das Tabelas.

--  ------------------------- Delete um ID da Tabela "Usuario"
DELETE FROM admin 
WHERE id = 1
AND (
	(SELECT permissao_id FROM admin WHERE id = 1) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);

--  ------------------------- Delete um ID da Tabela "Sub-Admin"
DELETE FROM subadmin
WHERE id = 2
AND (
    (SELECT permissao_id FROM subadmin WHERE id = 3) = 2 AND (SELECT permissao_id FROM medico WHERE id = 10) = 1 -- ------------ Médico (2) pode atualizar Cliente (1)
    OR (SELECT permissao_id FROM subadmin WHERE id = 2) = 3 AND (SELECT permissao_id FROM subadmin WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode atualizar Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM subadmin WHERE id = 1) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);

--  ------------------------- Delete um ID da Tabela "Medico"
DELETE FROM medico
WHERE id = 5
AND (
    (SELECT permissao_id FROM medico WHERE id = 3) = 2 AND (SELECT permissao_id FROM medico WHERE id = 10) = 1 -- ------------ Médico (2) pode atualizar Cliente (1)
    OR (SELECT permissao_id FROM medico WHERE id = 2) = 3 AND (SELECT permissao_id FROM medico WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode atualizar Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM medico WHERE id = 1) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);
    
--  ------------------------- Delete um ID da Tabela "Cliente"
DELETE FROM cliente
WHERE id = 10
AND (
    (SELECT permissao_id FROM cliente WHERE id = 3) = 2 AND (SELECT permissao_id FROM cliente WHERE id = 10) = 1 -- ------------ Médico (2) pode atualizar Cliente (1)
    OR (SELECT permissao_id FROM cliente WHERE id = 2) = 3 AND (SELECT permissao_id FROM cliente WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode atualizar Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM cliente WHERE id = 1) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);

--  ------------------------- Delete um ID da Tabela "Agendamentos"
DELETE FROM agendamento
WHERE id = 10;

--  ------------------------- Delete um ID da Tabela "Prontuario"
DELETE FROM prontuario
WHERE id = 10;

-- ------------------------------------------------------------------------------------------------------------------------------------- UPDATE - Atualização de dados.

--  ------------------------- Atualiza um ID da Tabela "Administrador"
UPDATE admin 
SET nome = 'Desenvolvedor', email = 'admin@email.com'
WHERE id = 1
AND (
	(SELECT permissao_id FROM admin WHERE id = 1) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);

--  ------------------------- Atualiza um ID da Tabela "Sub-Admin"
UPDATE subadmin
SET nome = 'Diretor', email = 'clinica@email.com'
WHERE id = 2
AND (
    (SELECT permissao_id FROM subadmin WHERE id = 3) = 2 AND (SELECT permissao_id FROM medico WHERE id = 10) = 1 -- ------------ Médico (2) pode atualizar Cliente (1)
    OR (SELECT permissao_id FROM subadmin WHERE id = 2) = 3 AND (SELECT permissao_id FROM subadmin WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode atualizar Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM subadmin WHERE id = 1) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);

--  ------------------------- Atualiza um ID da Tabela "Medico"
UPDATE medico
SET email = 'medico@hotmail.com'
WHERE id = 5
AND (
    (SELECT permissao_id FROM medico WHERE id = 3) = 2 AND (SELECT permissao_id FROM medico WHERE id = 10) = 1 -- ------------ Médico (2) pode atualizar Cliente (1)
    OR (SELECT permissao_id FROM medico WHERE id = 2) = 3 AND (SELECT permissao_id FROM medico WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode atualizar Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM medico WHERE id = 1) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);
    
--  ------------------------- Atualiza um ID da Tabela "Cliente"
UPDATE cliente
SET email = 'cliente@hotmail.com'
WHERE id = 10
AND (
    (SELECT permissao_id FROM cliente WHERE id = 3) = 2 AND (SELECT permissao_id FROM cliente WHERE id = 10) = 1 -- ------------ Médico (2) pode atualizar Cliente (1)
    OR (SELECT permissao_id FROM cliente WHERE id = 2) = 3 AND (SELECT permissao_id FROM cliente WHERE id = 10) IN (1,2) -- ---- Sub-Admin (3) pode atualizar Cliente (1) e Médico (2)
    OR (SELECT permissao_id FROM cliente WHERE id = 1) = 4 -- ------------------------------------------------------------------- Admin (4) pode atualizar qualquer um
);

--  ------------------------- Atualiza um ID da Tabela "Agendamentos"
UPDATE agendamento
SET data_consulta = '08/06/2025'
WHERE id = 10;

--  ------------------------- Atualiza um ID da Tabela "Prontuario"
UPDATE prontuario
SET descriçao_do_resultado = 'Gripe'
WHERE id = 10;