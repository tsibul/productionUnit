'use strict'

/**
 * Imports
 */
import {reformatFields} from "./func/reformatFields.js";
import {openModal} from "./func/openModal.js";
import {selectFromList} from "./func/dropdown/selectFromList.js";
import {dropDownListenerVisible} from "./func/dropdown/dropDownListenerVisible.js";

/**
 * constants
 * @type {HTMLElement}
 */
const sectionInProduction = document.querySelector('.in-production').closest('section');
const sectionProduction = document.querySelector('.production').closest('section');
const productionContent = sectionProduction.querySelector('.dict-block__content');
const inProductionContent = sectionInProduction.querySelector('.dict-block__content');
const productionRow = document.querySelector('#technical-data').querySelector('.production');
const startModal = document.getElementById('startModal');
const stopModal = document.getElementById('stopModal');
const stopButtons = sectionInProduction.querySelectorAll('.btn-close');
const productionModal = document.getElementById('productionModal');
const modalSaveButton = productionModal.querySelector('.btn-save');
const produceButtons = sectionInProduction.querySelectorAll('.btn-save');
const inWorkLocal = JSON.parse(document.getElementById('in-work').textContent);
const onRequestLocal = JSON.parse(document.getElementById('on-request').textContent);
const startModalLines = startModal.querySelectorAll('li');

/**
 * Scripts
 * @type {Promise<{}>}
 */
const detailsOnImm = fillImmRows();
await addRequestRows();

[...produceButtons].forEach(btn => {
    btn.addEventListener('click', () => {
        fillProductionModal(btn, productionModal);
        openModal(productionModal);
    });
});

[...stopButtons].forEach(btn => {
    btn.addEventListener('click', () => {
        fillStopModal(btn);
        openModal(stopModal);
    });
});

productionContent.addEventListener('click', e => {
    const startButtons = productionContent.querySelectorAll('.btn-close');
    startButtons.forEach(btn => {
        if (btn === e.target) {
            fillStartModal(btn);
            openModal(startModal);
        }
    });
})

startModal.querySelector('.dropdown').addEventListener('click', e => {
    dropDownListenerVisible(startModal.querySelector('.dropdown'), e);
});

startModalLines.forEach(line =>{
    line.addEventListener('click', async e => {
        e.stopPropagation();
        await selectFromList(e.target);
    });
});

/**
 * save modal data
 */
modalSaveButton.addEventListener('mousedown', e =>{
    document.querySelectorAll('.btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('form-input__inactive');
    const currentForm = e.target.closest('form');
    const currentModal = e.target.closest('.login');
    currentModal.style.display = 'none';
    currentForm.submit();
    })
})

/**
 * Functions
 */

/**
 *
 * @returns {Promise<void>}
 */
async function addRequestRows() {
    const prefix = 'req__';
    let newRow;
    onRequestLocal.forEach(element => {
        newRow = productionRow.cloneNode(true);
        fillProductionData(newRow, element, prefix, detailsOnImm);
        productionContent.appendChild(newRow);
    });
}

/**
 *
 * @returns {Promise<{}>}
 */
async function fillImmRows() {
    const prefix = 'work__';
    const detailsImm = {};
    inWorkLocal.forEach(element => {
        let newRow = inProductionContent.querySelector('[data-id="' + element['imm_id'] + '"]');
        detailsImm[element['detail'].split(' ')[0]] = newRow.querySelector('.work__imm').textContent;
        fillProductionData(newRow, element, prefix);
        [...newRow.querySelectorAll('.btn')].forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('form-input__inactive');
        });
    });
    return detailsImm;
}

/**
 *
 * @param row
 * @param element
 * @param prefix
 * @returns {Promise<void>}
 */
async function fillProductionData(row, element, prefix) {
    if (row.querySelector('.req__queue')) {
        let detailName = element['detail'].split(' ')[0];
        const detOnImm = await detailsOnImm;
        if ([...Object.keys(detOnImm)].includes(detailName)) {
            row.querySelector('.req__queue').textContent = detOnImm[detailName];
        }
    }
    reformatFields(row,element,prefix);
    row.dataset.detail = element['detail_id'];
    row.dataset.color = element['code'];
    const reqLeft = row.querySelector('.req__left')
    if(reqLeft && reqLeft.textContent === '0'){
        row.querySelector('.btn').classList.add('form-input__inactive');
        row.querySelector('.btn').disabled = true;
    }
}

/**
 *
 * @param btn
 */
function fillStopModal(btn) {
    const row = btn.closest('.dict-block__row');
    stopModal.querySelector('[name="imm"]').value = row.dataset.id;
}

/**
 *
 * @param btn
 */
function fillStartModal(btn) {
    const row = btn.closest('.dict-block__row');
    startModal.querySelector('[name="detail"]').value = row.dataset.detail;
    startModal.querySelector('[name="color"]').value = row.dataset.color;
}


/**
 *
 * @param btn
 */
function fillProductionModal(btn) {
    const row = btn.closest('.dict-block__row');
    productionModal.querySelector('[name="imm"]').value = row.dataset.id;
    productionModal.querySelector('[name="detail"]').value = row.dataset.detail;
    productionModal.querySelector('[name="color"]').value = row.dataset.color;
}

