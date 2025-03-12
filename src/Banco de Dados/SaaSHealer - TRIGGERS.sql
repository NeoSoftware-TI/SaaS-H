use Clinica;

-- -------------------------------------------------------------------------------------------------------------------------------- TRIGGER - Os dados que serão automaticamente Acrescentado

-- ---------------------------------------------------------------------- SUB-ADMIN - Inserir as Informações do Direto/Gerente na sua Clinica após o Registro.
DELIMITER $$
CREATE TRIGGER after_subadmin_insert
AFTER INSERT ON subadmin
FOR EACH ROW
BEGIN
    IF NEW.clinica_nome = 'Clínica Serenity' THEN
        INSERT INTO `Clínica Serenity` (subadmin_id) VALUES (NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO `Clínica InnovateHealth` (subadmin_id) VALUES (NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO `Clínica QualityCare` (subadmin_id) VALUES (NEW.id);
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
        INSERT INTO `Clínica Serenity` (medico_id) VALUES (NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO `Clínica InnovateHealth` (medico_id) VALUES (NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO `Clínica QualityCare` (medico_id) VALUES (NEW.id);
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
        INSERT INTO `Clínica Serenity` (cliente_id) VALUES (NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO `Clínica InnovateHealth` (cliente_id) VALUES (NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO `Clínica QualityCare` (cliente_id) VALUES (NEW.id);
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
        INSERT INTO `Clínica Serenity` (agendamento_id) VALUES (NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica InnovateHealth' THEN
        INSERT INTO `Clínica InnovateHealth` (agendamento_id) VALUES (NEW.id);
    ELSEIF NEW.clinica_nome = 'Clínica QualityCare' THEN
        INSERT INTO `Clínica QualityCare` (agendamento_id) VALUES (NEW.id);
        
    IF NOT EXISTS ( -- Verifica se já existe um prontuário para este cliente com este Médico.
        SELECT 1 
        FROM prontuario 
        WHERE cliente_id = NEW.usuario_id 
        AND medico_id = NEW.medico_id
    ) THEN
        INSERT INTO prontuario (cliente_id, medico_id, data_criacao, exame_realizado, diagnostico, descriçao_do_resultado, medicamentos_prescritos, fumante)
        VALUES (NEW.usuario_id, NEW.medico_id, 'HEMOGRAMA COMPLETO', 'COLERA DEVIDA A VIBRIO CHOLERAE 01, BIOTIPO CHOLERAE', 'NORMAL', 'DIPIRONA - 1 Comprimido ao dia', 'S/N');
    END IF;
END $$
DELIMITER ;
