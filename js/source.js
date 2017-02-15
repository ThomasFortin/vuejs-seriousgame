/*------------------
 |   Time table    |
  -----------------*/
var timeTable = [
    { 	gold : 5,
        silver : 10,
        bronze : 15
    },
    {
        gold : 15,
        silver : 20,
        bronze : 30
    },
    {
        gold : 25,
        silver : 30,
        bronze : 50
    },
    {
        gold : 45,
        silver : 60,
        bronze : 80
    },
    {
        gold : 50,
        silver : 65,
        bronze : 90
    },
    {
        gold : 50,
        silver : 65,
        bronze : 90
    },
    {
        gold : 60,
        silver : 80,
        bronze : 100
    },
    {
        gold : 65,
        silver : 85,
        bronze : 110
    },
    {
        gold : 75,
        silver : 95,
        bronze : 120
    },
    {
        gold : 80,
        silver : 100,
        bronze : 125
    },
    {
        gold : 60,
        silver : 80,
        bronze : 100
    },
    {
        gold : 45,
        silver : 60,
        bronze : 80
    }
]

/*------------------
 |   Data store    |
  -----------------*/
var store = {
    table : [1,2,3,4,5,6,7,8,9,10],
    currentTable : "",
    questionNumber : 1,
    currentOperand : "",
    operands : [1,2,3,4,5,6,7,8,9,10],
    operandsArray : [],
    tableArray : [],
    succeed : "",
    // Stats values
    trueAnswer : 0,
    wrongAnswer : 0,
    statsAnswer : 0,
    goldStar : false,
    silverStar : false,
    bronzeStar : false,
    timeTable : timeTable,
    // Time values
    globalTimeResult :0,
    displayGlobalTime : 0,
    displayIntermediateTime : 0,
    intermediateTime : 0,
    chrono : null,
    timerID : 0,
    //Game
    displayLearning : false,
    displayEvaluation : false,
    apprenticeWin : false,
    evaluationWin : false,
};

