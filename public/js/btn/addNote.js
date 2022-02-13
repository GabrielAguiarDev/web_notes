var btnAddNote = document.querySelector('.btn-add-Note')
var cancelarAddNote = document.querySelector('.cancelarAddNote')

btnAddNote.onclick = function() {
    document.getElementById('adicionarNote').style.display = "block";
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(1px)"
    document.getElementById('fundoNavbar').style.zIndex = "1"
    document.getElementById('fundoNavbar').style.pointerEvents = "auto"
}

cancelarAddNote.onclick = function () {
    document.querySelector('.tituloNote').value = "";
    document.querySelector('.conteudoNote').value = "";
    document.getElementById('adicionarNote').style.display = "none";
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(0px)"
    document.getElementById('fundoNavbar').style.zIndex = "0"

}