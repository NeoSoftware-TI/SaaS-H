import { db } from '../config/database';

export const getProntuarios = async () => {
    const [rows] = await db.query('SELECT * FROM prontuario');
    return rows;
};

export const getProntuarioById = async (id: number) => {
    const [rows] = await db.query('SELECT * FROM prontuario WHERE id = ?', [id]);
    return rows[0];
};

export const createProntuario = async (data: any) => {
    const { paciente_id, medico_id, exame_realizado, diagnostico, observacoes, medicamentos_prescritos, fumante } = data;

    await db.query(
        `INSERT INTO prontuario 
            (paciente_id, medico_id, exame_realizado, diagnostico, observacoes, medicamentos_prescritos, fumante) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [paciente_id, medico_id, exame_realizado, diagnostico, observacoes, medicamentos_prescritos, fumante]
    );
};

export const updateProntuario = async (id: number, data: any) => {
    const { exame_realizado, diagnostico, observacoes, medicamentos_prescritos, fumante } = data;

    await db.query(
        `UPDATE prontuario 
         SET exame_realizado = ?, diagnostico = ?, observacoes = ?, 
             medicamentos_prescritos = ?, fumante = ?
         WHERE id = ?`,
        [exame_realizado, diagnostico, observacoes, medicamentos_prescritos, fumante, id]
    );
};

export const deleteProntuario = async (id: number) => {
    await db.query('DELETE FROM prontuario WHERE id = ?', [id]);
};