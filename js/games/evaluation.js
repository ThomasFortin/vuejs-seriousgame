var Evaluation = ({
    template: `#evaluation-template`,
    data: function() {
        return {
            store: store
        }
    },
	methods: {
		// Initialize the evaluation mode game
		initGameEvaluation : function(){
			store.questionNumber = 1
			store.succeed = ""
			store.evaluationWin = false
			store.trueAnswer = 0
			store.wrongAnswer = 0
			store.statsAnswer = 0
			store.globalTimeResult = 0
			store.intermediateTime = 0
			store.timerID = 0
			evaluationPart.methods.setVisible(true)
			this.randomOperands()
			this.randomTable()
			this.allTableCalculate()
			this.calculateTime()
		},	
		// Global table calculation
		allTableCalculate : function(){
			if(store.trueAnswer===10){
                store.evaluationWin=true
                store.succeed=""
                this.stopChrono()
                evaluationPart.methods.setVisible(false)
                this.stats()	
			}

			if(store.evaluationWin==!true && store.trueAnswer<10){
				// Display the template
				evaluationPart.methods.setVisible(true)
		
				// Asks a random question
				store.currentOperand = store.operandsArray[store.questionNumber-1]
				store.currentTable = store.tableArray[store.questionNumber-1]	
			}

		},
		//Stop the chrono
		stopChrono : function(){
			clearInterval(store.timerID)
		},
		// Counting the results
		verifyingResult : function(){	
			if(this.goodOrBad(arguments)){
				store.succeed = true;
				store.questionNumber++;
				store.trueAnswer++;	
				this.allTableCalculate();
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
            if(store.globalTimeResult<=store.timeTable[10].gold && store.statsAnswer==100){
                    store.goldStar = true;
                    medal = true;
                }
                else if(store.globalTimeResult<=store.timeTable[10].silver && store.statsAnswer>=75){
                    store.silverStar = true;
                    medal = true;
                }
                else if(store.globalTimeResult<=store.timeTable[10].bronze && store.statsAnswer>=50){
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
		// Initialize random tables
		randomTable : function(){
			// Randomize tables
			store.tableArray = store.table
			var currentIndex = store.tableArray.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {
			    // Pick a remaining element...
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element.
			    temporaryValue = store.tableArray[currentIndex];
			    store.tableArray[currentIndex] = store.tableArray[randomIndex];
			    store.tableArray[randomIndex] = temporaryValue;
			}
		}
	}
});

/*-----------------------
 | Evaluation game part |
  ----------------------*/
var evaluationPart = {
	template : `#evaluationPart`,
	data : function(){
		return { 
			store : store,						
		};
	},
	methods : {	
        setVisible : function(visible){
            var self = this
            store.displayEvaluation = visible;
		},
	},
	computed:{
		possibleResults: function(){
            /*
			var resultTable = []
            resultTable.push(store.currentOperand * store.currentTable)
            if (store.currentOperand >=3 && store.currentOperand <= 7) {
                for (i = 1; i < 3; i++) {
                    resultTable.push((store.currentOperand + i) * store.currentTable)
                    resultTable.push((store.currentOperand - i) * store.currentTable)
                }
            }
			return resultTable
            */
			var resultTable = []
            resultTable.push(store.currentOperand * store.currentTable)
			store.operands.forEach(function(operand) {
                if (resultTable.length < 4) {
                    if (operand != store.currentOperand) {
                        resultTable.push(operand * store.currentTable)
                    }
                }
			});
            // Randomize the possible result array
            // To prevent the child from counting on his fingers
            resultTable.sort(function(a, b){return 0.5 - Math.random()});
			return resultTable
		}
	}
};

