'use strict'

import {fetchJsonData} from "./fetchJsonData.js";
import {dictList} from "../const/dictList.js";

/**
 * Fills the row with data from object fetched from DB
 * @param record — object from dictionary DB
 * @param i — index of record
 * @param newRow — row to show with fetched data
 * @returns {Promise<void>}
 */
export async function fillNewRow(record, i, newRow) {
    const newRowElements = newRow.querySelectorAll('div[data-field]:not([data-field = ""])');
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
