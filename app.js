// Imports
    const express = require('express');
    const session = require('express-session');
    const flash = require('connect-flash');
    const app = express();
    const path = require('path');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const passport = require('passport');
    require('dotenv').config()
    require('./config/auth')(passport);

// Porta
    const porta = process.env.PORT || 3000;

//  Session
    app.use(session({
        secret: 'session secret key',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

// Middlewere
    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash("sucesse_msg")
        res.locals.error_msg = req.flash('error_msg')
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null
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

    // Anotações
    app.use('/home', require('./routes/pages'));

    // Perfil
    app.use('/perfil', require('./routes/pages'))

    // Cadastro
    app.use('/cadastro', require('./routes/pages'))

    // Postagem
    app.use('/postagem', require('./routes/pages'));

    // Metas
    app.use('/metas', require('./routes/pages'));

    // Outros
    app.use('/outros', require('./routes/pages'))

    // Temas
    app.use('/temas', require('./routes/pages'))

    // Feedback
    app.use('/feedback', require('./routes/pages'))

    // Lixeira
    app.use('/lixeira', require('./routes/pages'))

    // Admin: Clientes
    app.use('/admin', require('./routes/pages'))

    // LogOut
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/')
    })

// Servidor rodando na porta 3000
    app.listen(porta, ()=>{console.log(`Servidor Rodando na porta ${porta}`)});