const mongoose = require('mongoose')
require('../models/Note')
require('../models/User')
const db = require('../app')
const User = mongoose.model("user")
const Note = mongoose.model("notes")

var password = "123";
var login =  "Gabriel";

exports.index = async(req, res) => {
    if(req.body.password == password && req.body.login == login){
        // Logado com sucesso
        req.session.login = login;
        Note.find().sort({data: 'desc'}).then((Note)=>{
            res.render('home', {
                listNotes: Note,
                nome: "Gabriel Aguiar"
                })
        })
    } else {
        res.render('index')
    }
}

exports.register = (req, res) => {
    // const { nome, usuario, senha, confirmarSenha, email } = req.body;
    const novoUsuario = {
        nome: req.body.nome,
        usuario: req.body.usuario,
        email: req.body.email,
        senha: req.body.senha
    }
    var massage_erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        massage_erros.push({erros: "Nome inválido"})
    }

    if(!req.body.usuario || typeof req.body.usuario == undefined || req.body.usuario == null) {
        massage_erros.push({erros: "Usuário inválido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        massage_erros.push({erros: "Email inválido"})
    }

    if(req.body.senha !== req.body.confirmarSenha || !req.body.senha || typeof req.body.usuario == undefined || req.body.usuario == null){
        massage_erros.push({erros: "Senha inválida"})
    }

    if(massage_erros.length > 0){
        res.render('cadastro', massage_erros)
        console.log(massage_erros)
    } else {
        new User(novoUsuario).save().then((req, res)=>{
            console.log("Usuário criado com sucesso!")
            res.redirect('/')
        }).catch((err)=>{
            res.redirect('/')
            console.log("Erro ao criar usuario: " + err)
        })
    }
}

exports.notes = (req, res)=>{
    const novaAnotacao = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
    }
    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        console.log("Conteudo inválido!")
    } else {
        new Note(novaAnotacao).save().then((req, res)=>{
            console.log("Anotação salva com sucesso!")
        }).catch((err)=>{
            console.log("Houve um erro ao salvar a Anotacao: " + err)
        })
        res.redirect('/home')
    }
}

exports.admin = (req, res)=>{
    User.find().sort({data: 'desc'}).then((User)=> {
        res.render('admin/clientes', {
            users: User,
            nome: "Gabriel Aguiar"
        })
    }).catch((err)=>{
        console.log("Erro ao listar usuarios: " + err)
    })
}

exports.edit = (req, res)=> {
    Note.findOne({_id: req.body.id}).then((note)=>{
        note.titulo = req.body.titulo
        note.conteudo = req.body.conteudo

        note.save().then(()=>{
            console.log("Anotação editada com sucesso!")
            res.redirect('/home')
        }).catch((err)=>{
            console.log("Erro ao salvar a edição da anotação... " + err)
            res.redirect('/home')
        })

    }).catch((err)=>{
        console.log("Erro ao editar a anotação: " + err)
    })
}

// exports.delete = (req, res)=> {
//     Note.remove({_id: req.body.id}).then(()=>{
//         console.log("Anotação deletada com sucesso!")
//         res.redirect('/home')
//     }).catch((err)=>{
//         console.log("Erro ao deletar a anotação: " + err)
//         res.redirect('/home')
//     })
// }