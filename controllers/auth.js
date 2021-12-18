const Usuario = require('../sql/commands/usuario');
const Post = require('../sql/commands/Post');
const db = require('../sql/db');

var password = "123";
var login =  "Gabriel";

exports.index = async(req, res) => {
    if(req.body.password == password && req.body.login == login){
        // Logado com sucesso
        req.session.login = login;
        const docs = await Post.findAll({})
        res.render('home', {
            docs,
            nome: "Gabriel Aguiar"
            })
    } else {
        res.render('index')
    }
}

exports.register = async(req, res) => {
    // const { nome, usuario, senha, confirmarSenha, email } = req.body;
    // // db.sequelize.findOne({
    // //     include: [{
             
    // //     }]
    // // })
    // db.sequelize.query('SELECT email FROM usuarios WHERE email = ?', [email], (error, results) => {
    //     if(error) {
    //         console.log(error);
    //     }

    //     if(results.length > 0) {
    //         return res.render('cadastro', console.log("O email já está em uso por outro usuário"))
    //     } else if( senha !== confirmarSenha) {
    //         return res.render('cadastro', console.log("As senhas não correspondem"))
    //     }
    // })

    Usuario.create({
        nome: req.body.nome,
        usuario: req.body.usuario,
        senha: req.body.senha,
        confirmarSenha: req.body.confirmarSenha,
        email: req.body.email
    }).then(function(){
        console.log(req.body)
        // var nomeUsuario = req.body.nome
        res.redirect('/')
    }).catch(function(erro){
        res.send("Erro ao cadastrar usuário: " + erro)
    })
}

exports.post = (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(async()=> {
        const docs = await Post.findAll({})
        res.render('home', {
            docs,
            nome: "Gabriel Aguiar"
            })
    }).catch(function(erro){
        res.send("Erro ao cadastrar Postagem: " + erro)
    }) 
}
