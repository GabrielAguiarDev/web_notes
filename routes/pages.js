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
    router.get("/notes/edit/:id", (req, res)=>{
        if(req.session.login){
        res.send("Página de edição de anotações")
        console.log("rota funcionando")
        } else {
            res.render('index')
        }
    })

    // PAGES ADMIN
            // Lista de Clientes
            router.get('/admin', authController.admin)

// MÉTODO POST
    // Rota Cadastro
    router.post('/register', authController.register)

    // Rota Postagem
    router.post('/notes', authController.notes)

    // // Rota Index
    router.post('/', authController.index)

module.exports = router;