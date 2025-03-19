import { db } from '../config/database';

export const getAgendamentos = async () => {
    const [rows] = await db.query('SELECT * FROM agendamento');
    return rows;
};

export const createAgendamento = async (data: any) => {
    const { paciente_id, medico_id, clinica, data_consulta, horario } = data;
    await db.query(
        `INSERT INTO agendamento (paciente_id, medico_id, clinica, data_consulta, horario) 
         VALUES (?, ?, ?, ?, ?)`, 
        [paciente_id, medico_id, clinica, data_consulta, horario]
    );
};