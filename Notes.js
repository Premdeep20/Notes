function changeTitle(e) {
    document.getElementById('title').value = e.target.value;
}

function changeDescription(e) {
    document.getElementById('description').value = e.target.value;
}

function submit() {
    if (!document.getElementById('title').value && !document.getElementById('description').value) {
        alert('Please fill title & description!')
    } else if (!document.getElementById('title').value) {
        alert('Please fill title!')
    } else if (!document.getElementById('description').value) {
        alert('Please fill description!')
    } else {
        let notes = JSON.parse(localStorage.getItem('NOTES'));
        let exists = false;
        if (notes) {
            exists = titleExists(notes, document.getElementById('title').value);
        }
        if (exists) {
            alert('Title already exists');
        } else {
            let note = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
            };
            if (!notes) {
                notes = [];
            }
            notes.push(note);
            localStorage.setItem('NOTES', JSON.stringify(notes));
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            getList();
        }
    }
}

function getList() {
    let notes = JSON.parse(localStorage.getItem('NOTES'));
    document.getElementById("list").innerHTML = '<h1>List of Notes</h1>';
    if (notes && notes.length !== 0) {
        notes.map((note) => {
            let item = `<div class="cardContainer">
            <div class="card">
                <h2>${note.title}</h2>
                <p>${note.description}</p>
                <div class="card-buttons-div">
                <p id="${note.title}" class="card-button" onclick="deleteNote(id)">Delete</p>
                </div>
            </div>
        </div >`
            document.getElementById("list").innerHTML += item;
        })
    } else {
        document.getElementById("list").innerHTML += `<p>No notes found!</p>`;
    }
}

window.onload = function () {
    getList();
}

function titleExists(notes, title) {
    return !!notes.find(note => note.title === title);
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('NOTES'));
    let newNotes = notes.filter(note => note.title !== id);
    localStorage.setItem('NOTES', JSON.stringify(newNotes));
    getList();
}
