const booleanDropdown = `<div class="dropdown report_dropdown dropdown_dict">
                <input name="bool" type="text" class="dropdown__hidden"
                       value="1">
                <div class="dropdown__input-block">
                    <input type="text" class="dropdown__input dropdown__input_dict"
                           placeholder="Поиск.."
                           value="Да"
                           data-value="Да" readonly>
                    <i class="fa fa-solid fa-angle-down"></i>
                </div>
                <ul class="dropdown__content">
                    <li data-value="1"
                        onclick="event.stopPropagation(); selectFromList(this);">Да
                    </li>
                    <li data-value="0"
                        onclick="event.stopPropagation(); selectFromList(this);">Нет
                    </li>
                </ul>
            </div>
`;
const dropdownCode = `
            <div class="dropdown report_dropdown dropdown_dict">
                <input name="" type="text" class="dropdown__hidden"
                       value="">
                <div class="dropdown__input-block">
                    <input type="text" class="dropdown__input dropdown__input_dict"
                           placeholder="Поиск.." onkeyup="filterList(this)"
                           value=""
                           data-value="">
                    <i class="fa fa-solid fa-angle-down"></i>
                </div>
                <ul class="dropdown__content">
                </ul>
            </div>
`;

function filterList(input) {
    let filter, ul, li, a, i;
    filter = input.value.toUpperCase();
    const div = input.closest('.dropdown');
    a = div.getElementsByTagName("li");
    for (i = 0; i < a.length; i++) {
        let txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

async function selectFromList(obj) {
    const parentDropdown = obj.closest('.dropdown');
    const parentForm = parentDropdown.closest('form');
    const inputName = parentDropdown.querySelector('.dropdown__hidden').name;
    const dataFilter = parentForm.querySelector(`[data-filter="${inputName}"]`);
    parentDropdown.querySelector('.dropdown__input').value = obj.textContent.trim().replace(/\s+/g, ' ');
    parentDropdown.querySelector('.dropdown__input').dataset.value = obj.textContent.trim().replace(/\s+/g, ' ');
    parentDropdown.querySelector('.dropdown__hidden').value = obj.dataset.value;
    obj.parentElement.classList.remove('visible');
    if (dataFilter) {
        const filterBlock = dataFilter.closest('.report_dropdown');
        const filterBlockUl = filterBlock.querySelector('ul');
        filterBlockUl.innerHTML = '';
        dataFilter.value = '';
        const dataFilterName = dataFilter.name;
        filterBlockUl.closest('.report_dropdown').querySelector(`.dropdown__input`).value = '';
        filterBlockUl.closest('.report_dropdown').querySelector(`.dropdown__input`).dataset.value = '';
        const jsonUrl =
            `/production/dictionary_json_filter/${dictList[dataFilterName]}/${dictList[inputName]}/${Number.parseInt(obj.dataset.value)}`;
        const jsonData = await fetchJsonData(jsonUrl);
        const dictionaryList = JSON.parse(jsonData);
        fillLines(filterBlockUl, dictionaryList);
    }
}

document.addEventListener('click', element => {
    const dropdown = document.querySelectorAll('.dropdown');
    let obj;
    dropdown.forEach(element => {
        if (element.querySelector('ul').classList.contains('visible')) {
            obj = element;
        }
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
