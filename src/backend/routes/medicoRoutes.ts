import express from 'express';
import { listarMedico } from '../controllers/medicoController';

const router = express.Router();

router.get('/medico', listarMedico);

export default router;