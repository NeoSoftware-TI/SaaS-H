import { Request, Response } from 'express';
import { db } from '../config/database';

export const listarMedico = async (req: Request, res: Response) => {
    try {
        const [medico] = await db.query('SELECT * FROM medico');
        res.status(200).json(medico);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar Médicos', erro: error });
    }
};