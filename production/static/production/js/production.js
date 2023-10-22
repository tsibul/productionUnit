const sectionProduction = document.querySelector('.production-list').closest('section');
const productionContent = sectionProduction.querySelector('.dict-block__content');
const productionRow = document.querySelector('#technical-data').querySelector('.production-list');


addProducedRows(0, 'default').then(r => {
});

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
        if(quantity === quantityChecked){
            const btn = row.querySelector('.btn');
            btn.disabled = true;
            btn.classList.add('form-input__inactive')
        }
        row.dataset.id = element['production_id'];
    }
}

