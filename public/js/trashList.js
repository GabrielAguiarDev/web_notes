let note = document.querySelector('.lixeiraNote');
let meta = document.querySelector('.lixeiraMeta');

note.onclick = function() {
    note.classList.add('activeListTrash');
    meta.classList.remove('activeListTrash');
    // document.getElementById('cardNotesTrash').style.display = "block";
    // document.getElementById('cardMetasTrash').style.display = "none";
}

meta.onclick = function() {
    meta.classList.add('activeListTrash');
    note.classList.remove('activeListTrash');
    // document.getElementById('cardMetasTrash').style.display = "block";
    // document.getElementById('cardNotesTrash').style.display = "none";
}