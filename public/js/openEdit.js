// let btnEdit = document.querySelector('.btn-edit')
// let formEdit = document.querySelector('.editarNote')
// let cancelarEdit = document.querySelector('.cancelarEdit')

// btnEdit.onclick = function() {
//     formEdit.classList.toggle('.activeEdit')
// }

// cancelarEdit.onclick = function() {
//     formEdit.classList.remove('.activeEdit')
// }

// salvarEdit.onclick = function() {
//     formEdit.classList.remove('.activeEdit')
// }

function Mudarestado(el) {
    let display = document.getElementById(el).style.display;
    let titulo = document.getElementById('Titulo')
    let conteudo = document.getElementById('Conteudo')


    if(display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}