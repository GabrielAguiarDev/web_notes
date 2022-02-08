// Script para abrir menu
let perfil = document.querySelector('.perfil')
let config = document.querySelector('.config')
let fecharConfig = document.querySelector('.bx-chevron-right')
let fundoNavbar = document.getElementById('fundoNavbar')

perfil.onclick = function() {
    perfil.classList.toggle('activePerfil')
    config.classList.toggle('activeConfig')
    document.getElementById('fundoNavbar').style.zIndex = "2"
}

fecharConfig.onclick = function () {
    perfil.classList.toggle('activePerfil')
    config.classList.toggle('activeConfig')
    document.getElementById('fundoNavbar').style.zIndex = "0"
}

fundoNavbar.onclick = function () {
    perfil.classList.toggle('activePerfil')
    config.classList.toggle('activeConfig')
    document.getElementById('fundoNavbar').style.zIndex = "0"
}