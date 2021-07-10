const e = require("express");
const {Atendimento, AtendimentoException} = require("../models/atendimentos");

module.exports = app => {
    app.get('/atendimentos', async (req, res) => {
        const atendimentoModel = new Atendimento;
        try {
            atendimentos = await atendimentoModel.lista();
            return res.status(200).json(atendimentos);
        } catch(erro) {
            return res.status(500).json({
                message: 'Erro ao tentar recuperar os atendimentos'
            });
        }
    });

    app.post('/atendimentos', async (req, res) => {
        const atendimento = req.body;
        const atendimentoModel = new Atendimento;
        try {
            const atendimentoCriado = await atendimentoModel.adiciona(atendimento);
            return res.status(201).json(atendimentoCriado);
        } catch (e) {
            if (e instanceof AtendimentoException) {
                return res.status(400).json({
                    'message': e.message,
                });
            } else {
                return res.status(400).json({
                    'message': 'Erro ao inserir',
                    'details': e
                });
            }
        }
    });

    app.put('/atendimentos/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        const atendimentoModel = new Atendimento;

        try {
            const resultados = await atendimentoModel.altera(id, valores);
            return res.status(200).json(resultados);
        } catch (e) {
            return res.status(400).json({
                message: 'Problemas ao atualizar o registro'
            });
        }
    });
}