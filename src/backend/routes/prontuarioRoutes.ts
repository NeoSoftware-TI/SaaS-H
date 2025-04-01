import express from 'express';
import {
    listarProntuarios,
    buscarProntuarioPorId,
    criarProntuario,
    atualizarProntuario,
    excluirProntuario
} from '../controllers/prontuarioController';

const router = express.Router();

router.get('/', listarProntuarios);
router.get('/:id', buscarProntuarioPorId);
router.post('/', criarProntuario);
router.put('/:id', atualizarProntuario);
router.delete('/:id', excluirProntuario);

export default router;