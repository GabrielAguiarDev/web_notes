// Nav
let anotacoes = document.querySelector('.anotacoes')
let metas = document.querySelector('.metas')
let outros = document.querySelector('.outros')
let clientes = document.querySelector('.clientes')

// Menu
let perfil = document.querySelector('.perfil');
let config = document.querySelector('.config');
let fechar = document.querySelector('.bx-chevron-right');

// Script para o nav
anotacoes.onclick = function () {
    anotacoes.classList.toggle("active")
}

metas.onclick = function () {
    metas.classList.toggle("active")
}

outros.onclick = function () {
    outros.classList.toggle("active")
}

clientes.onclick = function () {
    clientes.classList.toggle("active")
}

// Script para o menu
perfil.onclick = function () {
    perfil.classList.toggle("activePerfil")
    config.classList.toggle("activeConfig")
}

fechar.onclick = function(){
    perfil.classList.remove("activePerfil")
    config.classList.remove("activeConfig")
}
