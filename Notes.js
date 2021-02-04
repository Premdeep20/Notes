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
    }
}
