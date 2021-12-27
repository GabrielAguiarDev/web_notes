const express = require('express')
const authController = require('../controllers/auth');
const mongoose = require('mongoose')
const User = mongoose.model("user")
const Note = mongoose.model("notes")
const {eAdmin} = require('../helpers/authadmin')
const {logado} = require('../helpers/authadmin')

const router = express.Router()

// Rotas 
    // INDEX
    router.get('/', (req, res)=>{
        res.render('index')
    }); 

    // HOME 
    router.get('/home', logado, (req, res) => {
        Note.find().sort({data: 'desc'}).then((Note)=>{
            res.render('home', {
                listNotes: Note,
                nome: "Gabriel Aguiar"
                })
        })        
    })

    // PERFIL
    router.get('/perfil', logado, (req, res)=>{
        res.render('perfil', {
            nome: "Gabriel Aguiar" })
    })

    // CADASTRO
    router.get('/cadastro', (req, res)=>{
        res.render('cadastro')
    });

    // POSTAGENS
    router.get('/postagem', logado, (req, res)=>{
        res.render('createpost', {
            nome: "Gabriel Aguiar" })
    });

    // MINHAS METAS
    router.get('/metas', logado, (req, res)=>{
        res.render('metas', {
            nome: "Gabriel Aguiar" })
    })

    // OUTROS
    router.get('/outros', logado, (req, res)=>{
        res.render('outros', {
            nome: "Gabriel Aguiar" })
    })

    // EDITAR NOTES 
    router.get("/note/edit/:id", logado, (req, res)=>{
        Note.findOne({_id: req.params.id}).then((note)=>{
            res.render('crud/edit', {Note: note, nome: "Gabriel Aguiar"})
        }).catch((err)=>{
            console.log("Esta anotação não existe!... " + err)
            res.redirect('/home')
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
            router.get('/admin', eAdmin, (req, res)=>{
                User.find().sort({data: 'desc'}).then((User)=> {
                    res.render('admin/clientes', {
                        users: User,
                        nome: "Gabriel Aguiar"
                    })
                }).catch((err)=>{
                    console.log("Erro ao listar usuarios: " + err)
                })
            })


// MÉTODO POST
    // Rota Cadastro
    router.post('/register', authController.register)

    // Rota Anotações
    router.post('/notes', authController.notes)

    // Rota Index
    router.post('/', authController.index)

    // Editar Anotação (Salvar)
    router.post('/note/edit', authController.edit)

module.exports = router;