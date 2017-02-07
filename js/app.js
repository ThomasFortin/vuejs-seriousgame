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
			displayIntermediateTime : 0,
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
			var timerID = 0
			var self = this
			var currentIntermediateTime = 0;

			timerID = setInterval(function(){
			var end = new Date()
			currentIntermediateTime = end - store.start
			currentIntermediateTime = new Date(currentIntermediateTime)
			//store.intermediateTime.push(currentIntermediateTime) 
			//console.log(store.intermediateTime)
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
			self.displayIntermediateTime = "temps intermédiaire : "+ minutes + ":" +seconds+":"+milliSeconds;
				
			}, 10)		
				console.log("test variable ->"+self.displayIntermediateTime)
		},

	
	setVisible : function(visible){
			console.log("variable visible = "+visible);
			store.display = visible;
		},

	

	stats : function(){

		store.statsAnswer = Math.round((store.trueAnswer - store.wrongAnswer) / store.questionNumber * 100)
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
	//time values
	globalTimeResult : 0,
	startTime : 0,
	start : new Date(),
	intermediateTime : [],
	chrono : null,

	display : false,
	win : false,

};

//components
Vue.component('apprentice-part', apprenticePart);
Vue.component('total-game', totalGame);

// Routing file

var Home = { template: '#home-template' }
var Learning = { 
    template: '#apprentice-template',
    data: function() {
        return {
            store: store
        }
    }
}
// Vue instance
var apprentice = {
    template: '#apprentice-template',
	data : function() {
        return {
            store: store
        }
    },
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
			store.startTime = 0
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


		verifyingResult : function(){
			
			if(apprenticePart.methods.goodOrBad(arguments)){
				store.succeed = true
				store.questionNumber++
				store.trueAnswer++
				this.oneTableCalculate()
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
};
var Evaluation = { template: '#evaluation-template' }

var router = new VueRouter({
    routes: [
        { path: '/', component: Home, name:'home' },
        { path: '/apprentissage', component: apprentice, name:'learning' },
        { path: '/evaluation', component: Evaluation, name:'evaluation' },
    ]
});


new Vue({
    el: '#app',
    router: router
});
