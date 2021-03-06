var Learning = ({
    template: `#apprentice-template`,
	data : function() {
        return {
            store: store
        }
    },
	methods: {
		// Initialize a learning game mode
		initGameLearning : function(){
			store.questionNumber = 1
			store.succeed = ""
			store.apprenticeWin = false
			store.trueAnswer = 0
			store.wrongAnswer = 0
			store.statsAnswer = 0
			store.globalTimeResult = 0
			store.intermediateTime = 0
            chrono : null,
			store.timerID = 0
            goldStar : false
            silverStar : false
            bronzeStar : false
			apprenticePart.methods.setVisible(true)
			this.randomOperands()
			this.oneTableCalculate()
			this.calculateTime()
		},
        // Random method to select 10 operations for one table Apprentice part
		oneTableCalculate : function(){
			if(store.trueAnswer===10){
					store.apprenticeWin=true
					store.succeed=""
					this.stopChrono()
					apprenticePart.methods.setVisible(false)
					this.stats()
                    this.finished()
			}
			if(store.apprenticeWin==!true && store.trueAnswer<10){
				// Display template
				apprenticePart.methods.setVisible(true)

				// Asks a random question
				store.currentOperand = store.operandsArray[store.questionNumber-1]
			}
        },
		// Stop the chrono
		stopChrono : function(){
			clearInterval(store.timerID)
		},
		// Counting the results
		verifyingResult : function(){
			if(this.goodOrBad(arguments)){
				store.succeed = true;
				store.questionNumber++;
				store.trueAnswer++;
				this.oneTableCalculate();
			}
			else{
				store.succeed=false
				store.wrongAnswer++
			}
		},
		// Checking the number of good and bad answers
		goodOrBad : function(arguments){
			var succeed = false
			var currentResult = store.currentOperand * store.currentTable

			if(currentResult==arguments[0]){
				succeed = true
			}
			else{
				succeed = false
			}
			return succeed
		},
		// Calculate the time to do the exercise
		calculateTime : function(){
			var minutes = 0
			var seconds = 0
			var milliSeconds = 0
			store.timerID = 0
			var self = this
			var currentIntermediateTime = 0;
			var start = new Date()

			store.timerID = setInterval(function(){
			var end = new Date()
			currentIntermediateTime = end - start
			currentIntermediateTime = new Date(currentIntermediateTime)


			minutes = currentIntermediateTime.getMinutes()
			seconds = currentIntermediateTime.getSeconds()
			milliSeconds = currentIntermediateTime.getMilliseconds()

			if(minutes<10){
				minutes = 0 + minutes
			}
			if(seconds<10){
				seconds = 0 + seconds
			}
			if(milliSeconds<10){
				milliSeconds = 00 + milliSeconds
			}
			if(milliSeconds<100){
				milliSeconds = 0 +milliSeconds
			}

			store.displayIntermediateTime = minutes + ":" + seconds +":"+ milliSeconds;
			store.intermediateTime = currentIntermediateTime;

			}, 10)
		},
		// Stats & rewards
		stats : function(){
			store.statsAnswer = Math.round((store.trueAnswer - store.wrongAnswer) / (store.questionNumber-1) * 100)
			this.globalTimeCalculate(store.intermediateTime)
			var medal = false;
			if(store.statsAnswer<0){
				store.statsAnswer = 0;
			}

            if(store.globalTimeResult<=store.timeTable[store.currentTable].gold && store.statsAnswer==100){
                store.goldStar = true;
                medal = true;
            }
            else if(store.globalTimeResult<=store.timeTable[store.currentTable].silver && store.statsAnswer>=75){
                store.silverStar = true;
                medal = true;
            }
            else if(store.globalTimeResult<=store.timeTable[store.currentTable].bronze && store.statsAnswer>=50){
                store.bronzeStar = true;
                medal = true;
            }
            else{
                medal = false;
            }
		},
		// Evaluate reformat time for check global time
		globalTimeCalculate : function(intermediateTime){
			var minutes = 0
			var seconds = 0
			var milliSeconds = 0

			currentIntermediateTime = new Date(intermediateTime)

			minutes = currentIntermediateTime.getMinutes()
			seconds = currentIntermediateTime.getSeconds()
			milliSeconds = currentIntermediateTime.getMilliseconds()

			if(minutes<10){
				minutes = 0 + minutes
			}
			if(seconds<10){
				seconds = 0 + seconds
			}
			if(milliSeconds<10){
				milliSeconds = 00 + milliSeconds
			}
			if(milliSeconds<100){
				milliSeconds = 0 +milliSeconds
			}
			// To store and display time for user
			store.displayGlobalTime =  minutes + ":" + seconds +":"+ milliSeconds;

			// To store the time only in seconds
			statsTime = new Date(intermediateTime)
			minutes = statsTime.getMinutes()
			seconds = statsTime.getSeconds()
			milliSeconds = statsTime.getMilliseconds()

			if(minutes<10){
				seconds = seconds + (minutes * 60)
			}
			if(seconds<10){
				seconds = 0 + seconds
			}
			if(milliSeconds<10){
				milliSeconds = 00 + milliSeconds
			}
			if(milliSeconds<100){
				milliSeconds = 0 +milliSeconds
			}
			store.globalTimeResult = seconds;

		},
		// Initialize operands
		randomOperands : function(){
			// Randomize question
			store.operandsArray = store.operands

			var currentIndex = store.operandsArray.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {
			    // Pick a remaining element...
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element.
			    temporaryValue = store.operandsArray[currentIndex];
			    store.operandsArray[currentIndex] = store.operandsArray[randomIndex];
			    store.operandsArray[randomIndex] = temporaryValue;
			}
		},
        // Add in local storage
        finished : function() {
           setLocalStorage(LS_TRAINING_COL, {
                table : store.currentTable,
                wrong : store.wrongAnswer,
                chrono : store.globalTimeResult,
           });
        }
    }
});

/*----------------------
 | Apprentice game part |
  ----------------------*/
var apprenticePart = {
	template : `#apprenticePart`,
	data : function(){
		return {
			store : store,
		};
	},
	methods : {
        setVisible : function(visible){
            var self = this
            store.displayLearning = visible;
        },
    },
	computed:{
		possibleResults: function(){
            var resultTable = []
            store.operands.forEach(function(operand) {
                resultTable.push(operand * store.currentTable)
            });
            resultTable.sort(function(a, b){return 0.5 - Math.round(Math.random())});
            return resultTable
		}
	}
};
