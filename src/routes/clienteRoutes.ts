import express from 'express';
import { listarCliente } from '../controllers/clienteController';

const router = express.Router();

router.get('/cliente', listarCliente);

export default router;