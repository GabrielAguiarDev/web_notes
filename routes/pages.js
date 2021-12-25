const express = require('express')
const authController = require('../controllers/auth');
const mongoose = require('mongoose')
const User = mongoose.model("user")
const Note = mongoose.model("notes")

const router = express.Router()

// Rotas 
    // INDEX
    router.get('/', (req, res)=>{
        if(req.session.login){
            Note.find().sort({data: 'desc'}).then((Note)=>{
                res.render('home', {
                    listNotes: Note,
                    nome: "Gabriel Aguiar"
                    })
            })
        } else {
            res.render('index')
        }  
    }); 

    // HOME 
    router.get('/home', async(req, res) => {
        if(req.session.login){
            Note.find().sort({data: 'desc'}).then((Note)=>{
                res.render('home', {
                    listNotes: Note,
                    nome: "Gabriel Aguiar"
                    })
            })
        } else {
            res.render('index')
        }
        
    })

    // PERFIL
    router.get('/perfil', (req, res)=>{
        if(req.session.login){
            res.render('perfil', {
                nome: "Gabriel Aguiar" })
            } else {
                res.render('index')
            }
    })

    // CADASTRO
    router.get('/cadastro', (req, res)=>{
        res.render('cadastro')
    });

    // POSTAGENS
    router.get('/postagem', (req, res)=>{
        if(req.session.login){
        res.render('createpost', {
            nome: "Gabriel Aguiar" })
        } else {
            res.render('index')
        }
    });

    // MINHAS METAS
    router.get('/metas', (req, res)=>{
        if(req.session.login){
            res.render('metas', {
                nome: "Gabriel Aguiar" })
            } else {
                res.render('index')
            }
    })

    // OUTROS
    router.get('/outros', (req, res)=>{
        if(req.session.login){
            res.render('outros', {
                nome: "Gabriel Aguiar" })
            } else {
                res.render('index')
            }
    })

    // EDITAR NOTES 
    router.get("/note/edit/:id", (req, res)=>{
        Note.findOne({_id: req.params.id}).then((note)=>{
            res.render('crud/edit', {Note: note, nome: "Gabriel Aguiar"})
        }).catch((err)=>{
            console.log("Esta anotação não existe!... " + err)
            res.redirect('/home')
        })
    })

    // DELETAR NOTES
    router.get('/note/delete/:id', (req, res)=>{
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
            router.get('/admin', authController.admin)

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