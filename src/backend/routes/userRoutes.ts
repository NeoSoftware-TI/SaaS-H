import { Router } from 'express';
import { registerUser, listUsersByClinic } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.get('/list/:clinicName/:permission', listUsersByClinic);

export default router;