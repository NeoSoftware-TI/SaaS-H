import { Request, Response } from 'express';
import { createUser, getUsersByClinic } from '../models/userModel';

export const registerUser = async (req: Request, res: Response) => {
    const { nome, email, telefone, senha, data_nascimento, cpf, sexo, especialidade, permissao_id, clinica_id } = req.body;

    if (!nome || !email || !telefone || !senha || !data_nascimento || !permissao_id || !clinica_id) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    try {
        await createUser({
            nome,
            email,
            telefone,
            senha,
            data_nascimento,
            cpf,
            sexo,
            especialidade,
            permissao_id,
            clinica_id
        });
        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
};

export const listUsersByClinic = async (req: Request, res: Response) => {
    const { clinicName, permission } = req.params;

    try {
        const users = await getUsersByClinic(clinicName, permission);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
};