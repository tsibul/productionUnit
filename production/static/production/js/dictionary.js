import {createEditForm} from "./func/createEditForm.js";
import {cancelEditRecord} from "./func/cancelEditRecord.js";
import {normalizeSearchString} from "./func/normalizeSearchString.js";
import {appendNewRows} from "./func/appendNewRows.js";
import {copyRowFromHidden} from "./func/copyRowFromHidden.js";
import {deleteRecord} from "./func/deleteRecord.js";
import {userRights} from "./func/userRights.js";
import {normalizeSearchStringValue} from "./func/normalizeSearchStringValue.js";
import {clearSearch} from "./func/clearSearch.js";

const addButtons = document.querySelectorAll('.btn_add');
const searchButtons = document.querySelectorAll('.search_submit');
const showDeleted = document.getElementById('showDeleted') ? 1 : 0;
const dictBlockContent = document.querySelectorAll('.dict-block__content');
const dictBlockList = document.querySelectorAll('.dict-block');
let dragSrcEl = null;

/**
 *
 * @param event
 */
function handleDragStart(event) {
    dragSrcEl = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);
}

/**
 *
 * @param event
 */
function handleDragOver(event) {
    event.preventDefault();
}

/**
 *
 * @param event
 */
function handleDragEnter(event) {
    const header = event.target.closest('.dict-block__header');
    if (header) {
        header.classList.add('over')
    }
}

/**
 *
 * @param event
 */
function handleDragLeave(event) {
    const header = event.target.closest('.dict-block__header');
    if (header) {
        header.classList.remove('over')
    }
}

/**
 *
 * @param event
 * @returns {boolean}
 */
function handleDrop(event) {
    if (dragSrcEl !== this) {
        const sourceClasses = dragSrcEl.className;
        dragSrcEl.className = this.className;
        this.className = sourceClasses;

        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = event.dataTransfer.getData('text/html');

        const thisSearchSubmit = this.querySelector('.search_submit');
        const thisBlock = this.querySelector('.dict-block__content');
        thisBlock.querySelectorAll('div').forEach(row => {
            row.addEventListener('click', e => {
                editDeleteRow(e, row);
            });
        });
        this.querySelector('.btn_add').addEventListener('click', e => {
            addButtonEvent(e, this.querySelector('.btn_add'));
        });
        if (thisSearchSubmit) {
            thisSearchSubmit.addEventListener('click', async e => {
                const btnEvent = searchButtonEvent(thisSearchSubmit, e);
                await appendNewRows(btnEvent[0], btnEvent[2], btnEvent[1], showDeleted, 0);
                btnEvent[0].remove();
            });
            thisSearchSubmit.nextElementSibling.addEventListener('click', e => {
                clearSearch(e.target);
            });
        }
        thisBlock.addEventListener('mouseover', async e => {
            const lastRecord = thisBlock.querySelector('div[data-last]:not([data-last = ""])')
            if (e.target === lastRecord) {
                let searchString = normalizeSearchString(lastRecord);
                if (!searchString) {
                    searchString = '';
                }
                const nextRecords = await appendNewRows(lastRecord, thisBlock, searchString, 0, 0);
                for (let i = 0; i < nextRecords.length; i++) {
                    nextRecords[i].addEventListener('click', e => {
                        editDeleteRow(e, nextRecords[i]);
                    });
                }
            }
        });
        const srcSearchSubmit = dragSrcEl.querySelector('.search_submit');
        const dragBlock = dragSrcEl.querySelector('.dict-block__content');
        dragBlock.querySelectorAll('div').forEach(row => {
            row.addEventListener('click', e => {
                editDeleteRow(e, row);
            });
        });
        dragSrcEl.querySelector('.btn_add').addEventListener('click', e => {
            addButtonEvent(e, dragSrcEl.querySelector('.btn_add'));
        });
        if (srcSearchSubmit) {
            srcSearchSubmit.addEventListener('click', async e => {
                const btnEvent = searchButtonEvent(srcSearchSubmit, e);
                await appendNewRows(btnEvent[0], btnEvent[2], btnEvent[1], showDeleted, 0);
                btnEvent[0].remove();
            });
            srcSearchSubmit.nextElementSibling.addEventListener('click', e => {
                clearSearch(e.target);
            });
        }
        dragBlock.addEventListener('mouseover', async e => {
            const lastRecord = dragBlock.querySelector('div[data-last]:not([data-last = ""])')
            if (e.target === lastRecord) {
                let searchString = normalizeSearchString(lastRecord);
                if (!searchString) {
                    searchString = '';
                }
                const nextRecords = await appendNewRows(lastRecord, dragBlock, searchString, 0, 0);
                for (let i = 0; i < nextRecords.length; i++) {
                    nextRecords[i].addEventListener('click', e => {
                        editDeleteRow(e, nextRecords[i]);
                    });
                }
            }
        });
    }
    return false;
}

/**
 *
 * @param event
 */
function handleDragEnd(event) {
    dictBlockList.forEach(block => {
        block.querySelector('.dict-block__header').classList.remove('over')
    });
}


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

dictBlockList.forEach(block => {
    block.addEventListener('dragstart', handleDragStart, false);
    block.addEventListener('dragover', handleDragOver, false);
    block.addEventListener('dragenter', handleDragEnter);
    block.addEventListener('dragleave', handleDragLeave);
    block.addEventListener('drop', handleDrop, false);
    block.addEventListener('dragend', handleDragEnd);
});

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
    btn.addEventListener('click', event => {
        event.preventDefault();
        addButtonEvent(event, btn);
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
            editDeleteRow(e, row);
        });
    });
});


// Search
/**
 *
 */
searchButtons.forEach((btn) => {
    btn.addEventListener('mousedown', async (search) => {
        const btnEvent = searchButtonEvent(btn, search);
        await appendNewRows(btnEvent[0], btnEvent[2], btnEvent[1], showDeleted, 0);
        btnEvent[0].remove();
    });
});


/**
 *
 * @param e
 * @param row
 */
function editDeleteRow(e, row) {
    if (row === e.target.closest('.dict-block__row')) {
        if (e.target.classList.contains('btn_delete')) {
            deleteRecord(row, showDeleted).then(r => {
            });
        } else {
            createEditForm(e.target.closest('.dict-block__row'));
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
function addButtonEvent(event, btn) {
    if (event.target === btn) {
        const dictBlock = btn.closest('.dict-block');
        const copyRow = dictBlock.querySelector('.dict-block__row_hidden');
        const newRow = copyRowFromHidden(copyRow);
        createEditForm(newRow);
    }
}

