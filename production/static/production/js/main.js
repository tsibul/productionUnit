const userGroups = document.getElementById('user-group')

function fetchJsonData(jsonUrl) {
    return fetch(jsonUrl)
        .then(response => response.json());
}



function fillFields(row, element, prefix) {
    const square = row.querySelector('.hex');
    if (square) {
        square.style.backgroundColor = element['hex'];
    }
    for (const key of Object.keys(element)) {
        let keyClass = '.' + prefix + key;
        let rowField = row.querySelector(keyClass);
        if (rowField) {
            if (typeof element[key] === 'number') {
                rowField.textContent = element[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            } else {
                rowField.textContent = element[key]
            }
        }
    }
}

function fillLines(ulContent, dictionaryList) {
    let newLine;
    dictionaryList.forEach(elem => {
        newLine = document.createElement('li');
        newLine.onclick = function (event) {
            event.stopPropagation();
            selectFromList(this);
        };
        newLine.dataset.value = Object.keys(elem)[0];
        newLine.textContent = Object.values(elem)[0];
        ulContent.appendChild(newLine);
    });
}

function stringToDateTime(dateString) {
    const parts = dateString.split(" ");
    const dateParts = parts[0].split(".");
    const time = parts[1];
    const year = '20' + dateParts[2]; // Преобразовать двузначный год в четырёхзначный
    const month = dateParts[1];
    const day = dateParts[0];
    return `${year}-${month}-${day}T${time}`;
}