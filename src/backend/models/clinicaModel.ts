import { db } from '../config/database';

interface Clinic {
    nome: string;
    subadmin_id?: number;
    medico_id?: number;
}

export const createClinic = async (clinic: Clinic) => {
    const sql = `INSERT INTO clinica (nome, subadmin_id, medico_id) VALUES (?, ?, ?)`;
    const values = [clinic.nome, clinic.subadmin_id || null, clinic.medico_id || null];
    await db.query(sql, values);
};

export const getClinics = async () => {
    const sql = `SELECT clinica.id, clinica.nome, 
                        usuario_subadmin.nome AS nome_subadmin,
                        usuario_medico.nome AS nome_medico
                 FROM clinica
                 LEFT JOIN usuario AS usuario_subadmin ON clinica.subadmin_id = usuario_subadmin.id
                 LEFT JOIN usuario AS usuario_medico ON clinica.medico_id = usuario_medico.id`;
    const [rows] = await db.query(sql);
    return rows;
};
