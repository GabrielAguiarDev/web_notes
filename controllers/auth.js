const mongoose = require('mongoose')
require('../models/Note')
require('../models/User')
require('../models/Meta')
const User = mongoose.model("user")
const Note = mongoose.model("notes")
const Meta = mongoose.model("metas")
const bcrypt = require('bcryptjs')
const passport = require('passport')

exports.index = (req, res, next) => {

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
                    senha: req.body.senha
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
        conteudo: req.body.conteudo,
        userId: req.user.id
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
        res.redirect('/postagem')
    }
    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        console.log("Conteudo inválido!")
        res.redirect('/postagem')
    } else {
        new Note(novaAnotacao).save().then((req, res)=>{
            console.log("Anotação salva com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar a Anotacao: " + err)
        })
        res.redirect('/home')
    }
}

exports.metas = (req, res)=>{ // Pendente...
    const novaMeta = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        userId: req.user.id
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
        res.redirect('/criarMeta')
    } else {
        new Meta(novaMeta).save().then((req, res)=>{
            console.log("Meta salva com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar a meta: " + err)
        })
        res.redirect('/metas')
    }
}

exports.editMeta = (req, res)=> {
    Meta.findOne({_id: req.body.id}).then((meta)=>{
        meta.titulo = req.body.titulo
        meta.conteudo = req.body.conteudo

        meta.save().then(()=>{
            console.log("Meta editada com sucesso!")
            res.redirect('/metas')
        }).catch((err)=>{
            console.log("Erro ao salvar a edição da meta... " + err)
            res.redirect('/metas')
        })

    }).catch((err)=>{
        console.log("Erro ao editar a Meta: " + err)
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

exports.updateUser = (req, res)=> {
    let valorAntigo = {
        nome: req.user.nome,
        usuario: req.user.usuario,
        email: req.user.email,
        senha: req.user.senha,
        eAdmin: req.user.eAdmin
    }

    let valorNovo = {
        nome: req.body.nome,
        usuario: req.body.usuario,
        email: req.body.email,
        senha: req.body.senha,
        eAdmin: req.body.eAdmin
    }

    // let usuario = new User({
    //     nome: req.body.nome,
    //     email: req.body.email,
    //     senha: req.body.senha,
    //     eAdmin: req.body.eAdmin
    // })
    
    // var _ = require('lodash');

    // // fetch user
    // User.findById(req.user.id, function(err, post) {
    //     if (err) return next(err);

    //     _.assign(post, req.body); // update user
    //     post.save(function(err) {
    //         if (err) return next(err);
    //         return res.json(200, post);
    //     })
    // });

    User.updateOne(valorAntigo, valorNovo, (err, res)=>{
        if (err) throw err
        console.log('Usuário atualizado')
    })
    res.redirect('/home')
    
}