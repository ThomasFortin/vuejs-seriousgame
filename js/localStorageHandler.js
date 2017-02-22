var LS_GLOBAL_NAME = "multiplicationsGame";
var LS_TRAINING_COL = "training";

// Init a new local storage
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

// Set the local storage
function setLocalStorage(col, data) {
    if (!localStorageExist()) {
        initLocalStorage();
    }
    console.log(data);
    var storage = getLocalStorage();
    storage[col].push(data);

    var dataToStore = JSON.stringify(storage);
    localStorage.setItem(LS_GLOBAL_NAME, dataToStore);
}

// Remove the local storage
function removeLocalStorage() {
     localStorage.removeItem(LS_GLOBAL_NAME);
}

// Tell if the local storage exists
function localStorageExist() {
      return LS_GLOBAL_NAME in localStorage ? true : false;
}
