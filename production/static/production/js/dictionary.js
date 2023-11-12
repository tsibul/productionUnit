const dictList = {
    country: 'Country',
    producer: 'Producer',
    materialType: 'MaterialType',
    colorScheme: 'ColorScheme',
    color: 'Color',
    detailName: 'DetailName',
    detailInGoods: 'DetailInGoods',
    mainMaterial: 'MainMaterial',
    addMaterial: 'AddMaterial',
    masterBatch: 'MasterBatch',
    recipe: 'Recipe',
    goods: 'Goods',
    imm: 'IMM',
    productRequest: 'ProductionRequest',
    productReport: 'ProductionReport',
    requestStartStop: 'ProductionRequestStartStop',
    productionForRequest: 'ProductionForRequest',
    qualityForRequest: 'QualityForRequest',
    defects: 'Defects',
    defectEvent: 'DefectEvent',
    qualityReport: 'QualityReport',
    qualityReportDefect: 'QualityReportDefects',

    detail: 'DetailInGoods',
    material_type: 'MaterialType',
    main_material_type: 'MaterialType',
    color_scheme: 'ColorScheme',
    detail_in_goods: 'DetailInGoods',
    detail_name: 'DetailName',
    main_material: 'MainMaterial',
    add_material: 'AddMaterial',
    masterbatch: 'MasterBatch',
    main_master: 'MasterBatch',
    add_master: 'MasterBatch',
    product_request: 'ProductionRequest',
    production_request: 'ProductionRequest',
    defect_event: 'DefectEvent',
    production_for_request: 'ProductionForRequest',
    production: 'ProductionReport',
    quality_report: 'QualityReport',
    defect: 'Defects',
};

const addButtons = document.querySelectorAll('.btn_add');
const searchButtons = document.querySelectorAll('.search_submit');
const searchCloseButtons = document.querySelectorAll('.search_clear');
const deleteButtons = document.getElementsByClassName('btn_delete');
const userGroups = document.getElementById('user-group')
const showDeleted = document.getElementById('showDeleted') ? 1 : 0;

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

function userRights() {
    document.querySelectorAll('.color').forEach(row => {
        if (userGroups.value.includes('production')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.detail-in-goods').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.goods').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.main-material').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.add-material').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.masterbatch').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.producer').forEach(row => {
        if (userGroups.value.includes('production')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.recipe').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.imm').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.main-material').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.production-request').forEach(row => {
        if (userGroups.value.includes('production') || userGroups.value.includes('accounts')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.production').forEach(row => {
        if (!userGroups.value.includes('admin') && !userGroups.value.includes('production')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
    document.querySelectorAll('.in-production').forEach(row => {
        if (!userGroups.value.includes('admin') && !userGroups.value.includes('production')) {
            row.onclick = '';
            row.querySelectorAll('.btn').forEach(btn => {
                btn.disabled = true;
                btn.classList.add('form-input__inactive');
            });
        }
    });
    // document.querySelectorAll('.production-list').forEach(row => {
    //     if (!userGroups.value.includes('admin') && !userGroups.value.includes('logistic')) {
    //         row.onclick = '';
    //         row.querySelector('.btn').disabled = true;
    //         row.querySelector('.btn').classList.add('form-input__inactive');
    //     }
    // });
    document.querySelectorAll('.quality-list').forEach(row => {
        if (!userGroups.value.includes('admin') && !userGroups.value.includes('logistic')) {
            row.onclick = '';
            row.querySelector('.btn').disabled = true;
            row.querySelector('.btn').classList.add('form-input__inactive');
        }
    });
}


function typeDict(row) {
    return dictList[row.id.split('-')[0]];
}

function editDictionary(obj) {
    if(obj.classList.contains('fulfilled')) {return}
    const nodeElements = obj.childNodes;
    const objClasses = obj.classList;
    const newNode = document.createElement('form'); // block for new row
    newNode.classList.add('form-row');
    objClasses.forEach(function (el) {
        if (el !== 'dict-block__row') {
            newNode.classList.add(el);
        }
    });
    newNode.id = 'form-dict';
    fillFormNode();

    async function fillFormNode() {
        // let childNode;
        let changes = 0;
        for (const node of nodeElements) {
            if (node.tagName === 'DIV' && !node.hidden) {
                if (node.classList.contains('foreign-key')) {
                    await createDropdown(node);
                } else if (node.classList.contains('bool-field')) {
                    await createBoolean(node);
                } else {
                    await createInput(node);
                }
            }
            node.hidden = true;
        }
        if (changes === 0) {
            return
        }
        obj.querySelector('.id-hidden').setAttribute('form', 'form-dict')
        newNode.appendChild(createButtonBlock());
        obj.appendChild(newNode);

        async function createInput(node) {
            let childInputNode;
            childInputNode = document.createElement('input'); // block for input
            childInputNode.classList.add('form-input', 'dict-block__text', 'dict__form-input');
            if (node.dataset.name != null) {
                childInputNode.name = node.dataset.name;
            } else {
                childInputNode.readOnly = true;
                childInputNode.classList.add('form-input__inactive');
            }
            if (node.classList.contains('date-field')) {
                childInputNode.type = 'datetime-local';
                childInputNode.value = stringToDateTime(node.textContent);
            } else {
                childInputNode.type = 'text';
                childInputNode.setAttribute('value', node.textContent);
            }
            newNode.appendChild(childInputNode)
            changes += 1;
        }

        async function createDropdown(node) {
            let childDropdownNode;
            const parentRow = node.closest('.dict-block__row');
            const dictType = dictList[node.dataset.name];
            childDropdownNode = document.createElement('div');
            childDropdownNode.innerHTML = dropdownCode;
            childDropdownNode = childDropdownNode.firstElementChild;
            childDropdownNode.querySelector('.dropdown__hidden').name = node.dataset.name;
            const filterModel = dictList[node.dataset.filter];
            const ulContent = childDropdownNode.querySelector('.dropdown__content');
            let jsonUrl;
            if (filterModel && parentRow.dataset.id !== 'e') {
                const filterNo = parentRow.querySelector(`[data-name = "${node.dataset.filter}"]`).dataset.id;
                jsonUrl = `/production/dictionary_json_filter/${dictType}/${filterModel}/${Number.parseInt(filterNo)}`;
            } else if (!filterModel) {
                jsonUrl = `/production/dictionary_json_filter/${dictType}/default/0`;
            } else {
                childDropdownNode.querySelector('.dropdown__hidden').dataset.filter = node.dataset.filter;
                jsonUrl = `/production/dictionary_json_filter/default/default/0`;
            }
            const jsonData = await fetchJsonData(jsonUrl);
            const dictionaryList = JSON.parse(jsonData);
            if (!dictionaryList) {
                childDropdownNode.querySelector('.dropdown__hidden').value = Object.keys(dictionaryList[0])[0];
                childDropdownNode.querySelector('.dropdown__input_dict').value = Object.values(dictionaryList[0])[0];
                childDropdownNode.querySelector('.dropdown__input_dict').dataset.value = Object.values(dictionaryList[0])[0];
            }
            fillLines(ulContent, dictionaryList);
            fillFields(node, childDropdownNode);
        }

        async function createBoolean(node) {
            let childBooleanNode
            childBooleanNode = document.createElement('div');
            childBooleanNode.innerHTML = booleanDropdown;
            childBooleanNode = childBooleanNode.firstElementChild;
            childBooleanNode.querySelector('.dropdown__hidden').name = node.dataset.name;
            fillFields(node, childBooleanNode);
        }

        function fillFields(node, childResNode) {
            childResNode.querySelector('.dropdown__input').value = node.textContent.replace(/\s+/g, ' ');
            childResNode.querySelector('.dropdown__input').dataset.value = node.textContent.replace(/\s+/g, ' ');
            childResNode.querySelector('.dropdown__hidden').value = node.dataset.id;
            newNode.appendChild(childResNode);
            changes += 1;
        }
    }
}

function cancelEditDictionary(obj) {
    const parentObj = obj.closest('.form-row');
    const row = obj.closest('.dict-block__row');
    parentObj.remove();
    const elementId = row.dataset.id;
    if (elementId === 'e') {
        row.remove();
        return;
    }
    row.childNodes.forEach(function (element) {
        if (element.hidden) {
            element.hidden = false
        }
    });
    row.querySelector('.id-hidden').setAttribute('form', '');
}

function createButtonBlock() {
    /* create button block for buttons submit & cancel */
    let childNode;
    const buttonBlock = document.createElement('div');
    buttonBlock.classList.add('dict__button-block', 'button-block'); // block for buttons submit & cancel
    childNode = document.createElement('button'); //button cancel
    childNode.innerHTML = '<i class="fa fa-solid fa-xmark" ></i>';
    childNode.classList.add('btn', 'btn-close', 'dict__btn');
    childNode.setAttribute('onclick', 'event.stopPropagation(); cancelEditDictionary(this);');
    childNode.type = 'button';
    buttonBlock.appendChild(childNode);
    childNode = document.createElement('button'); // button submit
    childNode.innerHTML = '<i class="fa fa-solid fa-check"></i>';
    childNode.classList.add('btn', 'btn-save', 'dict__btn');
    childNode.setAttribute('onclick', 'event.stopPropagation(); saveDictionaryRecord(this);');
    childNode.type = 'submit';
    buttonBlock.appendChild(childNode);
    return buttonBlock;
}

function saveDictionaryRecord(obj) {
    event.preventDefault();
    const updateForm = obj.closest('.form-row');
    const dictionaryType = updateForm.parentElement.id.split('-')[0];
    const fetchPath = '/production/dict_update/' + dictList[dictionaryType];
    const formData = new FormData(updateForm);
    fetch(fetchPath, {
        method: 'POST',
        body: formData,
    })
        .then(async () => {
            const formFields = updateForm.querySelectorAll('[name]');
            const parentRow = updateForm.closest('.dict-block__row');
            formFields.forEach((field) => {
                if (!field.classList.contains('dropdown__hidden')) {
                    parentRow.querySelector(`[data-name = ${field.name}]`).textContent = field.value;
                } else {
                    parentRow.querySelector(`[data-name = ${field.name}]`).textContent =
                        field.parentElement.querySelector('.dropdown__input').value;
                }
            });
            updateForm.remove();
            parentRow.childNodes.forEach(function (element) {
                if (element.hidden) {
                    element.hidden = false
                }
            });
            parentRow.querySelector('.id-hidden').setAttribute('form', '');
            if (parentRow.dataset.id === 'e') {
                const dictType = typeDict(parentRow);
                const jsonUrl = `/production/dictionary_last_id/${dictType}`;
                const jsonData = await fetchJsonData(jsonUrl);
                const idRecord = JSON.parse(jsonData)['id__max'];
                parentRow.dataset.id = idRecord;
                parentRow.querySelector('.id-hidden').value = idRecord;
                parentRow.id = parentRow.id.split('-')[0] + '-' + idRecord;
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

async function appendNewRows(rowCurrent, blockContent, searchString) {
    let newRow;
    const rowCopy = blockContent.querySelector('.dict-block__row_hidden');
    const dictType = typeDict(rowCurrent);
    const jsonUrl = `/production/json_dict_next_20/${dictType}/${rowCurrent.dataset.last}/default/${searchString}/${showDeleted}`;
    const jsonData = await fetchJsonData(jsonUrl);
    const nextRecords = JSON.parse(jsonData);
    let i = 0;
    nextRecords.forEach((record) => {
        i++;
        newRow = rowCopy.cloneNode(true);
        fillNewRow(record, i, newRow);
        newRow.classList.remove('dict-block__row_hidden');
        if (i === 20) {
            newRow.dataset.last = Number.parseInt(rowCurrent.dataset.last) + 20;
        }
        blockContent.appendChild(newRow);
    });
    rowCurrent.dataset.last = '';
}

async function fillNewRow(record, i, newRow) {
    const newRowElements = newRow.querySelectorAll('div[data-field]:not([data-field = ""])')
    newRow.dataset.id = record['id'];
    newRow.id = newRow.id.slice(0, -1) + record['id'];
    newRow.querySelector('.id-hidden').value = record['id'];
    const square = newRow.querySelector('.hex');
    if (square) {
        square.style.backgroundColor = record['hex'];
    }

    for (const rowElement of newRowElements) {
        let fieldName = rowElement.dataset.field;
        if (rowElement.classList.contains('foreign-key')) {
            rowElement.dataset.id = record[fieldName + '_id'];
            if (fieldName === 'customer_group') {
                if (record[fieldName] !== null) {
                    let groupUrl = `/production/customer_group_json`;
                    let groupData = await fetchJsonData(groupUrl);
                    let customerGroups = JSON.parse(groupData);
                    let groupElement = customerGroups.filter((el) => {
                        return el['id'] === record[fieldName]
                    });
                    rowElement.textContent = groupElement[0]['group_name'];
                }
            } else {
                let foreignKeyElement;
                if (fieldName !== 'customer_type') {
                    foreignKeyElement = document.getElementById(fieldName);
                } else {
                    foreignKeyElement = document.getElementById('group_type');
                }
                rowElement.textContent = await fetchJsonData(
                    `/production/dict_name/${dictList[fieldName]}/${record[fieldName + '_id']}`);
            }
        } else if (rowElement.classList.contains('bool-field')) {
            rowElement.textContent = record[fieldName] ? 'Да' : 'Нет';
            rowElement.dataset.id = record[fieldName] ? '1' : '0';
        } else if (fieldName.includes('user')) {
            if (record[`${fieldName}_id`]) {
                rowElement.textContent = await fetchJsonData(`/production/user_name/${record[`${fieldName}_id`]}`);
            }
        } else {
            rowElement.textContent = record[fieldName];
            if (rowElement.dataset.field === 'date_close' && record[fieldName]) {
                newRow.classList.add('fulfilled');
            }
        }
    }
}

// Cancel Edit Dictionary
addEventListener('mousedown', function (element) {
    try {
        const parentRow = document.querySelector('form').closest('.dict-block__row')
        if (element.target !== parentRow && !parentRow.contains(element.target)) {
            const buttonClose = document.querySelector('form').querySelector('.btn-close');
            cancelEditDictionary(buttonClose);
        }
    } catch (exception) {
    }
});

// next 20 records
addEventListener('mouseover', async (event) => {
    const lastRecords = document.querySelectorAll('div[data-last]:not([data-last = ""])')
    const rowCurrent = event.target;
    if (rowCurrent.classList.contains('dict-block__row')) {
        const blockContent = rowCurrent.closest('.dict-block__content');
        let searchString = '';
        if (rowCurrent.closest('.dict-block').querySelector('.dict-block__form-input')) {
            searchString = rowCurrent.closest('.dict-block').querySelector('.dict-block__form-input').value;
        }
        if (searchString === '') {
            searchString = 'default';
        }
        // let newRow;
        for (const el of lastRecords) {
            if (el.contains(rowCurrent)) {
                await appendNewRows(rowCurrent, blockContent, searchString);
            }
        }
    }
});
// Edit dictionary
addEventListener('mousedown', (event) => {
    addButtons.forEach((btn) => {
        if (event.target === btn) {
            const dictBlock = btn.closest('.dict-block');
            const blockContent = dictBlock.querySelector('.dict-block__content')
            const copyRow = dictBlock.querySelector('.dict-block__row_hidden');
            const newRow = copyRow.cloneNode(true);
            newRow.id = newRow.id.slice(0, -1) + 'e';
            newRow.dataset.id = 'e';
            copyRow.after(newRow);
            newRow.classList.remove('dict-block__row_hidden');
            editDictionary(newRow);
        }
    });
});
// delete dict
[...deleteButtons].forEach((btn) => {
    btn.addEventListener('mousedown', async event => {
        const row = event.target.closest('.dict-block__row');
        const idNo = row.dataset.id;
        const dictType = typeDict(row);
        row.remove();
        const url = `/production/dict_delete/${dictType}/${idNo}`;
        await fetch(url);
    });
});
// Search
searchButtons.forEach((btn) => {
    btn.addEventListener('mousedown', async (search) => {
        const dictBlock = search.target.closest('.dict-block');
        const searchString = dictBlock.querySelector('.form-input').value;
        let searchValue;
        if (searchString === '') {
            searchValue = 'default';
        } else {
            searchValue = searchString.replaceAll(/  +/g, ' ').replaceAll(' ', '_')
        }
        const dictBlockContent = dictBlock.querySelector('.dict-block__content');
        const hiddenRow = dictBlockContent.querySelector('.dict-block__row_hidden');
        const temporaryRow = hiddenRow.cloneNode(true)
        temporaryRow.setAttribute('data-last', '0');
        dictBlockContent.appendChild(temporaryRow);
        dictBlockContent.innerHTML = '';
        dictBlockContent.appendChild(hiddenRow);
        await appendNewRows(temporaryRow, dictBlockContent, searchValue);
        temporaryRow.remove();
    });
});
