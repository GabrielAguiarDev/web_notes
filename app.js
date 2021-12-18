// Imports
    const express = require('express');
    const session = require('express-session')
    const app = express();
    const path = require('path');
    const bodyParser = require('body-parser');
    const porta = process.env.PORT || 3000;
    const Post = require('./sql/commands/Post');
    const Usuario = require('./sql/commands/usuario');

// EJS Layouts
    app.set('view engine', 'ejs');
    app.set('views', './views')

// Static Files
    app.use('/css', express.static(__dirname + '/public/css'));
    app.use('/img', express.static(__dirname + '/public/img'));
    app.use('/js', express.static(__dirname + '/public/js'));

// Body Parser 
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

//  Session
    app.use(session({secret: 'heqvdgeehfbhewwekbkdbfhwei'}));
  
// Rotas

    // Index
    app.use('/', require('./routes/pages'))
    

    // Home
    app.use('/home', require('./routes/pages'));


    // Cadastro
    app.use('/cadastro', require('./routes/pages'))
    app.use('/register', require('./routes/pages'));


    // Postagem
    app.use('/postagem', require('./routes/pages'));
    app.use('/post', require('./routes/pages'));

    // Deletar Post
    app.get('/deletar', async(req, res) => {
        const Post = await Post.findByPk(1)
        Post.destroy()
    })
    
    // LogOut
    app.get('/logout', function(req, res){
        req.session.destroy();
        res.redirect('/')
    })

// Servidor rodando na porta 3000
    app.listen(porta, ()=>{console.log(`Servidor Rodando ${porta}`)});