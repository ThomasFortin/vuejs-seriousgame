/*___________________________________________________________
 |															 | 
 |    Serious Game Multiplication Tables for primary v0.1    |
 ___________________________________________________________*/



//Apprentice part
var apprenticePart = {

	template : `#apprenticePart`,
	data : function(){
		return { 
			store : store						
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

	
	setVisible : function(visible){
			console.log("variable visible = "+visible);
			store.display = visible;
		}

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
	trueAnswer : 0,
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
			this.randomTable()
			this.oneTableCalculate()
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