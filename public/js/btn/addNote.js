var btnAddNote = document.querySelector('.btn-add-Note')
var cancelarAddNote = document.querySelector('.cancelarAddNote')
var cancelarEdit = document.querySelector('.cancelarEditNote')

btnAddNote.onclick = function() {
    document.getElementById('adicionarNote').style.display = "block";
    document.getElementById('fundo').style.zIndex = "1";
}

cancelarAddNote.onclick = function () {
    document.querySelector('.tituloNote').value = "";
    document.querySelector('.conteudoNote').value = "";
    document.getElementById('adicionarNote').style.display = "none";
    document.getElementById('fundo').style.zIndex = "0";
}