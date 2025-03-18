USE saudenam_Clinica;

-- ----------------------------------------------------------------------
-- TRIGGER - Dados que serão automaticamente acrescentados
-- ----------------------------------------------------------------------

-- SUB-ADMIN: Inserir as informações do Diretor/Gerente na sua Clínica após o registro.
DELIMITER $$
CREATE TRIGGER after_subadmin_insert
AFTER INSERT ON subadmin
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO clinica_serenity (cliente_id, medico_id, subadmin_id)
        VALUES (0, 0, NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO clinica_innovatehealth (cliente_id, medico_id, subadmin_id)
        VALUES (0, 0, NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO clinica_qualitycare (cliente_id, medico_id, subadmin_id)
        VALUES (0, 0, NEW.id);
    END IF;
END$$
DELIMITER ;

-- MÉDICOS: Inserir as informações do Médico na sua Clínica após o registro.
DELIMITER $$
CREATE TRIGGER after_medico_insert
AFTER INSERT ON medico
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO clinica_serenity (cliente_id, medico_id, subadmin_id)
        VALUES (0, NEW.id, 0);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO clinica_innovatehealth (cliente_id, medico_id, subadmin_id)
        VALUES (0, NEW.id, 0);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO clinica_qualitycare (cliente_id, medico_id, subadmin_id)
        VALUES (0, NEW.id, 0);
    END IF;
END$$
DELIMITER ;

-- CLIENTES: Inserir as informações do Cliente na sua Clínica após o registro.
DELIMITER $$
CREATE TRIGGER after_cliente_insert
AFTER INSERT ON cliente
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO clinica_serenity (cliente_id, medico_id, subadmin_id)
        VALUES (NEW.id, 0, 0);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO clinica_innovatehealth (cliente_id, medico_id, subadmin_id)
        VALUES (NEW.id, 0, 0);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO clinica_qualitycare (cliente_id, medico_id, subadmin_id)
        VALUES (NEW.id, 0, 0);
    END IF;
END$$
DELIMITER ;

-- PRONTUÁRIO: Inserir as informações na Clínica e, se ainda não existir, criar registro no prontuário após um agendamento.
DELIMITER $$
CREATE TRIGGER after_agendamento_insert
AFTER INSERT ON agendamento
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO clinica_serenity (cliente_id, medico_id, subadmin_id)
        VALUES (NEW.cliente_id, NEW.medico_id, 0);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO clinica_innovatehealth (cliente_id, medico_id, subadmin_id)
        VALUES (NEW.cliente_id, NEW.medico_id, 0);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO clinica_qualitycare (cliente_id, medico_id, subadmin_id)
        VALUES (NEW.cliente_id, NEW.medico_id, 0);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM prontuario
        WHERE cliente_id = NEW.cliente_id 
          AND medico_id = NEW.medico_id
    ) THEN
        INSERT INTO prontuario (
            cliente_id, 
            medico_id, 
            data_criacao, 
            exame_realizado, 
            diagnostico, 
            descricao_do_resultado, 
            medicamentos_prescritos, 
            fumante
        )
        VALUES (
            NEW.cliente_id, 
            NEW.medico_id, 
            CURRENT_TIMESTAMP, 
            'HEMOGRAMA COMPLETO', 
            'COLERA DEVIDA A VIBRIO CHOLERAE 01, BIOTIPO CHOLERAE', 
            'NORMAL', 
            'DIPIRONA - 1 Comprimido ao dia', 
            'Não'
        );
    END IF;
END$$
DELIMITER ;
