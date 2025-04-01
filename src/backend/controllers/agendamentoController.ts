import { Request, Response } from 'express';
import { getAgendamentos, createAgendamento } from '../models/agendamentoModel';

export const listarAgendamentos = async (req: Request, res: Response) => {
    const agendamentos = await getAgendamentos();
    res.json(agendamentos);
};

export const criarAgendamento = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        await createAgendamento(data);
        res.status(201).json({ mensagem: 'Agendamento criado com sucesso.' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar agendamento.' });
    }
};