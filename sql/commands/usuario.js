const db = require('../db')

const Usuario = db.sequelize.define('usuarios', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: db.Sequelize.STRING
    },
    usuario: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    }
})

//Usuario.sync({force: true}) - Utilize esse código apenas na primeira vez, pois ele cria a tabela e apaga a tabela caso haja alguma com o mesmo nome, assim perdendo todos os dados da tabela anterior

module.exports = Usuario