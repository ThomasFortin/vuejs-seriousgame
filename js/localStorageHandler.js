var LS_GLOBAL_NAME = "multiplicationsGame";
var LS_TRAINING_COL = "training";

function initLocalStorage() {
    var newStore = JSON.stringify({
        [LS_TRAINING_COL] : []
    });

    localStorage.setItem(LS_GLOBAL_NAME, newStore);
}

// Return the complete local storage
function getLocalStorage() {
    return JSON.parse(localStorage.getItem(LS_GLOBAL_NAME));
}

// Set the local storage for the given column
function setLocalStorage(data) {
    if (!localStorageExist()) {
        initLocalStorage();
    }
    console.log(data);
    var storage = getLocalStorage();
    storage[LS_TRAINING_COL].push(data);

    var dataToStore = JSON.stringify(storage);
    localStorage.setItem(LS_GLOBAL_NAME, dataToStore);
}

function localStorageExist() {
      return LS_GLOBAL_NAME in localStorage ? true : false;
}
