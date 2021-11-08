var activateOperateListener = false;
var i = 0, timeOut = 0;
var numbers;
var operate;
var output;
const close = $(".closeNow")
const clear = $(".backspace")
const leftArrow = $(".leftDiv")
const blueStrip = $(".blue-strip")
const otherOperator = $(".other-operator")
const input = $(".input")
const result = $(".result")
const numeric = $(".numeric")
const dot = $(".dot")
const operator = $(".operators")
const equals = $(".equals")
const ops = ["÷", "-", "+", "x"];
const finalOpera = {
		"divide": "÷",
		"multiply": "x",
		"subtract": "-",
		"add": "+"
	}
	
//skip the first animation
setTimeout(function(){
    document.body.className="";
},500);

$(document).ready(function(){
  //hidden operations
  close.click(function(){
  	$(".show").toggleClass("show");
  		$(".AS").removeClass("selectedOption");
  		equals.text("=");
  		clearInputs();
  });
  
  $(".circleClear").on("animationend", function(){
   	$(".circle").toggleClass("circleClear");
  });
  // equals click add to history
  equals.click(function(){
   input.toggleClass("inputUnFocus");
   result.toggleClass("resultFocus");
   addToHistory(input.val(), result.val());
  });
  //clear all input listener
  clear.on('mousedown touchstart', function(e) {
    timeOut = setInterval(function(){
       clearAll();
    }, 500);
  }).bind('mouseup mouseleave touchend', function() {
    clearInterval(timeOut);
  });
  //reset css on input and results when a button is pressed except the equals button
  $("button").click(function(){
  input.inputfit();
   if (!$(this).hasClass("equals")) {
  	 input.removeClass("inputUnFocus")
  	 result.removeClass("resultFocus")
   }
  });
  
//left arrow || other operators
leftArrow.click(function(){	
	arrowClicked();
});

//Numbers
numeric.click(function(){
   //prevent numpad from entering value to default input
   if($(".hidden-operations *").hasClass("show")){
    inputNum($(this));
   }else{
   	input.val(input.val()+$(this).text());	
   	input.inputfit();
	   compute();
   }
});
	
//operators
 operator.on("click",function(event){  
   var targetOperator = $(event.target).attr("class");
   var targetOperator = targetOperator.replace("-", " ");
   
   if($(".hidden-operations *").hasClass("show") && targetOperator.includes("backspace")){
   	removeOne(true);
   }else{
   	//backspace
   if (targetOperator.includes("backspace")) {
   	removeOne(true);
   	var currentInput = input.val();
   	var del = currentInput.slice(0,-1);
input.val(currentInput.replace(currentInput, del));
				input.inputfit();
  		compute()
				if (input.val() == "") {
							result.val("");
				}
   }else if (targetOperator.includes("divide")){
    var currentInput = input.val();
    check(currentInput, "divide");
   }else if (targetOperator.includes("multiply")){
    var currentInput = input.val();
    check(currentInput, "multiply");
   }else if (targetOperator.includes("subtract")){
   	 var currentInput = input.val();
    check(currentInput, "subtract");
   }else if (targetOperator.includes("add")){
   	 var currentInput = input.val();
    check(currentInput, "add");
   }
  	input.val(input.val()+$(this).val());
   }
   
 });
});

//Dot
dot.click(function(){
	input.val(input.val()+$(this).text())
});

//check last input if operator again
function check(checkOperator, operator) {
	var test = checkOperator[checkOperator.length-1];
	if(jQuery.inArray(test, ops) !== -1){
	 if(test != finalOpera[operator]){
	  	input.val(input.val().slice(0, -1)+finalOpera[operator])
	}else{
			for(var c = 0; c < ops.length; c++){
			 if (test == ops[c]) {
			  input.val(input.val())
		 	}
  	}
	}
	}else{
	 	input.val(input.val() +finalOpera[operator])
	}
}

function clearAll() {
	$(".circle").toggleClass("circleClear");
	input.val("");
	result.val("");
}

function splitOperator(str, tokens){
	var tempChar = tokens[0];
 for(var i = 1; i < tokens.length; i++){
	 str = str.split(tokens[i]).join(tempChar);
 }
 str = str.split(tempChar);
 return str;
}

function calculate(userEntry) {
  let indexOfOperand;
  let operation;
  Object.keys(calculatorOperations).forEach(function(functionName) {
    while (userEntry.includes(functionName)) {
      indexOfOperand = userEntry.indexOf(functionName);
      userEntry = calculationSequence(functionName, indexOfOperand, userEntry);
    }
  });
  return userEntry;
}
const returnIndexOfEntry = (index, userEntry) => {
  const arg1 = Number(userEntry[index - 1]);
  const arg2 = Number(userEntry[index + 1]);
  return [arg1, arg2];
};
const returnSpliced = (index, newTotal, userEntry) => {
  userEntry.splice((index - 1), 3, newTotal);
  return userEntry;
};
const calculationSequence = (operation, indexOfOperand, userEntry) => {
  const getArgs = returnIndexOfEntry(indexOfOperand, userEntry);
  const newTotalForEntry = calculatorOperations[operation](getArgs[0], getArgs[1]);
  const newUserEntry = returnSpliced(indexOfOperand, newTotalForEntry, userEntry);
  return newUserEntry;
}

//BODMAS RULE
const calculatorOperations = {
		'√': (arg1, arg2) => Math.sqrt(arg2).toFixed(2),
		'÷': (arg1, arg2) => (arg1 / arg2).toFixed(1),
  'x': (arg1, arg2) => arg1 * arg2,
  '-': (arg1, arg2) => arg1 - arg2,
  '+': (arg1, arg2) => arg1 + arg2,
  '%': (arg1, arg2) => ((arg1 / 100)*arg2).toFixed(1)
};

function compute() {
 var currentInput = input.val();
	var lastElement = currentInput[currentInput.length-1];
	
	if(input.val().match(/[%x-÷+]/g)){
	  	//auto compute here
	  	numbers = splitOperator(input.val(), ops)
	   operate = currentInput.replace(/[0-9]/g, '')
		  operate = operate.replace(/\./g, "");
		  var ctr = 0;
		  for(var c = 0; c < numbers.length; c++) {
		 	  if (c%2 !== 0) {
			    	numbers.splice(c, 0, operate[ctr])
				    ++ctr;
		   	}
		  }
		  output = calculate(numbers);
		  result.val(output)
	  }
}

function addToHistory(expression, total) {
 
 $(".history").append("<h3>"+expression+"</h3>")
	$(".history").append("<h2>"+total+"</h2><br><br>")
}

function arrowClicked() {
	blueStrip.toggleClass("blue-strip-toggled");		
	if (blueStrip.hasClass("blue-strip-toggled")) {
		otherOperator.addClass("fa-chevron-right")		

otherOperator.removeClass("fa-chevron-left")
	}else{	
	otherOperator.addClass("fa-chevron-left");		
	otherOperator.removeClass("fa-chevron-right")
	}
}

function clearInputs() {
	$(".hidden-operations :input").each(function(e){
		$(this).val("");
	});
}
