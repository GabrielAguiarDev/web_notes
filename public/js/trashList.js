var note = document.querySelector('.noteTrash');
var meta = document.querySelector('.metaTrash');
var cardNotes = document.querySelector('.cardNotesTrash');
var cardMetas = document.querySelector('.cardMetasTrash');

meta.onclick = function() {
    note.classList.remove('.activeListTrash');
}

note.onclick = function() {
    meta.classList.remove('.activeListTrash');
}