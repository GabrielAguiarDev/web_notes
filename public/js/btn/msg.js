// Mensagem de erro
var btnMsgErro = document.querySelector(".bx-x")
var divMsgErro = document.querySelector(".divMsgErro")

// Mensagem de sucesso
var btnMsgSuccess = document.querySelector(".bx-check")
var divMsgSuccess = document.querySelector(".divMsgSuccess")

btnMsgErro.onclick = function() {
    divMsgErro.classList.add('limparMsg')
}

btnMsgSuccess.onclick = function() {
    divMsgSuccess.classList.add('limparMsg')
}

