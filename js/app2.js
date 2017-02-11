/*___________________________________________________________
 |															 | 
 |    Serious Game Multiplication Tables for primary v0.1    |
 |__________________________________________________________*/


//Apprentice part
var apprenticePart = {

	template : `#apprenticePart`,
	data : function(){
		return { 
			store : store,
			timeTable : timeTable,
			
		};
	},

	methods : {
		goodOrBad : function(arguments){
			var succeed = false
			var currentResult = store.currentOperand * store.currentTable

			console.log("opération courante : "+ store.currentOperand+ " * "+ store.currentTable  +"\ncurrentResult = "+currentResult+" argument courant : "+ arguments[0])
			

			if(currentResult==arguments[0]){
				succeed = true
				console.log("Résultat de l'opération : "+succeed)

			}
			else{
				succeed = false
				console.log("Résultat de l'opération : "+succeed)
			}
			console.log("succeed : "+succeed)
			return succeed

		},

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
			console.log("Display intermediateTime ->"+store.displayIntermediateTime)
				
			}, 10)		
				
		},

	
	setVisible : function(visible){
			console.log("variable visible = "+visible);
			store.display = visible;
		},


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
			//to store and display time for user
			store.displayGlobalTime =  minutes + ":" + seconds +":"+ milliSeconds;
			
			//to store the time only in seconds
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

	

	stats : function(){

		store.statsAnswer = Math.round((store.trueAnswer - store.wrongAnswer) / store.questionNumber * 100)
		this.globalTimeCalculate(store.intermediateTime)
		var medal = false;

		if(store.globalTimeResult<=timeTable[store.currentTable].gold && store.statsAnswer==100){
			store.goldStar = true;
			medal = true;
		}
		else if(store.globalTimeResult<=timeTable[store.currentTable].silver && store.statsAnswer>=75){
			store.silverStar = true;
			medal = true;
		}
		else if(store.globalTimeResult<=timeTable[store.currentTable].bronze && store.statsAnswer>=50){
			store.bronzeStar = true;
			medal = true;
		}
		else{
			medal = false;
		}
		console.log("Médaille : "+ medal)
		console.log("% good answer = "+ store.statsAnswer)
		},


	},

	computed:{

		/*currentOperand: function(){
			return store.operands[store.questionNumber]
		},*/

		possibleResults: function(){

			var resultTable = []
			for(var operand in store.operands){
				resultTable.push(operand*store.currentTable)
			}
			console.log(resultTable)
			return resultTable
		}

	}

};

var totalGame = {
	template : `#totalGame`,
	data : function(){
		return { 
			store : store						
		};
	},

};

//datastore
var store = {
	table : [1,2,3,4,5,6,7,8,9,10],
	currentTable : 5,
	questionNumber : 1,
	currentOperand : "",
	operands : [0,1,2,3,4,5,6,7,8,9,10],
	operandsArray : [],
	succeed : "",
	//stats values
	trueAnswer : 0,
	wrongAnswer : 0,
	statsAnswer : 0,
	goldStar : false,
	silverStar : false,
	bronzeStar : false,

	//time values
	globalTimeResult :0,
	displayGlobalTime : 0,
	displayIntermediateTime : 0,
	intermediateTime : 0,
	chrono : null,
	timerID : 0,

	display : false,
	win : false,

};

//components
Vue.component(`apprentice-part`, apprenticePart);
Vue.component(`total-game`, totalGame);


//vue instance
var test = new Vue ({

	el : `#app`,
	data : store,
		   
	methods: {

		//initialize game
		initGame : function(){
			store.questionNumber = 1
			store.succeed = ""
			store.win = false
			store.trueAnswer = 0
			store.wrongAnswer = 0
			store.statsAnswer = 0
			store.globalTimeResult = 0
			store.intermediateTime = 0
			store.timerID = 0
			this.randomTable()
			this.oneTableCalculate()
			apprenticePart.methods.calculateTime()
		},

		// Random method to select 10 operations for one table
		oneTableCalculate : function(){
			var doneOperandsArray = [0]
			var i = 0
			var isInArray = true
			console.log("Table choisie : "+store.currentTable)

			if(store.trueAnswer===11){
					store.win=true
					store.succeed=""
					this.stopChrono()
					apprenticePart.methods.setVisible(false)
					apprenticePart.methods.stats()
					
				
			}

			if(store.win==!true && store.trueAnswer<11){

				//display template
				apprenticePart.methods.setVisible(true)
		
				//random question
				store.currentOperand = store.operandsArray[store.questionNumber-1]	
				}
		},

		stopChrono : function(){
			console.log("-------------------------------------------TOTO----------------------------")
			clearInterval(store.timerID)
		},


		verifyingResult : function(){
			
			if(apprenticePart.methods.goodOrBad(arguments)){
				store.succeed = true;
				store.questionNumber++;
				store.trueAnswer++;								
				this.oneTableCalculate();

				
			}
			else{
				store.succeed=false
				store.wrongAnswer++
			}

			console.log(arguments[0]+"\n"+apprenticePart.methods.goodOrBad(arguments))			
		},

		randomTable : function(){
			//randomize question
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

		}
	}




});