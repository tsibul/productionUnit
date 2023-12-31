'use strict'

/**
 * fill fields with values from object elem
 * add color to square if exists, reformat numeric values adding
 * @param row current row to fill its fields
 * @param element object with field values data
 * @param prefix parameter shows which template we use
 */
export function reformatFields(row, element, prefix) {
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