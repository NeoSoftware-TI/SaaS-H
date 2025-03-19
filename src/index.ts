import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes';
import agendamentoRoutes from './routes/agendamentoRoutes';
import prontuarioRoutes from './routes/prontuarioRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/agendamentos', agendamentoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use('/prontuarios', prontuarioRoutes);