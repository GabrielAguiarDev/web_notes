var btnAddNote = document.querySelector('.btn-add-Note')
var cancelarAddNote = document.querySelector('.cancelarAddNote')

btnAddNote.onclick = function() {
    document.getElementById('adicionarNote').style.display = "block";
}

cancelarAddNote.onclick = function () {
    document.querySelector('.tituloNote').value = "";
    document.querySelector('.conteudoNote').value = "";
    document.getElementById('adicionarNote').style.display = "none";
}