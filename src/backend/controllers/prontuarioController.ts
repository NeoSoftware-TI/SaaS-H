import { Request, Response } from 'express';
import { 
    getProntuarios, 
    getProntuarioById, 
    createProntuario, 
    updateProntuario, 
    deleteProntuario 
} from '../models/prontuarioModel';

export const listarProntuarios = async (req: Request, res: Response) => {
    const prontuarios = await getProntuarios();
    res.json(prontuarios);
};

export const buscarProntuarioPorId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const prontuario = await getProntuarioById(id);

    if (!prontuario) {
        return res.status(404).json({ mensagem: 'Prontuário não encontrado.' });
    }

    res.json(prontuario);
};

export const criarProntuario = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        await createProntuario(data);
        res.status(201).json({ mensagem: 'Prontuário criado com sucesso.' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar prontuário.' });
    }
};

export const atualizarProntuario = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body;

    try {
        await updateProntuario(id, data);
        res.status(200).json({ mensagem: 'Prontuário atualizado com sucesso.' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao atualizar prontuário.' });
    }
};

export const excluirProntuario = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        await deleteProntuario(id);
        res.status(200).json({ mensagem: 'Prontuário excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao excluir prontuário.' });
    }
};