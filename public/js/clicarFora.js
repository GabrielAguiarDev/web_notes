var fundo = document.getElementById('fundo')

fundo.onclick = function() {
    document.getElementById('fundo').style.zIndex = "0";

    // Add Note
    document.querySelector('.tituloNote').value = "";
    document.querySelector('.conteudoNote').value = "";
    document.getElementById('adicionarNote').style.display = "none";

    // Add Meta
    document.querySelector('.tituloMeta').value = "";
    document.querySelector('.conteudoMeta').value = "";
    document.getElementById('adicionarMeta').style.display = "none";
}
    