/**
 * Constants block
 */
const requestRows = document.querySelectorAll('.dict-block__row');
const dictBlockContent = document.querySelector('.dict-block__content');
const hiddenRow = dictBlockContent.querySelector('.dict-block__row_hidden');
const addButton = document.querySelector('.btn_add');
const searchButton = document.querySelector('.search_submit');
const searchCloseButton = document.querySelector('.search_clear');
const showDeleted = document.getElementById('showDeleted') ? 1 : 0;

/**
 * Executable block
 */

userRightsForRequests(requestRows); // block buttons according user rights

addButton.addEventListener('click', () => {
    const copyRow = dictBlockContent.querySelector('.dict-block__row_hidden');
    const newRow = copyRowFromHidden(copyRow);
    editRecord(newRow);
});

searchButton.addEventListener('mousedown', async () => {
    const dictBlock = dictBlockContent.closest('.dict-block');
    const searchValue = normalizeSearchStringValue(dictBlock);
    const temporaryRow = hiddenRow.cloneNode(true);
    temporaryRow.setAttribute('data-last', '0');
    dictBlockContent.appendChild(temporaryRow);
    dictBlockContent.innerHTML = '';
    dictBlockContent.appendChild(hiddenRow);
    await appendNewRows(temporaryRow, dictBlockContent, searchValue, 0);
    temporaryRow.remove();
});

dictBlockContent.addEventListener('mouseover', async e => {
    const lastRecord = dictBlockContent.querySelector('div[data-last]:not([data-last = ""])')
    if (e.target === lastRecord) {
        const searchString = normalizeSearchString(lastRecord);
        await appendNewRows(lastRecord, dictBlockContent, searchString, 0);
    }
});

document.addEventListener('click', e =>{
    if (dictBlockContent.querySelector('.form-row') && !e.target.closest('.form-row')) {
        cancelEditRecord(dictBlockContent.querySelector('.form-row').firstElementChild);
    }
})

dictBlockContent.addEventListener('click', e => {
    if (e.target.classList.contains('btn_delete')) {
        deleteRequest(e.target.closest('.dict-block__row')).then(r => {
        });
    } else if (e.target.classList.contains('btn_reduce')) {
        reduceRequest(e.target.closest('.dict-block__row')).then(r => {
        });
    } else if (e.target.closest('.dict-block__row')) {
        editRecord(e.target.closest('.dict-block__row'));
    }
});


/**
 * Functions block
 */

/**
 * check user rights using userGroups var
 */
function userRightsForRequests(rows) {
    rows.forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')
            || row.classList.contains('fulfilled')) {
            const buttons = row.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.setAttribute('disabled', true);
                btn.classList.add('form-input__inactive')
            });
        }
    });
}

/**
 * Converts text row to editable
 * !!!! The same name that in dictionary.js
 * @param obj
 */
function editRecord(obj) {
    if (!obj.classList.contains('fulfilled')) {
        createEditForm(obj);
    }
}

/**
 * saves record to ProductionRequest
 * !!!! The same name that in dictionary.js
 * @param obj - save button of form
 */
function saveDictionaryRecord(obj) {
    event.preventDefault();
    const updateForm = obj.closest('.form-row');
    saveEditForm(updateForm, '/production/dict_update/ProductionRequest', 'ProductionRequest')
}

/**
 * Function for deleting production request
 * Delete not allowed if production for this request started
 * @param row - request row to delete
 * @returns {Promise<void>} - call corresponding view function through url (dictionary_delete from dictionary.py)
 */
async function deleteRequest(row) {
    const idNo = row.dataset.id;
    const url = `/production/dict_delete/ProductionRequest/${idNo}`;
    const quantity = row.querySelector(`[data-name = "quantity"]`);
    const quantityLeft = quantity.nextElementSibling;
    if (quantity.textContent === quantityLeft.textContent) {
        showDeleted ? row.querySelector(`[data-name = "deleted"]`).textContent = 'Да' : row.remove();
        await fetch(url);
    }
}

/**
 * Function for closing request if it not totally produced
 * don't allow for requests which are in production now
 * @param row — request row to close (reduce on current state)
 * @returns {Promise<void>} — call corresponding view function through url (production_request_close from dictionary.py)
 */
async function reduceRequest(row) {
    const idNo = row.dataset.id;
    fetch(`production/production_request_close/${idNo}`).then(() => {
        row.querySelector('.btn').disabled = true;
        row.querySelector('.btn').classList.add('form-input__inactive');
        row.classList.add('fulfilled');
    })
}


// End of functions