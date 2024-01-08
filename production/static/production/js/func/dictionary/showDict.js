'use strict'

export function showDict(rightField, dictToCopy, dictHeader, element) {
    dictToCopy.open = true;
    rightField.appendChild(dictToCopy);
    element.nextElementSibling.classList.add('active');
    if (!dictHeader.classList.contains('active')) {
        dictHeader.classList.add('active');
    }
}