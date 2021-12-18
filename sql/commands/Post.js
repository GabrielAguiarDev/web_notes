const db = require('../db')
const Usuario = require('./usuario')

const Post = db.sequelize.define('postagens', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
})

// Post.belongsTo(Usuario, {
//     constraint: true,
//     foreignKey: 'idUsuario'
// })

// Usuario.hasMany(Post, {
//     foreingKey: 'idUsuario' 
// })
//Post.sync({force: true}) //- Utilize esse código apenas na primeira vez, pois ele cria a tabela e apaga a tabela caso haja alguma com o mesmo nome, assim perdendo todos os dados da tabela anterior

module.exports = Post