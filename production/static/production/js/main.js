// Constants
/**
 * object to find classes from name in templates
 * @type {{mainMaterial: string, main_material: string, country: string, defectEvent: string, add_master: string, color: string, detailName: string, production: string, recipe: string, imm: string, goods: string, add_material: string, material_type: string, defect: string, production_for_request: string, qualityReport: string, production_request: string, qualityForRequest: string, color_scheme: string, requestStartStop: string, masterBatch: string, qualityReportDefect: string, defect_event: string, detailInGoods: string, productReport: string, materialType: string, addMaterial: string, main_material_type: string, main_master: string, quality_report: string, detail_name: string, masterbatch: string, productRequest: string, defects: string, producer: string, productionForRequest: string, detail: string, product_request: string, detail_in_goods: string, colorScheme: string}}
 */
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

const userGroups = document.getElementById('user-group')


// end of constants


// Functions

/**
 * Take model name from current row id
 * @param row — row witn id= 'dictionary name'-id
 * @returns {*} — modelName
 */
function typeDict(row) {
    return dictList[row.id.split('-')[0]];
}


/**
 * fetch data from json
 */
function fetchJsonData(jsonUrl) {
    return fetch(jsonUrl)
        .then(response => response.json());
}


/**
 * fill fields with values from object elem
 * add color to square if exists, reformat numeric values adding
 * @param row current row to fill its fields
 * @param element object with field values data
 * @param prefix parameter shows which template we use
 */
function reformatFields(row, element, prefix) {
    const square = row.querySelector('.hex');
    if (square) {
        square.style.backgroundColor = element['hex'];
    }
    for (const key of Object.keys(element)) {
        let keyClass = '.' + prefix + key;
        let rowField = row.querySelector(keyClass);
        if (rowField) {
            if (typeof element[key] === 'number') {
                rowField.textContent = element[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            } else {
                rowField.textContent = element[key]
            }
        }
    }
}

/**
 * Reformat datetime received from html to format which recognize by DB
 * @param dateString datetime receive from html format dd.mm.YYYY HH:ii
 * @returns {string} datetime for db to recognize YYYY-MM-DDHH:ii
 */
function stringToDateTime(dateString) {
    const parts = dateString.split(" ");
    const dateParts = parts[0].split(".");
    const time = parts[1];
    const year = '20' + dateParts[2]; // Преобразовать двузначный год в четырёхзначный
    const month = dateParts[1];
    const day = dateParts[0];
    return `${year}-${month}-${day}T${time}`;
}

/**
 * Create form for edit from row
 * @param obj clickable row
 */
function createEditForm(obj) {
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
    fillFormNode(obj, newNode, nodeElements).then(r => {
    });
}

/**
 * Updates db from update form (looks like rows of inputs)
 * @param updateForm — form to save in DB
 * @param fetchPath — path to url of (dictionary_update in dictionary.py)
 * @param dictType — name of model to update
 */
function saveEditForm(updateForm, fetchPath, dictType) {
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


/**
 * Fill editable form-row from row
 * @foreign-key marker for create dropdown input
 * @bool-field marker for create boolean dropdown
 * @changes number of inputs created in form, if '0' form doesn't create
 * @param obj row to edit
 * @param newNode new form row for edit
 * @param nodeElements nodeList of elements of initial row
 * @returns {Promise<void>}
 */
async function fillFormNode(obj, newNode, nodeElements) {
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

    /**
     * Create input field from initial field
     * @data.name marker if the field is editable if data.name is null input will be inactive
     * @date-field marker for datetime field — to convert to db format
     * @param node initial element to convert to input
     * @returns {Promise<void>}
     */
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

    /**
     * Create dropdown input field from initial field (marker class 'foreign-key')
     * @dataset.filter marker that this dropdown affected on some other field
     * in this case forms filtered dropdown
     * @childDropDownNode - dropdown html template
     * @param node initial element to convert to dropdown input
     * @returns {Promise<void>}
     */
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

    /**
     * Create boolean dropdown input field from initial field (marker class 'bool-field')
     * @param node initial element to convert to boolean dropdown
     * @returns {Promise<void>}
     */
    async function createBoolean(node) {
        let childBooleanNode
        childBooleanNode = document.createElement('div');
        childBooleanNode.innerHTML = booleanDropdown;
        childBooleanNode = childBooleanNode.firstElementChild;
        childBooleanNode.querySelector('.dropdown__hidden').name = node.dataset.name;
        fillFields(node, childBooleanNode);
    }

    /**
     * fill inputs with initial value in case of editing row then append it to form
     * @param node initial element to convert to form input
     * @param childResNode created input element which should be appended to form
     */
    function fillFields(node, childResNode) {
        childResNode.querySelector('.dropdown__input').value = node.textContent.replace(/\s+/g, ' ');
        childResNode.querySelector('.dropdown__input').dataset.value = node.textContent.replace(/\s+/g, ' ');
        childResNode.querySelector('.dropdown__hidden').value = node.dataset.id;
        newNode.appendChild(childResNode);
        changes += 1;
    }
}

/**
 * Create button block to the end of form
 * @returns {HTMLDivElement}
 */
function createButtonBlock() {
    /* create button block for buttons submit & cancel */
    let childNode;
    const buttonBlock = document.createElement('div');
    buttonBlock.classList.add('dict__button-block', 'button-block'); // block for buttons submit & cancel
    childNode = document.createElement('button'); //button cancel
    childNode.innerHTML = '<i class="fa fa-solid fa-xmark" ></i>';
    childNode.classList.add('btn', 'btn-close', 'dict__btn');
    childNode.setAttribute('onclick', 'event.stopPropagation(); cancelEditRecord(this);');
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

/**
 * Cancel edit record — remove form, remove hidden from row
 * remove blank row if there was new record
 * @param obj element of form-row
 */
function cancelEditRecord(obj) {
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

/**
 * Copy row from hidden row which is template for row
 * @param copyRow — original row template (hidden first line in dict html code)
 * @returns {*} — new row for editing
 */
function copyRowFromHidden(copyRow) {
    const newRow = copyRow.cloneNode(true);
    newRow.id = newRow.id.slice(0, -1) + 'e';
    newRow.dataset.id = 'e';
    copyRow.after(newRow);
    newRow.classList.remove('dict-block__row_hidden');
    return newRow;
}

/**
 * Append 20 rows after current row fetch from db
 * fetch url of dictionary_json from dictionary.py
 * @param rowCurrent — current row with last-id != '' after which append records
 * @param blockContent — content block of current dictionary
 * @param searchString — string to search
 * @param shDeleted — parameter if show deleted records
 * @returns {Promise<void>}
 */
async function appendNewRows(rowCurrent, blockContent, searchString, shDeleted) {
    let newRow;
    const rowCopy = blockContent.querySelector('.dict-block__row_hidden');
    const dictType = typeDict(rowCurrent);
    const jsonUrl = `/production/json_dict_next_20/${dictType}/${rowCurrent.dataset.last}/default/${searchString}/${shDeleted}`;
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
    return nextRecords;
}

/**
 * Fills the row with data from object fetched from DB
 * @param record — object from dictionary DB
 * @param i — index of record
 * @param newRow — row to show with fetched data
 * @returns {Promise<void>}
 */
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
            let foreignKeyElement;
            foreignKeyElement = document.getElementById(fieldName);
            rowElement.textContent = await fetchJsonData(
                `/production/dict_name/${dictList[fieldName]}/${record[fieldName + '_id']}`);
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
                const buttons = newRow.querySelectorAll('.btn');
                buttons.forEach(btn => {
                    btn.setAttribute('disabled', true);
                    btn.classList.add('form-input__inactive')
                });

            }
        }
    }
}

/**
 * if search string empty returns 'default'
 * @param record — row from which ou catch search window
 * @returns {string} — returns search sting or 'default'
 */
function normalizeSearchString(record) {
    let searchString = '';
    if (record.closest('.dict-block').querySelector('.dict-block__form-input')) {
        searchString = record.closest('.dict-block').querySelector('.dict-block__form-input').value;
    }
    if (searchString === '') {
        searchString = 'default';
    }
    return searchString;
}

/**
 * function for search button
 * @param block — block from which ou catch search window
 * @returns {*} — returns search sting or 'default'
 */
function normalizeSearchStringValue(block) {
    const searchString = block.querySelector('.form-input').value;
    let searchValue;
    if (searchString === '') {
        searchValue = 'default';
    } else {
        searchValue = searchString.replaceAll(/  +/g, ' ').replaceAll(' ', '_')
    }
    return searchValue;
}

// end of functions