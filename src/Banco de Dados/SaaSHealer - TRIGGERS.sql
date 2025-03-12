use Clinica;

-- -------------------------------------------------------------------------------------------------------------------------------- TRIGGER - Os dados que serão automaticamente Acrescentado

-- ---------------------------------------------------------------------- SUB-ADMIN - Inserir as Informações do Direto/Gerente na sua Clinica após o Registro.
DELIMITER $$
CREATE TRIGGER after_subadmin_insert
AFTER INSERT ON subadmin
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO `Clínica Serenity` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (0, 0, 0, NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO `Clínica InnovateHealth` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (0, 0, 0, NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO `Clínica QualityCare` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (0, 0, 0, NEW.id);
    END IF;
END$$
DELIMITER ;

-- ---------------------------------------------------------------------- MEDICOS - Inserir as Informações do Médico na sua Clinica após o Registro.
DELIMITER $$
CREATE TRIGGER after_medico_insert
AFTER INSERT ON medico
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO `Clínica Serenity` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (0, NEW.id, 0, 0);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO `Clínica InnovateHealth` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (0, NEW.id, 0, 0);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO `Clínica QualityCare` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (0, NEW.id, 0, 0);
    END IF;
END$$
DELIMITER ;

-- ---------------------------------------------------------------------- CLIENTES - Inserir as Informações do Cliente na sua Clinica após o Registro.
DELIMITER $$
CREATE TRIGGER after_cliente_insert
AFTER INSERT ON cliente
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO `Clínica Serenity` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (NEW.id, 0, 0, 0);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO `Clínica InnovateHealth` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (NEW.id, 0, 0, 0);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO `Clínica QualityCare` (cliente_id, medico_id, agendamento_id, subadmin_id) VALUES (NEW.id, 0, 0, 0);
    END IF;
END$$
DELIMITER ;

-- ---------------------------------------------------------------------- PRONTUARIO - Inserir as Informações no Prontuario após um Cliente Agendar se ainda não Tem.
DELIMITER $$

CREATE TRIGGER after_agendamento_insert
AFTER INSERT ON agendamento
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO `Clínica Serenity` (cliente_id, medico_id, agendamento_id, subadmin_id)
        VALUES (NEW.cliente_id, NEW.medico_id, NEW.id, 0);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO `Clínica InnovateHealth` (cliente_id, medico_id, agendamento_id, subadmin_id)
        VALUES (NEW.cliente_id, NEW.medico_id, NEW.id, 0);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO `Clínica QualityCare` (cliente_id, medico_id, agendamento_id, subadmin_id)
        VALUES (NEW.cliente_id, NEW.medico_id, NEW.id, 0);
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
            descriçao_do_resultado, 
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
END $$

DELIMITER ;
