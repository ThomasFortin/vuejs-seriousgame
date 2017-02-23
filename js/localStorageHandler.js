var LS_GLOBAL_NAME = "multiplicationsGame";
var LS_TRAINING_COL = "training";
var LS_FINISHED_TABLES_COL = "finished";

// Init a new local storage
function initLocalStorage() {
    var newStore = JSON.stringify({
        [LS_TRAINING_COL] : [],
        [LS_FINISHED_TABLES_COL] : []
    });

    localStorage.setItem(LS_GLOBAL_NAME, newStore);
}

// Return the complete local storage
function getLocalStorage() {
    return JSON.parse(localStorage.getItem(LS_GLOBAL_NAME));
}

// Set the local storage
function setLocalStorage(col, data) {
    if (!localStorageExists()) {
        initLocalStorage();
    }
    // Get the local storage and store it in a variable
    var storage = getLocalStorage();

    // Push the new data in the right column of the local storage
    storage[col].push(data);

    // Check if the played table has already been played
    var isTablePresent = false;
    for (var table of storage[LS_FINISHED_TABLES_COL]) {
        if (table == data.table) {
            isTablePresent = true;
            break;
        }
    }
    // If not, we add it in the finished tables column
    if (!isTablePresent) {
        storage[LS_FINISHED_TABLES_COL].push(data.table);
    }

    var dataToStore = JSON.stringify(storage);
    localStorage.setItem(LS_GLOBAL_NAME, dataToStore);
}

// Remove the local storage
function removeLocalStorage() {
     localStorage.removeItem(LS_GLOBAL_NAME);
     location.reload();
}

// Tell if the local storage exists
function localStorageExists() {
      return LS_GLOBAL_NAME in localStorage ? true : false;
}
