import {createEditForm} from "./func/createEditForm.js";
import {cancelEditRecord} from "./func/cancelEditRecord.js";
import {normalizeSearchString} from "./func/normalizeSearchString.js";
import {appendNewRows} from "./func/appendNewRows.js";
import {copyRowFromHidden} from "./func/copyRowFromHidden.js";
import {deleteRecord} from "./func/deleteRecord.js";
import {userRights} from "./func/userRights.js";

const addButtons = document.querySelectorAll('.btn_add');
const searchButtons = document.querySelectorAll('.search_submit');
// const searchCloseButtons = document.querySelectorAll('.search_clear');
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
            await appendNewRows(lastRecord, block, searchString, showDeleted, 0);
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
                    deleteRecord(row, showDeleted).then(r => {
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
        await appendNewRows(temporaryRow, dictBlockContent, searchValue, showDeleted, 0);
        temporaryRow.remove();
    });
});
