'use strict'

import {typeDict} from "./typeDict.js";
import {fetchJsonData} from "./fetchJsonData.js";
import {fillNewRow} from "./fillNewRow.js";

/**
 * Append 20 rows after current row fetch from db
 * fetch url of dictionary_json from dictionary.py
 * @param rowCurrent — current row with last-id != '' after which append records
 * @param blockContent — content block of current dictionary
 * @param searchString — string to search
 * @param shDeleted — parameter if show deleted records
 * @returns {Promise<void>}
 */
export async function appendNewRows(rowCurrent, blockContent, searchString, shDeleted, unclosed) {
    let newRow;
    const rowCopy = blockContent.querySelector('.dict-block__row_hidden');
    const dictType = typeDict(rowCurrent);
    const jsonUrl = `/production/json_dict_next_20/${dictType}/${rowCurrent.dataset.last}/default/${searchString}/${shDeleted}/${unclosed}`;
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