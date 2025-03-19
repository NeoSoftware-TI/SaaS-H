import express from 'express';
import { listarAgendamento } from '../controllers/agendamentoController';

const router = express.Router();

router.get('/agendamento', listarAgendamento);

export default router;