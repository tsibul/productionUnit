// Constants


// End of Constants

//Functions


//End of Functions


document.addEventListener('click', element => {
    const dropdown = document.querySelectorAll('.dropdown');
    let obj;
    dropdown.forEach(element => {
        if (element.querySelector('ul').classList.contains('visible')) {
            obj = element;
        }
        // if (element.contains(element.target)) {
        //     element.querySelector('ul').classList.add('visible');
        // }
    });
    if (obj != null && !obj.contains(element.target)) {
        obj.querySelector('ul').classList.remove('visible');
        obj.querySelector('.dropdown__input').value = obj.querySelector('.dropdown__input').dataset.value;
    }
});


document.addEventListener('click', element => {
    const dropdown = document.querySelectorAll('.dropdown');
    dropdown.forEach(dropChild => {
        if (dropChild.contains(element.target)) {
            dropChild.querySelector('ul').classList.add('visible');
        }
    });
});

