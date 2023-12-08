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


async function deleteRecord(row) {
    const idNo = row.dataset.id;
    const dictType = typeDict(row);
    const url = `/production/dict_delete/${dictType}/${idNo}`;
    showDeleted ? row.querySelector(`[data-name = "deleted"]`).textContent = 'Да' : row.remove();
    await fetch(url);
}

function saveDictionaryRecord(obj) {
    event.preventDefault();
    const updateForm = obj.closest('.form-row');
    const dictionaryType = updateForm.parentElement.id.split('-')[0];
    const fetchPath = '/production/dict_update/' + dictList[dictionaryType];
    saveEditForm(updateForm, fetchPath, dictionaryType)
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
dictBlockContent.forEach(block => {
    block.addEventListener('mouseover', async (event) => {
        const lastRecord = block.querySelector('div[data-last]:not([data-last = ""])')
        if (event.target === lastRecord) {
            const searchString = normalizeSearchString(lastRecord);
            await appendNewRows(lastRecord, block, searchString, showDeleted);
        }
    });
});

/**
 * Listener for new record in dictionary
 * Catch click on addButtons
 * add new row then edit
 */
addEventListener('mousedown', (event) => {
    addButtons.forEach((btn) => {
        if (event.target === btn) {
            const dictBlock = btn.closest('.dict-block');
            const copyRow = dictBlock.querySelector('.dict-block__row_hidden');
            const newRow = copyRowFromHidden(copyRow);
            createEditForm(newRow);
        }
    });
});


/**
 * Listener for '.dict-block__row'
 * edit for click on all element
 * delete element for click on button '.btn-delete'
 */
dictBlockContent.forEach(block => {
    block.addEventListener('click', e => {
        const dictBlockRow = block.querySelectorAll('.dict-block__row');
        dictBlockRow.forEach(row => {
            if (row === e.target.closest('.dict-block__row')) {
                if (e.target.classList.contains('btn_delete')) {
                    deleteRecord(row).then(r => {
                    });
                } else {
                    createEditForm(e.target.closest('.dict-block__row'));
                }
            }
        });
    });
});


// Search
/**
 *
 */
searchButtons.forEach((btn) => {
    btn.addEventListener('mousedown', async (search) => {
        const dictBlock = search.target.closest('.dict-block');
        const searchValue = normalizeSearchStringValue(dictBlock);
        const dictBlockContent = dictBlock.querySelector('.dict-block__content');
        const hiddenRow = dictBlockContent.querySelector('.dict-block__row_hidden');
        const temporaryRow = hiddenRow.cloneNode(true)
        temporaryRow.setAttribute('data-last', '0');
        dictBlockContent.appendChild(temporaryRow);
        dictBlockContent.innerHTML = '';
        dictBlockContent.appendChild(hiddenRow);
        await appendNewRows(temporaryRow, dictBlockContent, searchValue, showDeleted);
        temporaryRow.remove();
    });
});
