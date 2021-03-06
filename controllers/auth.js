const mongoose = require('mongoose')
require('../models/Note')
require('../models/User')
require('../models/Meta')
require('../models/Trash')
require('../models/Code')
require('../models/Link')
require('../models/List')
require('../models/Reminder')
require('../models/Text')
const Note = mongoose.model("notes")
const User = mongoose.model("user")
const Meta = mongoose.model("metas")
const Trash = mongoose.model("trashes")
const Code = mongoose.model("codes")
const Link = mongoose.model("links")
const List = mongoose.model("lists")
const Reminder = mongoose.model("reminders")
const Text = mongoose.model("texts")
const bcrypt = require('bcryptjs')
const passport = require('passport')

exports.login = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
}

exports.register = (req, res) => {

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        req.flash('msg_error','Nome Inválido!')
        res.redirect('/cadastro')

    } else if(!req.body.usuario || typeof req.body.usuario == undefined || req.body.usuario == null) {
        req.flash('msg_error','Usuário Inválido!')
        res.redirect('/cadastro')

    } else if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        req.flash('msg_error','Email Inválido!')
        res.redirect('/cadastro')

    } else if(!req.body.senha || typeof req.body.usuario == undefined || req.body.usuario == null){
        req.flash('msg_error','Senhas inválida!')
        res.redirect('/cadastro')

    } else if(req.body.senha !== req.body.confirmarSenha) {
        req.flash('msg_error','As senhas não correspondem!')
        res.redirect('/cadastro')

    } else if(req.body.senha.length <= 7){
        req.flash('msg_error','Senha muito curta! (Mínimo 8 caracteres)')
        res.redirect('/cadastro')

    } else {

        User.findOne({email: req.body.email}).then((user)=>{
            if(user){
                console.log("Já existe uma conta com esse endereço de email")

                req.flash('msg_error','Já existe uma conta com esse endereço de email')
                res.redirect('/cadastro')
            } else {
                
                const novoUsuario = new User({
                    name: req.body.nome,
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
                            let msg_error = req.flash('msg_error')
                            req.flash('msg_success', 'Usuário criado com sucesso!')
                            let msg_success = req.flash('msg_success') 
                            res.render('pages/login', {
                                dadosUsername: req.body.usuario,
                                dadosSenha: req.body.senha,
                                msg_error,
                                msg_success
                            })
                        }).catch((err)=>{
                            console.log("Erro ao criar o usuário: " + err)
                            res.redirect('/cadastro')
                        })
                    })
                })

            }
        }).catch((err)=>{
            console.log("Houve um erro interno ==> " + err)
            res.redirect('/cadastro')
        })
    }
}

exports.notes = async(req, res)=>{
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
        await new Note(novaAnotacao).save().then((req, res)=>{
            console.log("Anotação salva com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar a Anotacao: " + err)
        })
        res.redirect('/')
    }
}

exports.metas = async(req, res)=>{ // Pendente...
    const novaMeta = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        dataPrevista: req.body.dataPrevista,
        userId: req.user.id
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
        res.redirect('/criarMeta')
    } else {
        await new Meta(novaMeta).save().then((req, res)=>{
            console.log("Meta salva com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar a meta: " + err)
        })
        res.redirect('/metas')
    }
}

exports.codes = async(req, res)=> {
    const novoCode = {
        titulo: req.body.titulo,
        code: req.body.code,
        language: req.body.language,
        userId: req.user.id
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
        res.redirect('/codigos')
    }
    if(!req.body.code || typeof req.body.code == undefined || req.body.code == null){
        console.log("Conteudo inválido!")
        res.redirect('/codigos')
    }
    if(!req.body.language || typeof req.body.language == undefined || req.body.language == null){
        console.log("Linguagem inválido!")
        res.redirect('/codigos')
    } else {
        await new Code(novoCode).save().then((req, res)=>{
            console.log("Código salva com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar o código: " + err)
        })
        res.redirect('/codigos')
    }
}

exports.reminders = async(req, res)=> {
    const novoReminder = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        dataReminder: req.body.dataReminder,
        userId: req.user.id
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
        res.redirect('/lembretes')
    }
    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        console.log("Conteudo inválido!")
        res.redirect('/lembretes')
    }
    if(!req.body.dataReminder || typeof req.body.dataReminder == undefined || req.body.dataReminder == null){
        console.log("Data de lembrete inválida!")
        res.redirect('/lembretes')
    } else {
        await new Reminder(novoReminder).save().then((req, res)=>{
            console.log("Lembrete salvo com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar o lembrete: " + err)
        })
        res.redirect('/lembretes')
    }
}

exports.links = async(req, res)=> {
    const novoLink = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        userId: req.user.id
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
        res.redirect('/links')
    }
    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        console.log("Conteudo inválido!")
        res.redirect('/links')
    } else {
        await new Link(novoLink).save().then((req, res)=>{
            console.log("Link salvo com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar o link: " + err)
        })
        res.redirect('/links')
    }
}

exports.lists = async(req, res)=> {
    const novaList = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        userId: req.user.id
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
        res.redirect('/listas')
    }
    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        console.log("Conteudo inválido!")
        res.redirect('/listas')
    } else {
        await new List(novaList).save().then((req, res)=>{
            console.log("Lista salvo com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar a lista: " + err)
        })
        res.redirect('/listas')
    }
}

exports.texts = async(req, res)=> {
    const novoText = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        complemento: req.body.complemento,
        userId: req.user.id
    }

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        console.log("Titulo inválido!")
        res.redirect('/textos')
    }
    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        console.log("Conteudo inválido!")
        res.redirect('/textos')
    }
    if(!req.body.complemento || typeof req.body.complemento == undefined || req.body.complemento == null){
        console.log("Complemento inválido!")
        res.redirect('/textos')
    } else {
        await new Text(novoText).save().then((req, res)=>{
            console.log("Texto salvo com sucesso!")

        }).catch((err)=>{
            console.log("Houve um erro ao salvar o texto: " + err)
        })
        res.redirect('/textos')
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
            res.redirect('/')
        }).catch((err)=>{
            console.log("Erro ao salvar a edição da anotação... " + err)
            res.redirect('/')
        })

    }).catch((err)=>{
        console.log("Erro ao editar a anotação: " + err)
    })
}

exports.trashesNote = (req, res)=> {
    Note.findOne({_id: req.body.id}).then( async(note)=>{
        const noteDelete = {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            tipo: "notes",
            userId: req.user.id
        }
        await new Trash(noteDelete).save().then((req, res)=>{
            console.log("Anotação movida para lixeira")
        }).catch((err)=>{
            console.log("Erro ao mover anotação para lixeira: " + err)
        })
        await Note.deleteOne({_id: req.body.id}).then((req, res)=>{
            console.log("Apagado das anotações")
        }).catch((err)=>{
            console.log("Erro ao apagar das anotações: " + err)
        })
        res.redirect('/')
    })
}

exports.trashesMeta = (req, res)=> {
    Note.findOne({_id: req.body.id}).then( async(note)=>{
        const noteDelete = {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            tipo: "metas",
            userId: req.user.id
        }
        await new Trash(noteDelete).save().then((req, res)=>{
            console.log("Meta movida para lixeira")
        }).catch((err)=>{
            console.log("Erro ao mover meta para lixeira: " + err)
        })
        await Meta.deleteOne({_id: req.body.id}).then((req, res)=>{
            console.log("Apagado das Metas")
        }).catch((err)=>{
            console.log("Erro ao apagar das Metas: " + err)
        })
        res.redirect('/metas')
    })
}

exports.rescueNote = (req, res)=> {  
    Trash.findOne({_id: req.body.id}).then( async(note)=>{
        const noteRescue = {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            userId: req.user.id
        }
        console.log(noteRescue)
        await new Note(noteRescue).save().then((req, res)=>{
            console.log("Movido de volta para a página home")
        }).catch((err)=>{
            console.log("Erro ao mover para home: " + err)
        })
        await Trash.deleteOne({_id: req.body.id}).then((req, res)=>{
            console.log("Apagado permanentemente")
        }).catch((err)=>{
            console.log("Erro ao apagar permanentemente: " + err)
        })
        res.redirect('/lixeira')
    })
}

exports.rescueMeta = (req, res)=> {
    Trash.findOne({_id: req.body.id}).then( async(note)=>{
        const metaRescue = {
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            userId: req.user.id
        }
        await new Meta(metaRescue).save().then((req, res)=>{
            console.log("Movido de volta para a página Metas")
        }).catch((err)=>{
            console.log("Erro ao mover para metas: " + err)
        })
        await Trash.deleteOne({_id: req.body.id}).then((req, res)=>{
            console.log("Apagado permanentemente")
        }).catch((err)=>{
            console.log("Erro ao apagar permanentemente: " + err)
        })
        res.redirect('/lixeira')
    })
}

exports.cleanTrashNotes = async(req, res)=> {
    await Trash.deleteMany({userId: req.user.id, tipo: "notes"}).then((req, res)=>{
        console.log("Lixeira limpada com sucesso!")
    }).catch((err)=>{
        console.log("Erro ao limpar a lixeira: " + err)
    })
    res.redirect('/lixeira')
}

exports.cleanTrashMetas = async(req, res)=> {
    await Trash.deleteMany({userId: req.user.id, tipo: "metas"}).then((req, res)=>{
        console.log("Lixeira limpada com sucesso!")
    }).catch((err)=>{
        console.log("Erro ao limpar a lixeira: " + err)
    })
    res.redirect('/lixeira')
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
    //     if (err) return next(err)

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
    res.redirect('/')
    
}