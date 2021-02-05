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
    document.getElementById("list").innerHTML = '';
    if (notes) {
        notes.map((note) => {
            let item = `<div class="cardContainer">
            <div class="card">
                <h2>${note.title}</h2>
                <p>${note.description}</p>
            </div>
        </div >`
            document.getElementById("list").innerHTML += item;
        })
    }
}

window.onload = function () {
    getList();
}

function titleExists(notes, title) {
    return !!notes.find(note => note.title === title);
}
