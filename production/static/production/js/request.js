// Constants

const requestRows = document.getElementsByClassName('dict-block__row');
const reduceButtons = document.getElementsByClassName('btn-reduce');

const addButton = document.querySelector('.btn_add');
const searchButton = document.querySelector('.search_submit');
const searchCloseButton = document.querySelector('.search_clear');
const deleteButtons = document.getElementsByClassName('btn_delete');
const showDeleted = document.getElementById('showDeleted') ? 1 : 0;

// Constants end


// Executable

userRightsForRequests(); // block buttons according user rights
requestRows.forEach(row => {
    const rowId = row.querySelector('.id-hidden').value;
});

document.addEventListener('click', async event => {
    for (const btn of reduceButtons) {
        if (btn === event.target) {
            const row = btn.closest('.dict-block__row');
            const requestId = row.querySelector('.id-hidden').value;


            const reduceUrl = `/production_request_close/${requestId}`;
            await fetch(reduceUrl);
        }
    }
});

// Endexecutable


// Functions
/**
 * check user rights using userGroups var
 */
function userRightsForRequests() {
    requestRows.forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
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
// End of functions