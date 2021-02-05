let editIndex = NaN;
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
        notes.map((note, index) => {
            let item = `<div class="cardContainer">
            <div class="card">
                <h2>${note.title}</h2>
                <p>${note.description}</p>
                <div class="card-buttons-div">
                <p id="${note.title}" class="card-button" onclick="editNote(id,${index})">Edit</p>
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

function titleExistsIndex(notes, title) {
    return notes.findIndex(note => note.title === title);
}

function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('NOTES'));
    let newNotes = notes.filter(note => note.title !== id);
    localStorage.setItem('NOTES', JSON.stringify(newNotes));
    getList();
}

function editNote(id, index) {
    document.getElementById("myModal").style.display = "block";
    let notes = JSON.parse(localStorage.getItem('NOTES'));
    let editNote = notes.filter(note => note.title === id);
    editIndex = index;
    document.getElementById('edit-title').value = editNote[0].title;
    document.getElementById('edit-description').value = editNote[0].description;
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function editTitle(e) {
    document.getElementById('edit-title').value = e.target.value;
}

function editDescription(e) {
    document.getElementById('edit-description').value = e.target.value;
}

function edit() {
    if (!document.getElementById('edit-title').value && !document.getElementById('edit-description').value) {
        alert('Please fill title & description!')
    } else if (!document.getElementById('edit-title').value) {
        alert('Please fill title!')
    } else if (!document.getElementById('edit-description').value) {
        alert('Please fill description!')
    } else {
        let notes = JSON.parse(localStorage.getItem('NOTES'));
        let exists = false;
        let existIndex;
        if (notes) {
            exists = titleExists(notes, document.getElementById('edit-title').value);
            existIndex = titleExistsIndex(notes, document.getElementById('edit-title').value)
        }
        if (exists && existIndex !== editIndex) {
            alert('Title already exists');
        } else {
            let note = {
                title: document.getElementById('edit-title').value,
                description: document.getElementById('edit-description').value,
            };
            if (!notes) {
                notes = [];
            }
            notes[editIndex] = note;
            localStorage.setItem('NOTES', JSON.stringify(notes));
            document.getElementById('edit-title').value = '';
            document.getElementById('edit-description').value = '';
            closeModal();
            getList();
        }
    }
}

function search() {
    document.getElementById("list").innerHTML = '<h1>List of Notes</h1><p>Loading...</p>';
    let notes = JSON.parse(localStorage.getItem('NOTES'));
    setTimeout(function () {
        document.getElementById("list").innerHTML = '<h1>List of Notes</h1>';
        if (notes && notes.length !== 0) {
            const term = document.getElementById("search-note").value.toLowerCase();
            let searchResult = notes.filter(note => {
                return note.title.toLowerCase().includes(term);
            });
            if (searchResult.length > 0) {
                searchResult.map((note, index) => {
                    let item = `<div class="cardContainer">
                    <div class="card">
                        <h2>${note.title}</h2>
                        <p>${note.description}</p>
                        <div class="card-buttons-div">
                        <p id="${note.title}" class="card-button" onclick="editNote(id,${index})">Edit</p>
                        <p id="${note.title}" class="card-button" onclick="deleteNote(id)">Delete</p>
                        </div>
                    </div>
                </div >`;
                    document.getElementById("list").innerHTML += item;
                })
            } else {
                document.getElementById("list").innerHTML += `<p>No notes found!</p>`;
            }
        } else {
            document.getElementById("list").innerHTML += `<p>No notes found!</p>`;
        }
    }, 500)
}
