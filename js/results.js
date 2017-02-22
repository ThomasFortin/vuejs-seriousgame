var Results = { 
    template: `#results-template` ,
    data: function() {
        return {
            results: getLocalStorage()
        }
    },
    methods: {
        removeLocalStorage: function() {
            removeLocalStorage();
        }
    }
}

