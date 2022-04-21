// Lista
var ajaxAnotacoes = document.querySelector('#anotacoes');
var ajaxMetas = document.querySelector('#metas');
var ajaxListas = document.querySelector('#listas');
var ajaxLembretes = document.querySelector('#lembretes');
var ajaxTextos = document.querySelector('#textos');
var ajaxLinks = document.querySelector('#links');
var ajaxCodigos = document.querySelector('#codigos');

// Div de listagem
var listTrash = document.querySelector('#listTrash');

// AJAX listagem
ajaxAnotacoes.addEventListener("click", function(event){
    event.preventDefault();

    fetch('/lixeira/anotacoes').then((response)=>{
        return response.json();
    }).then((response)=>{
        listTrash.innerHTML = ""
        response.listNotesTrash.forEach((notes)=>{
            let item = document.createElement("div")
            item.classList.add("cardTrash")
            item.innerHTML = '<form action="/note/rescue" method="POST"><input type="hidden" name="titulo" id="tituloTrash" value="'+notes._id+'"><label for="tituloTrash" id="tituloLabel" class="textTrash">'+notes.titulo+'</label><input type="hidden" name="titulo" id="tituloTrash" value="'+notes.titulo+'"><br><label for="conteudoTrash" id="conteudoLabel" class="textTrash">'+notes.conteudo+'</label><input type="hidden" name="conteudo" id="conteudoTrash" value="'+notes.conteudo+'"><button type="submit" id class="btn-rescue"><i class="bx bx-save"></i></button><a id="btnDeleteTrash" class="btn-danger"  href="/trash/delete/'+notes._id+'" onclick="confirm(\'Deseja deletar permanentemente?\');"><i class=\'bx bx-trash\'></i></a><hr class="hrTrash"></form>';

            listTrash.appendChild(item);
        })
    })

})

ajaxMetas.addEventListener("click", function(event){
    event.preventDefault();

    fetch('/lixeira/metas').then((response)=>{
        return response.json();
    }).then((response)=>{
        listTrash.innerHTML = ""
        response.listMetasTrash.forEach((metas)=>{
            let item = document.createElement("div")
            item.classList.add("cardTrash")
            item.innerHTML = '<form action="/meta/rescue" method="POST" id="formRescue"><input type="hidden" name="titulo" id="tituloTrash" value="'+metas._id+'"><span class="star">&#x2B50;</span><label for="tituloTrash" id="tituloLabel" class="textTrash">'+metas.titulo+'</label><input type="hidden" name="titulo" id="tituloTrash" value="'+metas.titulo+'"><br><label for="conteudoTrash" id="conteudoLabel" class="textTrash">'+metas.conteudo+'</label><input type="hidden" name="conteudo" id="conteudoTrash" value="'+metas.conteudo+'"><button type="submit" class="btn-rescue"><i class="bx bx-save"></i></button><a class="btn-danger"  href="/trash/delete/'+metas._id+'" id="btnDeleteTrash" onclick="confirm(\'Deseja deletar permanentemente?\');"><i class=\'bx bx-trash\'></i></a><hr class="hrTrash"></form>';

            listTrash.appendChild(item);
        })
    })
})

ajaxListas.addEventListener("click", function(event){
    event.preventDefault();
})