'use strict'

/**
 * Imports
 */
import {reformatFields} from "./func/reformatFields.js";
import {closeModal} from "./func/closeModal.js";
import {openModal} from "./func/openModal.js";
import {clearSearch} from "./func/clearSearch.js";
import {normalizeSearchStringValue} from "./func/normalizeSearchStringValue.js";
import {dropDownListenerVisible} from "./func/dropdown/dropDownListenerVisible.js";
import {fetchJsonData} from "./func/fetchJsonData.js";

/**
 * constants
 * @type {HTMLElement}
 */
const sectionProduction = document.querySelector('.production-list').closest('section');
const productionContent = sectionProduction.querySelector('.dict-block__content');
const productionRow = document.querySelector('#technical-data').querySelector('.production-list');
const qualityModal = document.getElementById('qualityModal');
const modalCloseButton = qualityModal.querySelector('.btn-close');
const quantityApproved = qualityModal.querySelector('#quantity_approved');
const quantityChecked = qualityModal.querySelector('#quantity_checked');
const quantityApprovedDefect = qualityModal.querySelector('#quantity_approved_defect');
const unclosed = document.getElementById('unclosed');
const searchButton = document.querySelector('.search_submit');
const searchCloseButton = document.querySelector('.search_clear');
const searchBlock = document.querySelector('.dict-block__search');

/**
 * Main code
 */

await addProducedRows(0, 'default', 1, 'default');

searchButton.addEventListener('click', async e => {
    const searchString = normalizeSearchStringValue(searchBlock);
    const unclosedValue = unclosed.checked === true ? 1 : 0;
    productionContent.innerHTML = '';
    await addProducedRows(0, 'default', unclosedValue, searchString);
});

searchCloseButton.addEventListener('click', e => {
    clearSearch(e.target);
});

unclosed.addEventListener('change', async e => {
    productionContent.innerHTML = '';
    const unclosedValue = unclosed.checked === true ? 1 : 0;
    clearSearch(e.target);
    await addProducedRows(0, 'default', unclosedValue, 'default');
});


/**
 * Modal code
 */

qualityModal.querySelector('.dropdown').addEventListener('click', e => {
    dropDownListenerVisible(qualityModal.querySelector('.dropdown'), e);
});

quantityChecked.addEventListener('change', () => {
    if (Number.parseInt(quantityChecked.value) > Number.parseInt(quantityChecked.max)) {
        quantityChecked.value = quantityChecked.max;
    }
    quantityApproved.max = quantityChecked.value;
});

quantityApproved.addEventListener('change', () => {
    if (Number.parseInt(quantityApproved.value) > Number.parseInt(quantityApproved.max)) {
        quantityApproved.value = quantityApproved.max;
    }
});

quantityApprovedDefect.addEventListener('change', () => {
    if (Number.parseInt(quantityApprovedDefect.value) > Number.parseInt(quantityApproved.value)) {
        quantityApprovedDefect.value = quantityApproved.value;
    }
});

modalCloseButton.addEventListener('click', () => {
    closeModal(modalCloseButton);
});

/**
 * Functions
 */

/**
 *
 * @param btn
 */
function fillQualityModal(btn) {
    const row = btn.closest('.dict-block__row');
    qualityModal.querySelector('[name = "production"]').value = row.dataset.id;
    qualityModal.querySelector('#detail').value = row.querySelector('.req__detail').textContent;
    qualityModal.querySelector('#color').value = row.querySelector('.req__color').textContent;
    qualityModal.querySelector('#imm').value = row.querySelector('.req__imm').textContent;
    const quantity = Number.parseInt(row.querySelector('.req__quantity')
        .textContent.replace(' ', ''));
    const quantity_checked = Number.parseInt(row.querySelector('.req__quantity_checked')
        .textContent.replace(' ', ''));
    qualityModal.querySelector('#to_check').value = quantity - quantity_checked;
    qualityModal.querySelector('#quantity_checked').max = quantity - quantity_checked;
    qualityModal.querySelector('#quantity_approved').max = quantity - quantity_checked;
    qualityModal.querySelector('#user').value = row.querySelector('.req__produce_user').textContent;
    qualityModal.querySelector('#date').value = row.querySelector('.req__production_date').textContent;
}

/**
 *
 * @param first_record
 * @param order
 * @param unclosed
 * @param searchString
 * @returns {Promise<void>}
 */
async function addProducedRows(first_record, order, unclosed, searchString) {
    const prefix = 'req__';
    const prodData = await fetchJsonData(`/production/production_list/${first_record}/${order}/${unclosed}/${searchString}`);
    const productionData = JSON.parse(prodData);
    let newRow;
    productionData.forEach(element => {
        newRow = productionRow.cloneNode(true);
        fillProductionListData(newRow, element, prefix);
        productionContent.appendChild(newRow);
    });
    if (productionData.length >= 20) {
        const lastRecord = productionContent.lastElementChild;
        lastRecord.dataset.last = first_record + 20;
        lastRecord.addEventListener('mouseover', async e => {
            const newFirstRecord = parseInt(lastRecord.dataset.last);
            delete lastRecord.dataset.last;
            await addProducedRows(newFirstRecord, 'default', unclosed, searchString);
        }, {once: true});
    }

    async function fillProductionListData(row, element, prefix) {
        reformatFields(row, element, prefix);
        const quantity = Number.parseInt(row.querySelector('.req__quantity').textContent.replace(' ', ''));
        const quantityChecked = Number.parseInt(row.querySelector('.req__quantity_checked')
            .textContent.replace(' ', ''));
        const btn = row.querySelector('.btn');
        if (quantity === quantityChecked) {
            btn.disabled = true;
            btn.classList.add('form-input__inactive')
        } else {
            btn.addEventListener('click', () => {
                fillQualityModal(btn);
                openModal(qualityModal);
            });
        }
        row.dataset.id = element['production_id'];
    }
}

//
// async function lastRecordListener (lastRecord){
//     const newFirstRecord =  parseInt(lastRecord.dataset.last);
//     lastRecord.dataset.last = null;
//     await addProducedRows(newFirstRecord, 'default');
//     lastRecord.removeEventListener('over', lastRecordListener(lastRecord));
// }