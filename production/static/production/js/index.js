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
const produceButtons = sectionInProduction.querySelectorAll('.btn-save');

fillImmRows().then(r => {
});
addRequestRows().then(r => {
});
console.log('');

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
    productionData.forEach(element => {
        let newRow = inProductionContent.querySelector('[data-id="' + element['imm_id'] + '"]');
        fillProductionData(newRow, element, prefix);
    });
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

function fillProductionData(row, element, prefix) {
    Object.keys(element).forEach((key) => {
        let keyClass = '.' + prefix + key;
        let rowField = row.querySelector(keyClass);
        if (rowField) {
            if (typeof element[key] === 'number') {
                rowField.textContent = element[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            } else {
                rowField.textContent = element[key]
            }
        }
    });
    row.dataset.detail = element['detail_id'];
    row.dataset.color = element['color_id'];
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