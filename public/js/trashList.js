// var note = document.getElementById('noteTrash');
// var meta = document.getElementById('metaTrash');
// var cardNotes = document.getElementById('cardNotesTrash').style.display;

// var cardMetas = document.getElementById('cardMetasTrash').style.display;

// meta.onclick = function() {
//     if(cardMetas == 'none') {
//         cardMetas = 'block'
//         meta.classList.add('.activeListTrash')
//         cardNotes = 'none'
//         note.classList.remove('.activeListTrash')
//     }
// }

// note.onclick = function() {
//     if(cardNotes == 'none') {
//         cardNotes = 'block'
//         note.classList.add('.activeListTrash')
//         cardMetas = 'none'
//         meta.classList.remove('.activeListTrash');
//     }
// }

function displayNote() {
    let cardNotes = document.getElementById('cardNotesTrash').style.display;

    if(cardNotes == "none") {
        document.getElementById('cardNotesTrash').style.display = "block";
        document.getElementById('cardMetasTrash').style.display = "none";
    } else { 
        document.getElementById('cardMetasTrash').style.display = "none";
    }
}

function displayMeta() {
    let cardMetas = document.getElementById('cardMetasTrash').style.display;

    if(cardMetas == "none") {
        document.getElementById('cardMetasTrash').style.display = "block";
        document.getElementById('cardNotesTrash').style.display = "none";
    } else { 
        document.getElementById('cardNotesTrash').style.display = "none";
    }
}