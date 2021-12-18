const Sequelize = require('sequelize');
const sequelize = new Sequelize('clientes', 'root', 'TAKIcaebAa', {
    host: "localhost",
    dialect: "mysql"
}) // Nome do banco, usuário, senha, Servidor em q o mysql está rodando, tipo de banco de dados

sequelize.authenticate().then(function(){
    console.log("MYSQL Connected...")
}).catch(function(erro){
    console.log("Falha ao se conectar: " + erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}