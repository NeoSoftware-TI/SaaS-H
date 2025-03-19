import { db } from '../config/database';

export const getUsuarios = async () => {
    const [rows] = await db.query('SELECT * FROM usuario');
    return rows;
};

export const getUsuarioById = async (id: number) => {
    const [rows] = await db.query('SELECT * FROM usuario WHERE id = ?', [id]);
    return rows[0];
};