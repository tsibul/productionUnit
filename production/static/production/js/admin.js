'use strict'

import {createEditForm} from "./func/createEditForm.js";
import {cancelEditRecord} from "./func/cancelEditRecord.js";
import {normalizeSearchString} from "./func/normalizeSearchString.js";
import {appendNewRows} from "./func/appendNewRows.js";
import {copyRowFromHidden} from "./func/copyRowFromHidden.js";
import {deleteRecord} from "./func/deleteRecord.js";
import {normalizeSearchStringValue} from "./func/normalizeSearchStringValue.js";
import {clearSearch} from "./func/clearSearch.js";
import {initDictionary} from "./func/dictionary/initDictionary.js";


const addButtons = document.querySelectorAll('.btn_add');
const searchButtons = document.querySelectorAll('.search_submit');
const searchClearButtons = document.querySelectorAll('.search_clear')
const showDeleted = document.getElementById('showDeleted') ? 1 : 0;
const dictBlockContent = document.querySelectorAll('.dict-block__content');
const detailsList = document.querySelectorAll('summary');


detailsList.forEach(detail =>{
    detail.addEventListener('click', async e => {
        const nodeWithId = e.target.closest('details')
        await initDictionary(nodeWithId, showDeleted);
    }, {once: true});
});

/**
 * prevent open close details on 'space'
 */
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


/**
 * listener if your click outside the form — close form
 */
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

/**
 * listener to append new records to dictionary when you over the last showed
 */
dictBlockContent.forEach(block => {
    block.addEventListener('mouseover', async e => {
        const lastRecord = block.querySelector('div[data-last]:not([data-last = ""])')
        if (e.target === lastRecord) {
            let searchString = normalizeSearchString(lastRecord);
            if (!searchString) {
                searchString = '';
            }
            await appendNewRows(lastRecord, block, searchString, 0, 0);
        }
    });
});


/**
 * Listener for new record in dictionary
 * Catch click on addButtons
 * add new row then edit
 */
addButtons.forEach(btn => {
    btn.addEventListener('click', async event => {
        event.preventDefault();
        await addButtonEvent(event, btn);
    });
});

/**
 * Listener for '.dict-block__row'
 * edit for click on all element
 * delete element for click on button '.btn-delete'
 */
dictBlockContent.forEach(block => {
    block.addEventListener('click', async e => {
        const dictBlockRow = block.querySelectorAll('.dict-block__row');
        for (const row of dictBlockRow) {
            await editDeleteRow(e, row);
        }
    });
});


// Search
/**
 * renew dict records according to search conditions
 */
searchButtons.forEach((btn) => {
    btn.addEventListener('mousedown', async (search) => {
        const btnEvent = searchButtonEvent(btn, search);
        await appendNewRows(btnEvent[0], btnEvent[2], btnEvent[1], showDeleted, 0);
        btnEvent[0].remove();
    });
});

/**
 * listener for clear search input
 */
searchClearButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        clearSearch(btn);
    });
});

/**
 *
 * @param e
 * @param row
 */
async function editDeleteRow(e, row) {
    if (row === e.target.closest('.dict-block__row')) {
        if (e.target.classList.contains('btn_delete')) {
            await deleteRecord(row, showDeleted);
        } else {
            await createEditForm(e.target.closest('.dict-block__row'));
        }
    }
}

/**
 *
 * @param btn
 * @param search
 * @returns {Promise<void>}
 */
function searchButtonEvent(btn, search) {
    const dictBlock = search.target.closest('.dict-block');
    const searchValue = normalizeSearchStringValue(dictBlock);
    const dictBlockContent = dictBlock.querySelector('.dict-block__content');
    const hiddenRow = dictBlockContent.querySelector('.dict-block__row_hidden');
    const temporaryRow = hiddenRow.cloneNode(true)
    temporaryRow.setAttribute('data-last', '0');
    dictBlockContent.appendChild(temporaryRow);
    dictBlockContent.innerHTML = '';
    dictBlockContent.appendChild(hiddenRow);
    return [temporaryRow, searchValue, dictBlockContent];
}

/**
 *
 * @param event
 * @param btn
 */
async function addButtonEvent(event, btn) {
    if (event.target === btn) {
        const dictBlock = btn.closest('.dict-block');
        const copyRow = dictBlock.querySelector('.dict-block__row_hidden');
        const newRow = copyRowFromHidden(copyRow);
        await createEditForm(newRow);
    }
}

