(function readyJS(win, doc) {
    'use strict';

    var form1 = document.querySelector("#");
    var tituloNote = document.querySelector("#");
    var response = document.querySelector(".");
    
    function sendForm(event) {
        let ajax = new XMLHttpRequest();
        let params = 'name='+tituloNote.value;
        event.preventDefault();
        ajax.open('POST','http://localhost:3000');
        ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        ajax.onreadystatechange = function() {
            if(ajax.status === 200 || ajax.readyState === 4) {
                console.log(ajax.responseText);
            };
        };
        ajax.send(params);
    }

    form1.addEventListener('submit', sendForm, false);


})(window, document);

