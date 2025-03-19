import express from 'express';
import medicoRoutes from './routes/medicoRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api', medicoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);