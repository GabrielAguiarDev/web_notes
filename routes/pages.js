const express = require('express')
const passport = require('passport');
const authController = require('../controllers/auth');
const mongoose = require('mongoose')
const User = mongoose.model("user")
const Note = mongoose.model("notes")
const Meta = mongoose.model("metas")
const Trash = mongoose.model("trashes")
const {eAdmin} = require('../helpers/authadmin')
const {logado} = require('../helpers/authadmin')

const router = express.Router()

// Rotas 
    // INDEX
    router.get('/', (req, res)=>{
        let msg_error = req.flash('msg_error')
        let msg_success = req.flash('msg_success')
        res.render('user/index', {
            dadosEmail: "",
            dadosSenha: "",
            msg_error,
            msg_success
        })
    }); 

    // LOGIN - GOOGLE
    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        Note.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((note)=>{
            Note.findOne({_id: req.body.id}).then((noteEdit)=>{
                res.render('user/home', {
                    listNotes: note,
                    editNote: noteEdit,
                    user: req.user,
                    page_name: 'home'
                })
            })
        })
    });

    // HOME 
    router.get('/home',logado, (req, res) => {
        Note.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((note)=>{
            Note.findOne({_id: req.body.id}).then((noteEdit)=>{
                res.render('user/home', {
                    listNotes: note,
                    editNote: noteEdit,
                    user: req.user,
                    page_name: 'home'
                })
            })
        })       
    })

    // PERFIL
    router.get('/perfil', logado, async(req, res)=>{

        let countMeta = await Meta.find({userId: req.user.id}).count().then((count) => {
            return count
        })

        let countNote = await Note.find({userId: req.user.id}).count().then((count) => {
            return count
        })

        res.render('user/perfil', {
            user: req.user,
            dateUser: req.user.data,
            countMeta, 
            countNote,
            page_name: 'perfil'
        })
    })           

    // CADASTRO
    router.get('/cadastro', (req, res)=>{
        let msg_error = req.flash('msg_error')
        let msg_success = req.flash('msg_success')
        res.render('user/cadastro', {
            msg_error,
            msg_success
        })
    });

    // MINHAS METAS
    router.get('/metas', logado, (req, res)=>{
        Meta.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Meta)=>{
            res.render('user/metas', {
                listMetas: Meta,
                user: req.user,
                page_name: 'metas'
                })
        })  
    })

    // OUTROS
    router.get('/outros', logado, (req, res)=>{
        res.render('user/outros', {
            user: req.user,
            page_name: 'outros'
        })
    })

    // TEMAS
    router.get('/temas', logado, (req, res)=>{
        res.render('user/temas', {
            user: req.user,
            page_name: 'temas'
        })
    })

    // FEEDBACK
    router.get('/feedback', logado, (req, res)=>{
        res.render('user/feedback', {
            user: req.user,
            page_name: 'feedback'
        })
    })

    // LIXEIRA
    router.get('/lixeira', logado, (req, res)=>{
        Trash.find({userId: { $eq: req.user.id }, tipo: "notes"}).sort({_id: -1}).then((trashesNotes)=>{
            res.render('user/lixeira', {
                listNotesTrash: trashesNotes,
                user: req.user,
                page_name: 'lixeira'
            })
        })
    })

    // Lixeira - requisições AJAX para listagem
    router.get('/Lixeira/anotacoes', logado, (req, res)=>{
        Trash.find({userId: { $eq: req.user.id }, tipo: "notes"}).sort({_id: -1}).then((trashesNotes)=>{
            res.send({listNotesTrash: trashesNotes})
        })
    })

    router.get('/Lixeira/metas', logado, (req, res)=>{
        Trash.find({userId: { $eq: req.user.id }, tipo: "metas"}).sort({_id: -1}).then((trashesMetas)=>{
            res.send({listMetasTrash: trashesMetas})
        })
    })
    

    // DELETAR PERMANENTEMENTE
    router.get('/trash/delete/:id', logado, (req, res)=>{
        Trash.deleteOne({_id: req.params.id}).then((note)=>{
            console.log("Deletado da lixeira permanentemente com sucesso!")
            res.redirect('/lixeira')
        }).catch((err)=>{
            console.log("Erro ao deletar permanentemente: " + err)
            res.redirect('/lixeira')
        })
    })

    // PAGES ADMIN
    
        // Lista de Clientes
        router.get('/admin', eAdmin, (req, res)=>{
            User.find().sort({data: 'desc'}).then((User)=> {
                res.render('admin/clientes', {
                    users: User,
                    User: req.user,
                    dateUser: req.user.data,
                    page_name: 'admin'
                })
            }).catch((err)=>{
                console.log("Erro ao listar usuarios: " + err)
                res.redirect('/home')
            })
        })


// MÉTODO POST
    // Rota Cadastro
    router.post('/register', authController.register)

    // Rota Anotações
    router.post('/notes', authController.notes)

    // Rota Metas
    router.post('/goal', authController.metas)

    // Rota Index
    router.post('/', authController.index)

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