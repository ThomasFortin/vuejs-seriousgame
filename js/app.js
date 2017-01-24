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
			var succeed = false;
			var currentResult = store.operands[store.questionNumber] * store.currentTable
			console.log("opération courante : "+ store.operands[store.questionNumber]+ " * "+ store.currentTable  +"\ncurrentResult = "+currentResult+" argument courant : "+ arguments[0])
			if(currentResult==arguments[0]){
				succeed = true;
				console.log("Résultat de l'opération : "+succeed)

			}
			else{
				succeed = false;
				console.log("Résultat de l'opération : "+succeed)
			}
			console.log("succeed : "+succeed)
			return succeed

			
		}
	},

	computed:{

		currentOperand: function(){
			return store.operands[store.questionNumber]
		},

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

var store = {
	table : [1,2,3,4,5,6,7,8,9,10],
	currentTable : 5,
	questionNumber : 0,
	operands : [0,1,2,3,4,5,6,7,8,9,10],
	succeed : ""
};

Vue.component(`apprentice-part`, apprenticePart);



new Vue ({

	el : `#app`,
	data : store,
		   

	methods: {
		// Random method to select 10 operations for one table
		oneTableCalculate : function(k){

			//for(var i=0; i>11;i++){

			//}

		},
		verifyingResult : function(){
			
			if(apprenticePart.methods.goodOrBad(arguments)){
				store.succeed = true
			}
			else{
				store.succeed=false
			}

			console.log(arguments[0]+"\n"+apprenticePart.methods.goodOrBad(arguments))			
		}

	}


});