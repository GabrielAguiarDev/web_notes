const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');
const mongoose = require('mongoose');
const User = mongoose.model("user");
const Note = mongoose.model("notes");
const Meta = mongoose.model("metas");
const Trash = mongoose.model("trashes");
const {eAdmin, checkAuthenticate, checkLoginIn} = require('../helpers/authadmin');

const router = express.Router();

// Rotas 
    // CADASTRO
    router.get('/cadastro', (req, res)=>{
        let msg_error = req.flash('msg_error')
        let msg_success = req.flash('msg_success')
        res.render('user/cadastro', {
            msg_error,
            msg_success
        })
    });

    // INDEX
    router.get('/login', checkLoginIn, (req, res)=>{
        let msg_error = req.flash('msg_error')
         let msg_success = req.flash('msg_success')
        res.render('user/login', {
            dadosUsername: undefined,
            dadosSenha: undefined,
            msg_error,
            msg_success
        })
    }); 

    // LOGIN - GOOGLE
    router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        Note.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((note)=>{
            Note.findOne({_id: req.body.id}).then((noteEdit)=>{
                res.render('user/index', {
                    listNotes: note,
                    editNote: noteEdit,
                    page_name: 'home',
                    userG: req.user
                })
            })
        })
    });

    // HOME 
    router.get('/', checkAuthenticate, (req, res) => {
        Note.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((note)=>{
             Note.findOne({_id: req.body.id}).then((noteEdit)=>{
                res.render('user/index', {
                    listNotes: note,
                    editNote: noteEdit,
                    user: req.user,
                    page_name: 'home'
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

        res.render('user/perfil', {
            user: req.user,
            dateUser: req.user.data,
            countMeta, 
            countNote,
            page_name: 'perfil'
        })
    })

    // MINHAS METAS
    router.get('/metas', checkAuthenticate, (req, res)=>{
        Meta.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Meta)=>{
            res.render('user/metas', {
                listMetas: Meta,
                user: req.user,
                page_name: 'metas'
                })
        })  
    })

    // OUTROS
    router.get('/outros', checkAuthenticate, (req, res)=>{
        res.render('user/outros', {
            user: req.user,
            page_name: 'outros'
        })
    })

    // TEMAS
    router.get('/temas', checkAuthenticate, (req, res)=>{
        res.render('user/temas', {
            user: req.user,
            page_name: 'temas'
        })
    })

    // FEEDBACK
    router.get('/feedback', checkAuthenticate, (req, res)=>{
        res.render('user/feedback', {
            user: req.user,
            page_name: 'feedback'
        })
    })

    // LIXEIRA
    router.get('/lixeira', checkAuthenticate, (req, res)=>{
        Trash.find({userId: { $eq: req.user.id }, tipo: "notes"}).sort({_id: -1}).then((trashesNotes)=>{
            res.render('user/lixeira', {
                listNotesTrash: trashesNotes,
                user: req.user,
                page_name: 'lixeira'
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
                    page_name: 'admin'
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

    // Rota Index
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