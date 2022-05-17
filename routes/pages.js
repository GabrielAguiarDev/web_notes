const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');
const mongoose = require('mongoose');
const User = mongoose.model("user");
const Note = mongoose.model("notes");
const Meta = mongoose.model("metas");
const Trash = mongoose.model("trashes");
const Code = mongoose.model("codes")
const Link = mongoose.model("links")
const List = mongoose.model("lists")
const Reminder = mongoose.model("reminders")
const Text = mongoose.model("texts")
const {eAdmin, checkAuthenticate, checkLoginIn} = require('../helpers/authadmin');

const router = express.Router();

// Rotas 
    // CADASTRO
    router.get('/cadastro', (req, res)=>{
        let msg_error = req.flash('msg_error')
        let msg_success = req.flash('msg_success')
        res.render('pages/cadastro', {
            msg_error,
            msg_success
        })
    });

    // INDEX
    router.get('/login', checkLoginIn, (req, res)=>{
        let msg_error = req.flash('msg_error')
         let msg_success = req.flash('msg_success')
        res.render('pages/login', {
            dadosUsername: undefined,
            dadosSenha: undefined,
            msg_error,
            msg_success
        })
    }); 

    // LOGIN - GOOGLE
    router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        Note.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((note)=>{
            Note.findOne({_id: req.body.id}).then((noteEdit)=>{
                res.render('pages/index', {
                    listNotes: note,
                    editNote: noteEdit,
                    page_name: 'home',
                    pageOutros: undefined,
                    userG: req.user
                })
            })
        })
    });

    // LOGIN - FACEBOOK
    router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        Note.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((note)=>{
            Note.findOne({_id: req.body.id}).then((noteEdit)=>{
                res.render('pages/index', {
                    listNotes: note,
                    editNote: noteEdit,
                    page_name: 'home',
                    pageOutros: undefined,
                    userG: req.user
                })
            })
        })
    });

    // HOME 
    router.get('/', checkAuthenticate, (req, res) => {
        Note.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((note)=>{
             Note.findOne({_id: req.body.id}).then((noteEdit)=>{
                res.render('pages/index', {
                    listNotes: note,
                    editNote: noteEdit,
                    user: req.user,
                    page_name: 'home',
                    pageOutros: undefined
                })
            })
        })  
    })

    // PERFIL
    router.get('/perfil/:name', checkAuthenticate, async(req, res)=>{

        let countMeta = await Meta.find({userId: req.user.id}).count().then((count) => {
            return count
        })

        let countNote = await Note.find({userId: req.user.id}).count().then((count) => {
            return count
        })

        res.render('pages/perfil', {
            user: req.user,
            dateUser: req.user.data,
            countMeta, 
            countNote,
            page_name: 'perfil',
            pageOutros: undefined
        })
    })

    // METAS
    router.get('/metas', checkAuthenticate, (req, res)=>{
        Meta.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Meta)=>{
            res.render('pages/metas', {
                listMetas: Meta,
                user: req.user,
                page_name: 'metas',
                pageOutros: undefined
                })
        })  
    })

    // OUTROS TIPOS
        // listas
        router.get('/listas', checkAuthenticate, (req, res)=>{
            List.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((List)=>{
                res.render('pages/listas', {
                    listLists: List,
                    user: req.user,
                    page_name: 'listas',
                    pageOutros: 'listas'
                })
            })
        }) 

        // lembretes
        router.get('/lembretes', checkAuthenticate, (req, res)=>{
            Reminder.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Reminder)=>{
                res.render('pages/lembretes', {
                    listReminders: Reminder,
                    user: req.user,
                    page_name: 'lembretes',
                    pageOutros: 'lembretes'
                })
            })
        }) 

        // textos
        router.get('/textos', checkAuthenticate, (req, res)=>{
            Text.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Text)=>{
                res.render('pages/textos', {
                    listTexts: Text,
                    user: req.user,
                    page_name: 'textos',
                    pageOutros: 'textos'
                })
            })
        }) 

        // links
        router.get('/links', checkAuthenticate, (req, res)=>{
            Link.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Link)=>{
                res.render('pages/links', {
                    listLinks: Link, 
                    user: req.user,
                    page_name: 'links',
                    pageOutros: 'links'
                })
            })
        }) 

        // códigos
        router.get('/codigos', checkAuthenticate, (req, res)=>{
            Code.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Code)=>{
                res.render('pages/codigos', {
                    listCode: Code,
                    user: req.user,
                    page_name: 'codigos',
                    pageOutros: 'codigos'
                })
            })
        }) 
    

    // TEMAS
    router.get('/temas', checkAuthenticate, (req, res)=>{
        res.render('pages/temas', {
            user: req.user,
            page_name: 'temas',
            pageOutros: undefined
        })
    })

    // FEEDBACK
    router.get('/feedback', checkAuthenticate, (req, res)=>{
        res.render('pages/feedback', {
            user: req.user,
            page_name: 'feedback',
            pageOutros: undefined
        })
    })

    // LIXEIRA
    router.get('/lixeira', checkAuthenticate, (req, res)=>{
        Trash.find({userId: { $eq: req.user.id }, tipo: "notes"}).sort({_id: -1}).then((trashesNotes)=>{
            res.render('pages/lixeira', {
                listNotesTrash: trashesNotes,
                user: req.user,
                page_name: 'lixeira',
                pageOutros: undefined
            })
        })
    })

    // LIXEIRA - requisições AJAX para listagem
    router.get('/Lixeira/anotacoes', checkAuthenticate, (req, res)=>{
        Trash.find({userId: { $eq: req.user.id }, tipo: "notes"}).sort({_id: -1}).then((trashesNotes)=>{
            res.send({listNotesTrash: trashesNotes})
        })
    })

    router.get('/Lixeira/metas', checkAuthenticate, (req, res)=>{
        Trash.find({userId: { $eq: req.user.id }, tipo: "metas"}).sort({_id: -1}).then((trashesMetas)=>{
            res.send({listMetasTrash: trashesMetas})
        })
    })
    

    // DELETAR PERMANENTEMENTE
    router.get('/trash/delete/:id', checkAuthenticate, (req, res)=>{
        Trash.deleteOne({_id: req.params.id}).then((note)=>{
            console.log("Deletado da lixeira permanentemente com sucesso!")
            res.redirect('/lixeira')
        }).catch((err)=>{
            console.log("Erro ao deletar permanentemente: " + err)
            res.redirect('/lixeira')
        })
    })

    // LOGOUT
    router.get('/logout', (req, res)=>{
        req.logout();
        res.redirect('/login')
    })

    // PAGES ADMIN
    
        // Lista de Clientes
        router.get('/admin/:name', eAdmin, (req, res)=>{
            User.find().sort({data: 'desc'}).then((User)=> {
                res.render('admin/clientes', {
                    users: User,
                    User: req.user,
                    dateUser: req.user.data,
                    page_name: 'admin',
                    pageOutros: undefined
                })
            }).catch((err)=>{
                console.log("Erro ao listar usuarios: " + err)
                res.redirect('/')
            })
        })


// MÉTODOS POST

    // Rota Cadastro
    router.post('/register', authController.register)

    // Rota Anotações
    router.post('/notes', authController.notes)

    // Rota Metas
    router.post('/goal', authController.metas)

    // Rota Codigos
    router.post('/codes', authController.codes)

    // Rota Lembretes
    router.post('/reminders', authController.reminders)

    // Rota Links
    router.post('/links', authController.links)

    // Rota Listas
    router.post('/lists', authController.lists)

    // Rota Textos
    router.post('/texts', authController.texts)

    // Rota Login
    router.post('/login', authController.login)

    // Limpar Lixeira (Notes)
    router.post('/note/clean', authController.cleanTrashNotes)
    
    // Limpar Lixeira (Metas)
    router.post('/meta/clean', authController.cleanTrashMetas)

    // Mover para lixeira (Notes)
    router.post('/note/delete', authController.trashesNote)

    // Mover para lixeira (Metas)
    router.post('/meta/delete', authController.trashesMeta)

    // Mover de volta da lixeira (Notes)
    router.post('/note/rescue', authController.rescueNote)

    // Mover de volta da lixeira (Metas)
    router.post('/meta/rescue', authController.rescueMeta)

    // Editar Anotação (Salvar)
    router.post('/note/edit', authController.edit)

    // Editar Meta
    router.post('/meta/edit', authController.editMeta)

    // Editar Dados do Usuário
    router.post('/update/user', authController.updateUser)

module.exports = router;