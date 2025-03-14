INSERT INTO admin (nome, email, telefone, senha, data_nascimento, permissao_id) 
VALUE ('Desenvolvedor', 'admin@hotmail.com', '00 0000-0000', SHA2('senha123', 256), '2000-01-01', 4);

INSERT INTO subadmin (nome, cpf, email, clinica_nome, telefone, sexo, senha, data_nascimento, permissao_id)
VALUE (	'Diretor', '000.000.000-00', 'clinica@hotmail.com', 'Clínica Serenity', '00 0000-0000', 'Masculino', SHA2('senha123', 256), '2000-01-01', 3);

INSERT INTO medico (nome, cpf, email, clinica_nome, telefone, especialidade, sexo, senha, data_nascimento, permissao_id) 
VALUE ('Dr. João Silva', '000.000.000-00', 'medico@hotmail.com', 'Clínica Serenity', '00 0000-0000', 'Pediatra', 'Masculino', SHA2('senha123', 256), '2000-01-01', 2);

INSERT INTO cliente (nome, cpf, email, clinica_nome, telefone, sexo, senha, data_nascimento, permissao_id)
VALUE ('Maria Oliveira', '000.000.000-00', 'cliente@hotmail.com', 'Clínica Serenity', '00 0000-0000', 'Feminino', SHA2('senha123', 256), '2000-01-01', 1);

-- 'Clínica Serenity', 'Clínica InnovateHealth', 'Clínica QualityCare'

DELETE FROM subadmin
WHERE id BETWEEN 3 AND 4;

DELETE FROM medico
WHERE id BETWEEN 3 AND 4;

DELETE FROM cliente
WHERE id BETWEEN 1 AND 7;