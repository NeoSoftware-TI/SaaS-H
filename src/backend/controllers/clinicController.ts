import { Request, Response } from 'express';
import { createClinic, getClinics } from '../models/clinicModel';

export const registerClinic = async (req: Request, res: Response) => {
    const { nome, subadmin_id, medico_id } = req.body;

    if (!nome) {
        return res.status(400).json({ error: 'O nome da clínica é obrigatório.' });
    }

    try {
        await createClinic({ nome, subadmin_id, medico_id });
        res.status(201).json({ message: 'Clínica registrada com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar clínica.' });
    }
};

export const listClinics = async (_req: Request, res: Response) => {
    try {
        const clinics = await getClinics();
        res.status(200).json(clinics);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar clínicas.' });
    }
};
