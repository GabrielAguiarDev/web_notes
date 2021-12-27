module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }

        req.flash("error_msg", "Você precisa ser Admin")
        console.log("Você precisa ser Admin")
        res.redirect('/')
    },

    logado: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }

        req.flash("error_msg", "Você precisa estar logado")
        console.log("Você precisa estar logado")
        res.redirect('/')
    }
}