import express from 'express';
import { listarUsuarios, buscarUsuarioPorId } from '../controllers/usuarioController';

const router = express.Router();

router.get('/', listarUsuarios);
router.get('/:id', buscarUsuarioPorId);

export default router;