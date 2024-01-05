'use strict'

import {reformatFields} from "./func/reformatFields.js";
import {openModal} from "./func/openModal.js";
import {closeModal} from "./func/closeModal.js";

const sectionProduction = document.querySelector('.quality-list').closest('section');
const productionContent = sectionProduction.querySelector('.dict-block__content');
// const qualityDetails = sectionProduction.querySelectorAll('.qual__row');
const productionRow = document.querySelector('#technical-data').querySelector('.quality-list');
const qualityDetailsRow = document.querySelector('#technical-data').querySelector('.qual__row');
const reportButton = sectionProduction.querySelector('.dict-block__search').querySelector('.btn');
const startDate = document.getElementById('date-start');
const endDate = document.getElementById('date-end');
const qualityModal = document.getElementById('qualityModal');
const modalCloseButton = qualityModal.querySelector('.btn-close');
const modalSaveButton = qualityModal.querySelector('.btn-save');


reportButton.addEventListener('click', async e => {
    e.preventDefault();
    productionContent.innerHTML = '';
    await addProducedRows(startDate.value, endDate.value);
    sectionProduction.querySelectorAll('.qual__row').forEach(row => {
        row.addEventListener('click', async (event) => {
            if (event.target.classList.contains('btn')) {
                await fillQualityModal(event.target);
                openModal(qualityModal);
            }
        });
    });
})

modalSaveButton.addEventListener('click', e => {
    e.preventDefault();
    const rowSourceId = qualityModal.querySelector('[name = "production"]').value;
    const rowSource = document.querySelector(`[data-id = "${rowSourceId}"]`);
    rowSource.querySelector('.qual__comment').textContent = qualityModal.querySelector('#comment').value
    const checks = qualityModal.querySelector('.modal__block').querySelectorAll('input');
    const defects = rowSource.querySelector('.qual__defects');
    const checkedLabels = Array.from(checks)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => {
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            return label.textContent;
        });
    const checkedLabelsString = checkedLabels.join(', ');
    if (defects.textContent) {
        defects.textContent = defects.textContent + ", " + checkedLabelsString;
    } else {
        defects.textContent = checkedLabelsString;
    }
    const updateForm = qualityModal.querySelector('#production-form')
    const fetchPath = '/production/quality_report_update/';
    const formData = new FormData(updateForm);
    fetch(fetchPath, {
        method: 'POST',
        body: formData,
    }).then(r => closeModal(modalCloseButton));
});

modalCloseButton.addEventListener('click', () => {
    closeModal(modalCloseButton);
});

async function fillQualityModal(btn) {
    const row = btn.closest('details').querySelector('summary');
    const rowCur = btn.closest('.dict-block__row');
    qualityModal.querySelector('[name = "production"]').value = rowCur.dataset.id;
    qualityModal.querySelector('#detail').textContent = row.querySelector('.req__detail').textContent;
    qualityModal.querySelector('#color').textContent = row.querySelector('.req__color').textContent;
    qualityModal.querySelector('#quantity').textContent = row.querySelector('.req__quantity').textContent + ' шт';
    qualityModal.querySelector('#user').textContent = row.querySelector('.req__produce_user').textContent;
    qualityModal.querySelector('#date').textContent = row.querySelector('.req__production_date').textContent;

    qualityModal.querySelector('#quantity_checked').textContent =
        rowCur.querySelector('.qual__quantity_checked').textContent;
    qualityModal.querySelector('#quantity_approved').textContent =
        rowCur.querySelector('.qual__quantity_approved').textContent;
    qualityModal.querySelector('#quantity_approved_defect').textContent =
        rowCur.querySelector('.qual__quantity_approved_defect').textContent;
    qualityModal.querySelector('#defect_event').textContent =
        rowCur.querySelector('.qual__defect_event').textContent;
    qualityModal.querySelector('#comment').textContent =
        rowCur.querySelector('.qual__comment').textContent;
    const defectBlock = qualityModal.querySelector('.modal__block');
    defectBlock.innerHTML = '';
    const defectData = await fetch(`/production/defects_left/${rowCur.dataset.id}`);
    const defectList = JSON.parse(defectData);
    defectList.forEach(defect => {
        defectBlock.insertAdjacentHTML("afterbegin",
            `<div class="modal__check">
                  <input type="checkbox" name="${defect['id']}" id="chck-${defect['id']}">
                  <label for="chck-${defect['id']}">${defect['name']}</label>
                  </div>`);
    });
}


async function addProducedRows(dateBegin, dateEnd) {
    const prefix = 'req__';
    const prodData = await fetch(`/production/quality_list/${dateBegin}/${dateEnd}`)
        .then(response => response.json());
    const productionData = JSON.parse(prodData);
    let newRow;
    productionData.forEach(element => {
        newRow = productionRow.cloneNode(true);
        fillProductionListData(newRow, element, prefix);
        let detRow;
        element['quality_reports'].forEach(el => {
            detRow = qualityDetailsRow.cloneNode(true);
            fillProductionListData(detRow, el, 'qual__');
            newRow.querySelector('.quality-content').appendChild(detRow);
        });
        productionContent.appendChild(newRow);
    });

    async function fillProductionListData(row, element, prefix) {
        reformatFields(row, element, prefix);
        row.dataset.id = element['production_id'];
    }
}

