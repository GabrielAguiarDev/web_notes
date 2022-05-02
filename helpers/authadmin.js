module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        } else {
            req.flash("msg_error", "Você precisa ser Admin")
            console.log("Você precisa ser Admin")
            res.redirect('/login')
        }
    },

    checkAuthenticate: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        } else {
            req.flash("msg_error", "Você precisa estar logado")
            console.log("Você precisa estar logado")
            res.redirect('/login')
        }
    },

    checkLoginIn: function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/')
        } else {
            return next()
        }
    }
}