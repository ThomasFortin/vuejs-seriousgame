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

//datastore
var store = {
	table : [1,2,3,4,5,6,7,8,9,10],
	currentTable : 5,
	questionNumber : 1,
	currentOperand : "",
	operands : [0,1,2,3,4,5,6,7,8,9,10],
	operandsArray : [],
	succeed : "",
	min : Math.ceil(1),
	max : Math.floor(10),
	display : false,
	win : false,

};

//components
Vue.component(`apprentice-part`, apprenticePart);


//vue instance
var test = new Vue ({

	el : `#app`,
	data : store,
		   
	methods: {

		// Random method to select 10 operations for one table
		oneTableCalculate : function(){
			var doneOperandsArray = [0]
			var i = 0
			var isInArray = true
			console.log("Table choisie : "+store.currentTable)

			if(store.questionNumber>10){
					store.win=true
					store.succeed=""
					apprenticePart.methods.setVisible(false)
			}

			if(store.win==!true && store.questionNumber<10){

				//display template
				apprenticePart.methods.setVisible(true)
		
				console.log("Question numéro : "+store.questionNumber)
				var randomOperand = Math.floor(Math.random() * (store.max - store.min + 1) + store.min)
				console.log("opérande random = "+randomOperand)


				for(i=0;i<doneOperandsArray.length;i++){
						console.log("Question numéro : "+store.questionNumber)
						if(doneOperandsArray[i] == randomOperand){
							console.log(doneOperandsArray[i]+" -> Valeur déjà dans le tableau")
							isInArray = true
							break;
							//return isInArray
						}
						else{
							isInArray = false
							//return isInArray
						}
					}
					console.log(isInArray)
					if(isInArray==false){
						doneOperandsArray.push(randomOperand)
						store.currentOperand = randomOperand
						console.log("Opérande courante mis dans le tableau : "+store.currentOperand)
					}	
					
				}
	
				console.log("Affichage du tableau : "+doneOperandsArray.length)
			
			
		},


		verifyingResult : function(){
			
			if(apprenticePart.methods.goodOrBad(arguments)){
				store.succeed = true
				store.questionNumber++
				this.oneTableCalculate()
			}
			else{
				store.succeed=false
			}

			console.log(arguments[0]+"\n"+apprenticePart.methods.goodOrBad(arguments))			
		},

		randomTable : function(){
			var test = Math.random()
			store.operandsArray = store.operands.sort(test - Math.random())
			console.log("tableau d'opérande = "+store.operandsArray)
		}
	}




});