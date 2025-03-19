import { Request, Response } from 'express';
import { db } from '../config/database';

export const listarAgendamento = async (req: Request, res: Response) => {
    try {
        const [agendamento] = await db.query('SELECT * FROM agendamento');
        res.status(200).json(agendamento);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar Agendamentos', erro: error });
    }
};