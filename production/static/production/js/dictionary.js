const addButtons = document.querySelectorAll('.btn_add');
const searchButtons = document.querySelectorAll('.search_submit');
const searchCloseButtons = document.querySelectorAll('.search_clear');
const showDeleted = document.getElementById('showDeleted') ? 1 : 0;
const dictBlockContent = document.querySelectorAll('.dict-block__content')

window.onload = function () {
    const summary = document.querySelectorAll('.dict-block__header_block-space');
    const fn = function (e) {
        if (e.keyCode === 32) {
            e.preventDefault();
        }
    };
    summary.forEach(el => {
        el.onkeyup = fn;
    });
};

userRights();

function userRights() {
    document.querySelectorAll('.color').forEach(row => {
        if (userGroups.value.includes('production')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.detail-in-goods').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.goods').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.main-material').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.add-material').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.masterbatch').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.producer').forEach(row => {
        if (userGroups.value.includes('production')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.recipe').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.imm').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.main-material').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.production-request').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.production').forEach(row => {
        if (!userGroups.value.includes('admin') && !userGroups.value.includes('production')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.in-production').forEach(row => {
        if (!userGroups.value.includes('admin') && !userGroups.value.includes('production')) {
            row.onclick = '';
            row.querySelectorAll('.btn').forEach(btn => {
                btn.disabled = true;
                btn.classList.add('form-input__inactive');
            });
        }
    });
    document.querySelectorAll('.quality-list').forEach(row => {
        if (!userGroups.value.includes('admin') && !userGroups.value.includes('logistic')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
}


function typeDict(row) {
    return dictList[row.id.split('-')[0]];
}

function editRecord(obj) {
    createEditForm(obj);
}

async function deleteRecord(row) {
    const idNo = row.dataset.id;
    const dictType = typeDict(row);
    const url = `/production/dict_delete/${dictType}/${idNo}`;
    //Костыль для запросов
    if (row.classList.contains('production-request')) {
        const quantity = row.querySelector(`[data-name = "quantity"]`);
        const quantityLeft = quantity.nextElementSibling;
        if (quantity.textContent === quantityLeft.textContent) {
            showDeleted ? row.querySelector(`[data-name = "deleted"]`).textContent = 'Да' : row.remove();
            await fetch(url);
        }
    } // Конец костыля
    else {
        showDeleted ? row.querySelector(`[data-name = "deleted"]`).textContent = 'Да' : row.remove();
        await fetch(url);
    }
}

function saveDictionaryRecord(obj) {
    event.preventDefault();
    const updateForm = obj.closest('.form-row');
    const dictionaryType = updateForm.parentElement.id.split('-')[0];
    const fetchPath = '/production/dict_update/' + dictList[dictionaryType];
    const formData = new FormData(updateForm);
    fetch(fetchPath, {
        method: 'POST',
        body: formData,
    })
        .then(async () => {
            const formFields = updateForm.querySelectorAll('[name]');
            const parentRow = updateForm.closest('.dict-block__row');
            formFields.forEach((field) => {
                if (!field.classList.contains('dropdown__hidden')) {
                    parentRow.querySelector(`[data-name = ${field.name}]`).textContent = field.value;
                } else {
                    parentRow.querySelector(`[data-name = ${field.name}]`).textContent =
                        field.parentElement.querySelector('.dropdown__input').value;
                }
            });
            updateForm.remove();
            parentRow.childNodes.forEach(function (element) {
                if (element.hidden) {
                    element.hidden = false
                }
            });
            parentRow.querySelector('.id-hidden').setAttribute('form', '');
            if (parentRow.dataset.id === 'e') {
                const dictType = typeDict(parentRow);
                const jsonUrl = `/production/dictionary_last_id/${dictType}`;
                const jsonData = await fetchJsonData(jsonUrl);
                const idRecord = JSON.parse(jsonData)['id__max'];
                parentRow.dataset.id = idRecord;
                parentRow.querySelector('.id-hidden').value = idRecord;
                parentRow.id = parentRow.id.split('-')[0] + '-' + idRecord;
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

async function appendNewRows(rowCurrent, blockContent, searchString) {
    let newRow;
    const rowCopy = blockContent.querySelector('.dict-block__row_hidden');
    const dictType = typeDict(rowCurrent);
    const jsonUrl = `/production/json_dict_next_20/${dictType}/${rowCurrent.dataset.last}/default/${searchString}/${showDeleted}`;
    const jsonData = await fetchJsonData(jsonUrl);
    const nextRecords = JSON.parse(jsonData);
    let i = 0;
    nextRecords.forEach((record) => {
        i++;
        newRow = rowCopy.cloneNode(true);
        fillNewRow(record, i, newRow);
        newRow.classList.remove('dict-block__row_hidden');
        if (i === 20) {
            newRow.dataset.last = Number.parseInt(rowCurrent.dataset.last) + 20;
        }
        blockContent.appendChild(newRow);
    });
    rowCurrent.dataset.last = '';
}

async function fillNewRow(record, i, newRow) {
    const newRowElements = newRow.querySelectorAll('div[data-field]:not([data-field = ""])')
    newRow.dataset.id = record['id'];
    newRow.id = newRow.id.slice(0, -1) + record['id'];
    newRow.querySelector('.id-hidden').value = record['id'];
    const square = newRow.querySelector('.hex');
    if (square) {
        square.style.backgroundColor = record['hex'];
    }

    for (const rowElement of newRowElements) {
        let fieldName = rowElement.dataset.field;
        if (rowElement.classList.contains('foreign-key')) {
            rowElement.dataset.id = record[fieldName + '_id'];
            if (fieldName === 'customer_group') {
                if (record[fieldName] !== null) {
                    let groupUrl = `/production/customer_group_json`;
                    let groupData = await fetchJsonData(groupUrl);
                    let customerGroups = JSON.parse(groupData);
                    let groupElement = customerGroups.filter((el) => {
                        return el['id'] === record[fieldName]
                    });
                    rowElement.textContent = groupElement[0]['group_name'];
                }
            } else {
                let foreignKeyElement;
                if (fieldName !== 'customer_type') {
                    foreignKeyElement = document.getElementById(fieldName);
                } else {
                    foreignKeyElement = document.getElementById('group_type');
                }
                rowElement.textContent = await fetchJsonData(
                    `/production/dict_name/${dictList[fieldName]}/${record[fieldName + '_id']}`);
            }
        } else if (rowElement.classList.contains('bool-field')) {
            rowElement.textContent = record[fieldName] ? 'Да' : 'Нет';
            rowElement.dataset.id = record[fieldName] ? '1' : '0';
        } else if (fieldName.includes('user')) {
            if (record[`${fieldName}_id`]) {
                rowElement.textContent = await fetchJsonData(`/production/user_name/${record[`${fieldName}_id`]}`);
            }
        } else {
            rowElement.textContent = record[fieldName];
            if (rowElement.dataset.field === 'date_close' && record[fieldName]) {
                newRow.classList.add('fulfilled');
            }
        }
    }
}

// Cancel Edit Dictionary
addEventListener('mousedown', function (element) {
    try {
        const parentRow = document.querySelector('form').closest('.dict-block__row')
        if (element.target !== parentRow && !parentRow.contains(element.target)) {
            const buttonClose = document.querySelector('form').querySelector('.btn-close');
            cancelEditRecord(buttonClose);
        }
    } catch (exception) {
    }
});

// next 20 records
addEventListener('mouseover', async (event) => {
    const lastRecords = document.querySelectorAll('div[data-last]:not([data-last = ""])')
    const rowCurrent = event.target;
    if (rowCurrent.classList.contains('dict-block__row')) {
        const blockContent = rowCurrent.closest('.dict-block__content');
        let searchString = '';
        if (rowCurrent.closest('.dict-block').querySelector('.dict-block__form-input')) {
            searchString = rowCurrent.closest('.dict-block').querySelector('.dict-block__form-input').value;
        }
        if (searchString === '') {
            searchString = 'default';
        }
        // let newRow;
        for (const el of lastRecords) {
            if (el.contains(rowCurrent)) {
                await appendNewRows(rowCurrent, blockContent, searchString);
            }
        }
    }
});
// Edit dictionary

/**
 * Listener for new record in dictionary
 * Catch click on addButtons
 * add new row then edit
 */
addEventListener('mousedown', (event) => {
    addButtons.forEach((btn) => {
        if (event.target === btn) {
            const dictBlock = btn.closest('.dict-block');
            const blockContent = dictBlock.querySelector('.dict-block__content')
            const copyRow = dictBlock.querySelector('.dict-block__row_hidden');
            const newRow = copyRow.cloneNode(true);
            newRow.id = newRow.id.slice(0, -1) + 'e';
            newRow.dataset.id = 'e';
            copyRow.after(newRow);
            newRow.classList.remove('dict-block__row_hidden');
            editRecord(newRow);
        }
    });
});


/**
 * Listener for '.dict-block__row'
 * edit for click on all element
 * delete element for click on button '.btn-delete'
 */
dictBlockContent.forEach(block => {
    addEventListener('click', e => {
        const dictBlockRow = block.querySelectorAll('.dict-block__row');
        dictBlockRow.forEach(row => {
            if (row === e.target.closest('.dict-block__row')) {
                if (e.target.classList.contains('btn_delete')) {
                    deleteRecord(row).then(r => {
                    });
                } else {
                    editRecord(e.target.closest('.dict-block__row'));
                }
            }
        });
    });
});


// Search
searchButtons.forEach((btn) => {
    btn.addEventListener('mousedown', async (search) => {
        const dictBlock = search.target.closest('.dict-block');
        const searchString = dictBlock.querySelector('.form-input').value;
        let searchValue;
        if (searchString === '') {
            searchValue = 'default';
        } else {
            searchValue = searchString.replaceAll(/  +/g, ' ').replaceAll(' ', '_')
        }
        const dictBlockContent = dictBlock.querySelector('.dict-block__content');
        const hiddenRow = dictBlockContent.querySelector('.dict-block__row_hidden');
        const temporaryRow = hiddenRow.cloneNode(true)
        temporaryRow.setAttribute('data-last', '0');
        dictBlockContent.appendChild(temporaryRow);
        dictBlockContent.innerHTML = '';
        dictBlockContent.appendChild(hiddenRow);
        await appendNewRows(temporaryRow, dictBlockContent, searchValue);
        temporaryRow.remove();
    });
});
