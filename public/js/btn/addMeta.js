var btnAddMeta = document.querySelector('.btn-add-Meta')
var cancelarAddMeta = document.querySelector('.cancelarAddMeta')

btnAddMeta.onclick = function() {
    document.getElementById('adicionarMeta').style.display = "block";
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(1px)"
    document.getElementById('fundoNavbar').style.zIndex = "1"
    document.getElementById('fundoNavbar').style.pointerEvents = "auto"
}

cancelarAddMeta.onclick = function () {
    document.querySelector('.tituloMeta').value = "";
    document.querySelector('.conteudoMeta').value = "";
    document.getElementById('adicionarMeta').style.display = "none";
    document.getElementById('fundoNavbar').style.backdropFilter = "blur(0px)"
    document.getElementById('fundoNavbar').style.zIndex = "0"
    
}