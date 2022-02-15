const iconeSol = document.getElementById('btnTemaLight');
const iconeLua = document.getElementById('btnTemaDark');

function exibirLight(el) {
  document.getElementById(el).style.marginLeft = "0px"
}

function exibirDark(el) {
  document.getElementById(el).style.marginLeft = "43px"
}

function tema(t){
  const ls = localStorage.getItem("tema");

  if(ls) document.body.classList.remove(ls);

  document.body.classList.add(t)
  localStorage.setItem("tema", t);
}

var ls = localStorage.getItem("tema");
  if(ls) document.body.classList.add(ls);