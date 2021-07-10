class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int not null AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) not null, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) not null, observacoes text, PRIMARY KEY(id))'
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.error(erro);
            } else {
                console.log('Tabela Atendimentos criada com sucesso');
            }
        });
    }
}

module.exports = new Tabelas