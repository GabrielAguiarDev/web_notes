// Script para abrir menu
let perfil = document.querySelector('.perfil')
let config = document.querySelector('.config')
let fecharConfig = document.querySelector('.bx-chevron-right')

perfil.onclick = function() {
    perfil.classList.toggle('activePerfil')
    config.classList.toggle('activeConfig')
}

fecharConfig.onclick = function () {
    perfil.classList.toggle('activePerfil')
    config.classList.toggle('activeConfig')
}