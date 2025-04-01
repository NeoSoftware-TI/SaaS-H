import { Request, Response } from 'express';
import { getUsuarios, getUsuarioById } from '../models/usuarioModel';

export const listarUsuarios = async (req: Request, res: Response) => {
    const usuarios = await getUsuarios();
    res.json(usuarios);
};

export const buscarUsuarioPorId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const usuario = await getUsuarioById(id);

    if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    res.json(usuario);
};