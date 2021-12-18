const express = require('express')
const authController = require('../controllers/auth');
const Post = require('../sql/commands/Post');
const usuario = require('../sql/commands/usuario')

const router = express.Router()

// Rotas 
    // INDEX
    router.get('/', function(req, res){
        if(req.session.login){
            res.render('home', { nome: "Gabriel Aguiar"})
        } else {
            res.render('index')
        }  
    });

    // HOME 
    router.get('/home', async(req, res) => {
        if(req.session.login){
            const docs = await Post.findAll({})
            res.render('home', {
            docs,
            nome: "Gabriel Aguiar"
            })
        } else {
            res.render('index')
        }
        
    })

    // CADASTRO
    router.get('/cadastro', function(req, res){
        res.render('cadastro', {
            massage: "teste"
        })
    });

    // POSTAGENS
    router.get('/postagem', function(req, res){
        if(req.session.login){
        res.render('createpost', {
            nome: "Gabriel Aguiar" })
        } else {
            res.render('index')
        }
    });

// MÉTODO POST
    // Rota Cadastro
    router.post('/register', authController.register)

    // Rota Postagem
    router.post('/post', authController.post)

    // Rota Index
    router.post('/', authController.index)

module.exports = router;