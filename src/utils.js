let utils = {};

let closest = (elem, selector) => {

   let matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;

    while (elem) {
        if (matchesSelector.bind(elem)(selector)) {
            return true;
        } else {
            elem = elem.parentElement;
        }
    }
    return false;
}

utils.closest = closest;

export default utils;

