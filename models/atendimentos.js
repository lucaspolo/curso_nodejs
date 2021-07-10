const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class AtendimentoException {
    constructor(message) {
        this.message = message;
    }
}

class Atendimento {
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');

        const data = moment(atendimento.data, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);

        if (!dataEhValida) {
            throw new AtendimentoException('Data de agendamento inválida, deve ser maior ou igual a data atual');
        }

        const clienteEhValido = atendimento.cliente.length >= 5;
        if (!clienteEhValido) {
            throw new AtendimentoException('Nome do cliente deve ter mais que quatro caracteres');
        }

        const atendimentoDatado = {
            ...atendimento,
            dataCriacao,
            data,
        };

        const sql = 'INSERT INTO Atendimentos SET ?'

        return new Promise((resolve, reject) => {
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) return reject(erro);
                resolve({
                    id: resultados.insertId,
                    ...atendimentoDatado,
                })
            });
        });
        
    }

    lista() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM Atendimentos';

            conexao.query(sql, (erro, resultados) => {
                if(erro) {
                    return reject(erro);
                }
                resolve(resultados);
                
            });
        });
        
    }

    altera(id, valores) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        return new Promise((resolve, reject) => {
            conexao.query(sql, [valores, id], (erro, resultados) =>{
                if(erro) return reject(erro)
                resolve(resultados);
            });
        });
    }
}

module.exports = {
    Atendimento,
    AtendimentoException,
};