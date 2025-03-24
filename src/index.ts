import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import agendamentoRoutes from './routes/agendamentoRoutes';
import prontuarioRoutes from './routes/prontuarioRoutes';
import clinicRoutes from './routes/clinicRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/users', userRoutes);
app.use('/prontuarios', prontuarioRoutes);
app.use('/clinics', clinicRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});