// Script para abrir menu
let perfil = document.querySelector('.perfil')
let config = document.querySelector('.config')
let fecharConfig = document.querySelector('.bx-chevron-right')
let fundoNavbar = document.getElementById('fundoNavbar')

perfil.onclick = function() {
    perfil.classList.toggle('activePerfil')
    config.classList.toggle('activeConfig')
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(1px)"
    document.getElementById('fundoNavbar').style.zIndex = "3"
}

fecharConfig.onclick = function () {
    perfil.classList.toggle('activePerfil')
    config.classList.toggle('activeConfig')
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(1px)"
    document.getElementById('fundoNavbar').style.zIndex = "0"
}

fundoNavbar.onclick = function () {
    perfil.classList.remove('activePerfil')
    config.classList.remove('activeConfig')
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(0px)"
    document.getElementById('fundoNavbar').style.zIndex = "0"
}