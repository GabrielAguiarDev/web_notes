// Imports
    const express = require('express');
    const session = require('express-session')
    const flash = require('connect-flash')
    const app = express();
    const path = require('path');
    const mongoose = require('mongoose')
    const bodyParser = require('body-parser');
    const porta = process.env.PORT || 3000;

//  Session
    app.use(session({
        secret: 'heqvdgeehfbhewwekbkdbfhwei',
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash())

// Middlewere
    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash("sucesse_msg")
        res.locals.error_msg = req.flash('error_msg')
        next()
    })
  
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

// Mongoose
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost/Anotacoes_web').then(()=> {
        console.log("MongoDB connected...")
    }).catch((err)=> {
        console.log("Houve um erro ao se conectar ao MongoDB: " + err)
    })

// Rotas

    // Index
    app.use('/', require('./routes/pages'))

    // Home
    app.use('/home', require('./routes/pages'));

    // Perfil
    app.use('/perfil', require('./routes/pages'))

    // Cadastro
    app.use('/cadastro', require('./routes/pages'))
    app.use('/register', require('./routes/pages'));

    // Postagem
    app.use('/postagem', require('./routes/pages'));
    app.use('/post', require('./routes/pages'));

    // Minhas Metas
    app.use('/metas', require('./routes/pages'));

    // Outros
    app.use('/outros', require('./routes/pages'))

    // Admin: Clientes
    app.use('/admin', require('./routes/pages'))

    // // Deletar Post
    // app.get('/deletar', async(req, res) => {
    //     const Post = await Post.findByPk(1)
    //     Post.destroy()
    // })
    
    // LogOut
    app.get('/logout', function(req, res){
        req.session.destroy();
        res.redirect('/')
    })

// Servidor rodando na porta 3000
    app.listen(porta, ()=>{console.log(`Servidor Rodando ${porta}`)});