function infoUser(el) {
    document.getElementById(el).style.height = '78px'
    document.getElementById(el).style.visibility = 'visible'    
    document.querySelector(".bx-chevron-down").style.transform = "rotate(180deg)"
}

function closeInfo(el) {
    document.getElementById(el).style.height = '0px'
    document.getElementById(el).style.visibility = 'hidden'
}

// function infoUser(el) {
//     let info = document.getElementById(el).style.visibility
            
//     if(info == "hidden") {
//         document.getElementById(el).style.height = '78px'
//         document.getElementById(el).style.visibility = 'visible'     
//     } else {
//         document.getElementById(el).style.height = '0px'
//         document.getElementById(el).style.visibility = 'hidden'
//     }
// }