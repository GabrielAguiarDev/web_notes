var btnAddMeta = document.querySelector('.btn-add-Meta')
var cancelarAddMeta = document.querySelector('.cancelarAddMeta')

btnAddMeta.onclick = function() {
    document.getElementById('adicionarMeta').style.display = "block";
    document.getElementById('fundo').style.zIndex = "1";
}

cancelarAddMeta.onclick = function () {
    document.querySelector('.tituloMeta').value = "";
    document.querySelector('.conteudoMeta').value = "";
    document.getElementById('adicionarMeta').style.display = "none";
    document.getElementById('fundo').style.zIndex = "0";
}