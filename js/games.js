/*___________________________________________________________
 |															 | 
 |    Serious Game Multiplication Tables for primary v0.3    |
 |__________________________________________________________*/


/*----------------------
 | Apprentice game part |
  ---------------------*/
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
			console.log("variable visible = "+visible);
			store.displayLearning = visible;
			console.log("Display : "+store.displayLearning)
		},


	},

	computed:{

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
/*------------------
 | total game part |
  -----------------*/
var totalGame = {
	template : `#totalGame`,
	data : function(){
		return { 
			store : store,						
		};
	},

	methods : {
		
	setVisible : function(visible){
			var self = this
			console.log("variable visible = "+visible);
			store.displayTG = visible;
			console.log("Display : "+store.displayLearning)
		},


	},

	computed:{

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

/*------------------
 |   data store    |
  -----------------*/
var store = {
				table : [0,1,2,3,4,5,6,7,8,9,10],
				currentTable : "",
				questionNumber : 1,
				currentOperand : "",
				operands : [0,1,2,3,4,5,6,7,8,9,10],
				operandsArray : [],
				tableArray : [],
				succeed : "",
				//stats values
				trueAnswer : 0,
				wrongAnswer : 0,
				statsAnswer : 0,
				goldStar : false,
				silverStar : false,
				bronzeStar : false,
				timeTable : timeTable,
				//time values
				globalTimeResult :0,
				displayGlobalTime : 0,
				displayIntermediateTime : 0,
				intermediateTime : 0,
				chrono : null,
				timerID : 0,
				//game
				typeGame :"",
				displayLearning : false,
				displayTG : false,
				win : false,
			};

/*------------------
 |    components   |
  -----------------*/
Vue.component(`apprentice-part`, apprenticePart);
Vue.component(`total-game`, totalGame);

/*------------------
 |   Routing file  |
  -----------------*/

var Home = { template: `#home-template` }

var Evaluation = ({
    template: `#evaluation-template`,
    data: function() {
        return {
            store: store
        }
    },
    methods: {
		// Initialize an evaluation game mode
		initGameEvaluation : function(){
			store.questionNumber = 1
			store.succeed = ""
			store.win = false
			store.trueAnswer = 0
			store.wrongAnswer = 0
			store.statsAnswer = 0
			store.globalTimeResult = 0
			store.intermediateTime = 0
			store.timerID = 0
			store.typeGame = 1
			totalGame.methods.setVisible(true)
			this.randomOperands()
			this.randomTable()
			this.allTableCalculate()
			this.calculateTime()
		}
    }
});

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
			store.win = false
			store.trueAnswer = 0
			store.wrongAnswer = 0
			store.statsAnswer = 0
			store.globalTimeResult = 0
			store.intermediateTime = 0
			store.timerID = 0
			store.typeGame = 0
			apprenticePart.methods.setVisible(true)
			this.randomOperands()
			this.oneTableCalculate()
			this.calculateTime()
		},
		
        // Random method to select 10 operations for one table Apprentice part
		oneTableCalculate : function(){
			
			console.log("Mode de jeu Apprentissage")
			console.log("Table choisie : "+store.currentTable)

			if(store.trueAnswer===11){
					store.win=true
					store.succeed=""
					this.stopChrono()
					apprenticePart.methods.setVisible(false)
					this.stats()				
			}

			if(store.win==!true && store.trueAnswer<11){

				//display template
				apprenticePart.methods.setVisible(true)
		
				//random question
				store.currentOperand = store.operandsArray[store.questionNumber-1]	
				}
		},
		//global testing part
		allTableCalculate : function(){

			console.log("Mode de jeu Evaluation")
			if(store.trueAnswer===11){
					store.win=true
					store.succeed=""
					this.stopChrono()
					totalGame.methods.setVisible(false)
					this.stats()	
			}

			if(store.win==!true && store.trueAnswer<11){

				//display template
				totalGame.methods.setVisible(true)
		
				//random question
				store.currentOperand = store.operandsArray[store.questionNumber-1]
				store.currentTable = store.tableArray[store.questionNumber-1]	
				}

		},

		//stop Chrono
		stopChrono : function(){
			clearInterval(store.timerID)
		},

		//counting results
		verifyingResult : function(){
			
			if(this.goodOrBad(arguments)){
				store.succeed = true;
				store.questionNumber++;
				store.trueAnswer++;	
				if(store.typeGame===0){							
					this.oneTableCalculate();
				}
				else if(store.typeGame===1){
					this.allTableCalculate();
				}

				
			}
			else{
				store.succeed=false
				store.wrongAnswer++
			}

			console.log(arguments[0]+"\n"+this.goodOrBad(arguments))			
		},

		//checking results
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

		//counting time
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

		//stats & rewards
		stats : function(){
		
			store.statsAnswer = Math.round((store.trueAnswer - store.wrongAnswer) / (store.questionNumber-1) * 100)
			console.log("% good answer = "+ store.statsAnswer+ "\n gold condition : "+ store.timeTable[store.currentTable].gold+"\n silver condition : "+store.timeTable[store.currentTable].silver+"\n bronze condition : "+timeTable[store.currentTable].bronze )
			this.globalTimeCalculate(store.intermediateTime)
			var medal = false;
			if(store.statsAnswer<0){
				store.statsAnswer = 0;
			}
			if(store.typeGame===0){

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
			}
			else if(store.typeGame===1){

				if(store.globalTimeResult<=store.timeTable[11].gold && store.statsAnswer==100){
						store.goldStar = true;
						medal = true;
					}
					else if(store.globalTimeResult<=store.timeTable[11].silver && store.statsAnswer>=75){
						store.silverStar = true;
						medal = true;
					}
					else if(store.globalTimeResult<=store.timeTable[11].bronze && store.statsAnswer>=50){
						store.bronzeStar = true;
						medal = true;
					}
					else{
						medal = false;
					}

			}
			console.log("Médaille : "+ medal)
		
		},

		//evaluate reformat time for check global time
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

		//initiate operands for apprentice & evaluation game
		randomOperands : function(){
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

		},
		//initiate tables for evaluation game
		randomTable : function(){

			//randomize tabme
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

var router = new VueRouter({
    routes: [
        { path: '/', component: Home, name:'home' },
        { path: '/apprentissage', component: Learning, name:'learning' },
        { path: '/evaluation', component: Evaluation, name:'evaluation' },
    ]
});


new Vue({
    el: '#app',
    router: router
});

