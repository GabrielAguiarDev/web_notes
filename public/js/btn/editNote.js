var editTitulo = document.getElementById('EditTitulo').value
var editConteudo = document.getElementById('EditConteudo').value
var cancelarEdit = document.querySelector('.cancelarEditNote')
var divEdit = document.querySelector('.editar')

function btnEdit(el) {
    document.getElementById(el).style.display = 'block';
    document.getElementById('EditTitulo').value = editTitulo;
    document.getElementById('EditConteudo').value = editConteudo;
    document.getElementById('fundo').style.zIndex = "1";
}

function cancelarEdit(el) {
    document.getElementById(el).style.display = "none";
    document.getElementById('fundo').style.zIndex = "0";
}