import { Router } from 'express';
import { registerClinic, listClinics } from '../controllers/clinicController';

const router = Router();

router.post('/register', registerClinic); // Rota para registrar uma clínica
router.get('/list', listClinics);         // Rota para listar todas as clínicas

export default router;