import { Request, Response } from 'express';
import { db } from '../config/database';

export const listarCliente = async (req: Request, res: Response) => {
    try {
        const [cliente] = await db.query('SELECT * FROM cliente');
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao listar Clientes', erro: error });
    }
};