var editTitulo = document.getElementById('EditTitulo').value
var editConteudo = document.getElementById('EditConteudo').value

function btnEdit(el) {
    let display = document.getElementById(el).style.display;

    if(display == "none") {
        document.getElementById(el).style.display = 'block';
        document.getElementById('EditTitulo').value = editTitulo;
        document.getElementById('EditConteudo').value = editConteudo;
        document.getElementById('fundo').style.zIndex = "1";
    } else {
        document.getElementById(el).style.display = 'none';
        document.getElementById('fundo').style.zIndex = "0";
    }
}