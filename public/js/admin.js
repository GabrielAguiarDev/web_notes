function infoUser(el) {
    let info = document.getElementById(el).style.visibility;

    if(info == "hidden") {
        document.getElementById(el).style.height = '78px';
        document.getElementById(el).style.visibility = 'visible';
    } else {
        document.getElementById(el).style.height = '0px';
        document.getElementById(el).style.visibility = 'hidden';
    }
}