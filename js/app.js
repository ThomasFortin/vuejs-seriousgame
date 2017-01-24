/*___________________________________________________________
 |															 | 
 |    Serious Game Multiplication Tables for primary v0.1    |
  ___________________________________________________________*/

//Apprentice part
//tmp table
var k =1;
var apprenticePart = {

	 template : `#apprenticePart`,
	 			data : function(){
	 				return { 
	 					store : store,
	 					questionNumber : 0,
	 					operands : [0,1,2,3,4,5,6,7,8,9,10],
	 				};
	 			},
	 computed:{
	 	currentOperand: function(){
	 		return this.operands[this.questionNumber]
	 	},
	 	possibleResults: function(){

	 		var resultTable = []
	 		for(var operand in this.operands){
	 		resultTable.push(operand*store.currentTable)
	 		}
	 		console.log(resultTable)
	 		return resultTable
	 	}

	 }

};

var store = {
	table : [1,2,3,4,5,6,7,8,9,10],
	currentTable : 5
};

Vue.component(`apprentice-part`, apprenticePart);



new Vue ({

	el : `#app`,
	data : store,

	methods: {
		// Random method to select 10 operations for one table
		oneTableCalculate : function(k){

			for(var i=0; i>11;i++){

			}

		}

	}


});