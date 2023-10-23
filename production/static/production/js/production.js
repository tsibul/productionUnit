'use strict'

const sectionProduction = document.querySelector('.production-list').closest('section');
const productionContent = sectionProduction.querySelector('.dict-block__content');
const productionRow = document.querySelector('#technical-data').querySelector('.production-list');
const qualityModal = document.getElementById('qualityModal');
const modalCloseButton = qualityModal.querySelector('.btn-close');
const quantityApproved = qualityModal.querySelector('#quantity_approved')
const quantityChecked = qualityModal.querySelector('#quantity_checked')


addProducedRows(0, 'default').then(r => {
});

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

quantityApproved.addEventListener('change', () =>{
    if(Number.parseInt(quantityApproved.value) > Number.parseInt(quantityApproved.max)){
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


async function addProducedRows(first_record, order) {
    const prefix = 'req__';
    const prodData = await fetch(`/production/production_list/${first_record}/${order}`)
        .then(response => response.json());
    const productionData = JSON.parse(prodData);
    let newRow;
    productionData.forEach(element => {
        newRow = productionRow.cloneNode(true);
        fillProductionListData(newRow, element, prefix);
        productionContent.appendChild(newRow);
    });

    async function fillProductionListData(row, element, prefix) {
        fillFields(row, element, prefix);
        const quantity = Number.parseInt(row.querySelector('.req__quantity').textContent.replace(' ', ''));
        const quantityChecked = Number.parseInt(row.querySelector('.req__quantity_checked')
            .textContent.replace(' ', ''));
        if (quantity === quantityChecked) {
            const btn = row.querySelector('.btn');
            btn.disabled = true;
            btn.classList.add('form-input__inactive')
        }
        row.dataset.id = element['production_id'];
    }
}

