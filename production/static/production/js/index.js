'use strict'

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

const detailsOnImm = fillImmRows();

addRequestRows().then(r => {
});

[...produceButtons].forEach(btn => {
    btn.addEventListener('click', () => {
        fillProductionModal(btn);
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

async function fillImmRows() {
    const prefix = 'work__';
    const prodData = await fetch('/production/production_state/1')
        .then(response => response.json());
    const productionData = JSON.parse(prodData);
    const detailsImm = {};
    productionData.forEach(element => {
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

async function addRequestRows() {
    const prefix = 'req__';
    const prodData = await fetch('/production/production_state/0')
        .then(response => response.json());
    // fetchJsonData();
    const productionData = JSON.parse(prodData);
    let newRow;
    productionData.forEach(element => {
        newRow = productionRow.cloneNode(true);
        fillProductionData(newRow, element, prefix);
        productionContent.appendChild(newRow);
    });
}

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
    row.dataset.color = element['color_id'];
    const reqLeft = row.querySelector('.req__left')
    if(reqLeft && reqLeft.textContent === '0'){
        row.querySelector('.btn').classList.add('form-input__inactive');
        row.querySelector('.btn').disabled = true;
    }
}

function fillStartModal(btn) {
    const row = btn.closest('.dict-block__row');
    startModal.querySelector('[name="detail"]').value = row.dataset.detail;
    startModal.querySelector('[name="color"]').value = row.dataset.color;
}

function fillStopModal(btn) {
    const row = btn.closest('.dict-block__row');
    stopModal.querySelector('[name="imm"]').value = row.dataset.id;
}

function fillProductionModal(btn) {
    const row = btn.closest('.dict-block__row');
    productionModal.querySelector('[name="imm"]').value = row.dataset.id;
    productionModal.querySelector('[name="detail"]').value = row.dataset.detail;
    productionModal.querySelector('[name="color"]').value = row.dataset.color;
}

modalSaveButton.addEventListener('submit', () =>{
    modalSaveButton.classList.add('form-input__inactive');
    modalSaveButton.disabled = true;
})