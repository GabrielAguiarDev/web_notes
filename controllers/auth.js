const mongoose = require('mongoose')
require('../models/Note')
require('../models/User')
const User = mongoose.model("user")
const Note = mongoose.model("notes")
const bcrypt = require('bcryptjs')
const passport = require('passport')

// var password = "123";
// var email =  "Gabriel";

exports.index = (req, res, next) => {
    // if(req.body.password == password && req.body.email == email){
    //     // Logado com sucesso
    //     req.session.login = email;
    //     Note.find().sort({data: 'desc'}).then((Note)=>{
    //         res.render('home', {
    //             listNotes: Note,
    //             nome: "Gabriel Aguiar"
    //             })
    //     })
    // } else {
    //     res.render('index')
    // }

    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/",
        failureFlash: true
    })(req, res, next)
    
}

exports.register = (req, res) => {
    
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

    if(req.body.senha < 5){
        massage_erros.push({erros: "Senha muito curta"})
    }

    if(massage_erros.length > 0){
        res.render('cadastro', massage_erros)
        console.log(massage_erros)
    } else {

        User.findOne({email: req.body.email}).then((user)=>{
            if(user){
                console.log("Já existe uma conta com esse endereço de email")
                res.redirect('/cadastro')
            } else {
                const novoUsuario = new User({
                    nome: req.body.nome,
                    usuario: req.body.usuario,
                    email: req.body.email,
                    senha: req.body.senha,
                    eAdmin: 1
                })

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                        if(erro){
                            console.log("Houve um erro ao salvar o usuário")
                            res.redirect('/cadastro')
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(()=>{
                            console.log("Usuário criado com sucesso!")
                            res.redirect('/')
                        }).catch((err)=>{
                            console.log("Erro ao criar o usuário: " + err)
                            res.redirect('/cadastro')
                        })
                    })
                })

            }
        }).catch((err)=>{
            console.log("Houve um erro interno")
            res.redirect('/cadastro')
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