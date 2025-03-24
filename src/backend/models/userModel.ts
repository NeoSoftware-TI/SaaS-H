import { db } from '../config/database';

interface User {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    data_nascimento: string;
    cpf?: string;
    sexo: 'Masculino' | 'Feminino' | 'Não Informado';
    especialidade?: string;
    permissao_id: number;
    clinica_id: number;
}

export const createUser = async (user: User) => {
    const sql = `INSERT INTO usuario 
                 (nome, email, telefone, senha, data_nascimento, cpf, sexo, especialidade, permissao_id, clinica_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        user.nome, 
        user.email, 
        user.telefone, 
        user.senha, 
        user.data_nascimento, 
        user.cpf, 
        user.sexo, 
        user.especialidade, 
        user.permissao_id,
        user.clinica_id
    ];
    await db.query(sql, values);
};

export const getUsersByClinic = async (clinicName: string, permission: string) => {
    const sql = `SELECT usuario.*
                 FROM usuario
                 JOIN clinica ON usuario.clinica_id = clinica.id
                 JOIN permissao ON usuario.permissao_id = permissao.id
                 WHERE clinica.nome = ? AND permissao.nivel = ?`;
    const [rows] = await db.query(sql, [clinicName, permission]);
    return rows;
};