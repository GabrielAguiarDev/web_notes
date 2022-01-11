const express = require('express')
const authController = require('../controllers/auth');
const mongoose = require('mongoose')
const User = mongoose.model("user")
const Note = mongoose.model("notes")
const Meta = mongoose.model("metas")
const {eAdmin} = require('../helpers/authadmin')
const {logado} = require('../helpers/authadmin')
const erros = require('../controllers/auth')

const router = express.Router()

// Rotas 
    // INDEX
    router.get('/', (req, res)=>{
        res.render('index')
    }); 

    // HOME 
    router.get('/home',logado, (req, res) => {
        Note.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Note)=>{
            res.render('home', {
                listNotes: Note,
                user: req.user,
                page_name: 'home'
                })
        })        
    })

    // PERFIL
    router.get('/perfil', logado, (req, res)=>{
        res.render('perfil', {
            user: req.user,
            page_name: 'perfil'
        })
    })

    // CADASTRO
    router.get('/cadastro', (req, res)=>{
        res.render('cadastro')
    });

    // POSTAGENS
    router.get('/postagem', logado, (req, res)=>{
        res.render('createpost', {
            user: req.user,
            page_name: 'postagem'})
    });

    router.get('/criarMeta', logado, (req, res)=>{
        res.render('createmeta', {
            user: req.user,
            page_name: 'criarMeta'})
    })

    // MINHAS METAS
    router.get('/metas', logado, (req, res)=>{
        Meta.find({userId: { $eq: req.user.id }}).sort({_id: -1}).then((Meta)=>{
            res.render('metas', {
                listMetas: Meta,
                user: req.user,
                page_name: 'metas'
                })
        })  
    })

    // OUTROS
    router.get('/outros', logado, (req, res)=>{
        res.render('outros', {
            user: req.user,
            page_name: 'outros'
        })
    })

    // EDITAR NOTES 
    router.get('/note/edit/:id', logado, (req, res)=>{
        Note.findOne({_id: req.params.id}).then((note)=>{
            res.render('edit', {
                Note: note,
                user: req.user,
                page_name: 'edit'})
        }).catch((err)=>{
            console.log("Esta anotação não existe!... " + err)
            res.redirect('/home')
        })
    })

    // EDITAR METAS
    router.get('/meta/edit/:id', logado, (req, res)=>{
        Meta.findOne({_id: req.params.id}).then((meta)=>{
            res.render('editMeta', {
                Meta: meta,
                user: req.user,
                page_name: 'edit'})
        }).catch((err)=>{
            console.log("Esta Meta não existe!... " + err)
            res.redirect('/metas')
        })
    })

    // DELETAR METAS
    router.get('/meta/delete/:id', logado, (req, res)=>{
        Meta.deleteOne({_id: req.params.id}).then((note)=>{
            console.log("Meta deletada com sucesso!")
            res.redirect('/metas')
        }).catch((err)=>{
            console.log("Erro ao deletar: " + err)
            res.redirect('/metas')
        })
    })

    // DELETAR NOTES
    router.get('/note/delete/:id', logado, (req, res)=>{
        Note.deleteOne({_id: req.params.id}).then((note)=>{
            console.log("Anotação deletada com sucesso!")
            res.redirect('/home')
        }).catch((err)=>{
            console.log("Erro ao deletar: " + err)
            res.redirect('/home')
        })
    })

    // PAGES ADMIN
    
            // Lista de Clientes
            router.get('/admin', eAdmin, async(req, res)=>{

                let countMeta = await Meta.find({userId: { $eq: [] }}).count().then((count) => {
                    return count
                });

                let countNote = await Note.find({userId: { $eq: [] }}).count().then((count) => {
                    return count
                })

                User.find().sort({data: 'desc'}).then((User)=> {
                    res.render('admin/clientes', {
                        users: User,
                        user: req.user,
                        countMeta,
                        countNote,
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

    // Editar Anotação (Salvar)
    router.post('/note/edit', authController.edit)

    // Editar Meta
    router.post('/meta/edit', authController.editMeta)

    // Editar Dados do Usuário
    router.post('/update/user', authController.updateUser)

module.exports = router;