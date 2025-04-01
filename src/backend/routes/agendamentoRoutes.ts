import express from 'express';
import { listarAgendamentos, criarAgendamento } from '../controllers/agendamentoController';

const router = express.Router();

router.get('/', listarAgendamentos);
router.post('/', criarAgendamento);

export default router;