// Imports
    const express = require('express');
    // const session = require('express-session');
    const flash = require('connect-flash');
    const cookieParser = require('cookie-parser');
    const cookieSession = require('cookie-session');
    const app = express();
    const fs = require('fs');
    const https = require('https');
    const cors = require('cors')
    const path = require('path');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const passport = require('passport');
    require('dotenv').config();
    require('./config/auth')(passport);
    require('./config/passport-setup');

// Porta
    const portaHTTP = process.env.PORT || 3000;
    const portaHTTPS = process.env.PORT || 3001;

//  Session
    // app.use(session({
    //     secret: process.env.SECRET,
    //     resave: true,
    //     saveUninitialized: true
    // }));
    app.use(cookieSession({
        maxAge: 24*60*60*1000,
        keys:[process.env.SECRET]
      }))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser());
    app.use(flash());
    app.use(cors());

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
    mongoose.connect(process.env.MONGOOSE_CONNECT).then(()=> {
        console.log("MongoDB connected...")
    }).catch((err)=> {
        console.log("Houve um erro ao se conectar ao MongoDB: " + err)
    })

// Rotas

    // Basic Routes
    app.use('/', require('./routes/pages'));

    // Login - Google
    app.use('/google/callback', require('./routes/pages'));
    app.use('/google', require('./routes/pages'));

    // Perfil
    app.use('/perfil/:name', require('./routes/pages'))

    // Postagem
    app.use('/postagem', require('./routes/pages'));

    // Metas
    app.use('/metas', require('./routes/pages'));

    // Listas
    app.use('/listas', require('./routes/pages'));

    // Lembretes
    app.use('/lembretes', require('./routes/pages'));

    // Textos
    app.use('/textos', require('./routes/pages'));

    // Links
    app.use('/links', require('./routes/pages'));

    // Códigos
    app.use('/codigos', require('./routes/pages'));

    // Temas
    app.use('/temas', require('./routes/pages'))

    // Feedback
    app.use('/feedback', require('./routes/pages'))

    // Lixeira
    app.use('/lixeira', require('./routes/pages'))

    // Admin
    app.use('/admin', require('./routes/pages'))

// Servidor rodando na porta 3000
    app.listen(portaHTTP, ()=>{console.log(`Servidor Rodando na porta HTTP ${portaHTTP}`)});

    https.createServer({
        cert: fs.readFileSync('SSL/code.crt'),
        key: fs.readFileSync('SSL/code.key')
    }, app).listen(portaHTTPS, ()=>{console.log(`Rodando na porta HTTPS ${portaHTTPS}`)})