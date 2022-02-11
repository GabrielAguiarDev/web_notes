var editTitulo = document.getElementById('EditTitulo').value
var editConteudo = document.getElementById('EditConteudo').value
var cancelarEdit = document.querySelector('.cancelarEditNote')
var divEdit = document.querySelector('.editar')

function btnEdit(el) {
    document.getElementById(el).style.display = 'block';
    document.getElementById('EditTitulo').value = editTitulo;
    document.getElementById('EditConteudo').value = editConteudo;
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(1px)"
    document.getElementById('fundoNavbar').style.zIndex = "1"
}

function cancelarEdit(el) {
    document.getElementById(el).style.display = "none";
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(0px)"
    document.getElementById('fundoNavbar').style.zIndex = "0"
}