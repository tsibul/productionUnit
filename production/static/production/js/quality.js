'use strict'

const sectionProduction = document.querySelector('.quality-list').closest('section');
const productionContent = sectionProduction.querySelector('.dict-block__content');
const productionRow = document.querySelector('#technical-data').querySelector('.quality-list');
const qualityDetailsRow = document.querySelector('#technical-data').querySelector('.qual__row');
const reportButton = sectionProduction.querySelector('.dict-block__search').querySelector('.btn');
const startDate = document.getElementById('date-start');
const endDate = document.getElementById('date-end');
const qualityModal = document.getElementById('qualityModal');
const modalCloseButton = qualityModal.querySelector('.btn-close');
const quantityApproved = qualityModal.querySelector('#quantity_approved')
const quantityChecked = qualityModal.querySelector('#quantity_checked')


reportButton.addEventListener('click', e => {
    e.preventDefault();
    productionContent.innerHTML = '';
    addProducedRows(startDate.value, endDate.value).then(r => {
    });
})


productionContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        fillQualityModal(event.target);
        openModal(qualityModal);
    }
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

modalCloseButton.addEventListener('click', () => {
    closeModal(modalCloseButton);
});

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
        fillFields(row, element, prefix);
        // const quantity = Number.parseInt(row.querySelector('.req__quantity').textContent.replace(' ', ''));
        // const quantityChecked = Number.parseInt(row.querySelector('.req__quantity_checked')
        //     .textContent.replace(' ', ''));
        // if (quantity === quantityChecked) {
        //     const btn = row.querySelector('.btn');
        //     btn.disabled = true;
        //     btn.classList.add('form-input__inactive')
        // }
        row.dataset.id = element['production_id'];
    }
}

