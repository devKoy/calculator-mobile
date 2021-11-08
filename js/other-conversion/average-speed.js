const average = $(".AS");
const distanceID = $("#distance");
const timeID = $("#time");
const averagePanel = $(".average-speed");
var passedInput = "";
var d = false;
var equal = $(".equals");
const distance = $("#dist");
const hour = $("#hour");
const average_speed = $("#Aver");
const timeKm = $("#TimeKM");


$(document).ready(function(){
	average.click(function(){		
		$(this).toggleClass("selectedOption")
		averagePanel.addClass("show");
		if (equal.text() != "GO") {
			equal.text("GO");
		}else{
			equal.text("=");
			 clearInputs();
				averagePanel.removeClass("show")
		}
		
	 arrowClicked();
	});
	
	distanceID.click(function(){
		d = true;
	});
	
	timeID.click(function(){
		d = false;
	});
	
	equal.click(function(){
	 var a = distanceID.val();
	 var b = timeID.val();
	 
		if (equal.text() == "GO") {
			distance.val("DISTANCE: "+a+" [km]")
			hour.val("TIME: "+b+" [h]");
			average_speed.val("AVERAGE SPEED: "+(a/b).toFixed(2)+ " [km/h]")
			timeKm.val("TIME / KM: "+(60*b/a)+" [min]")
		}
	});
});

function inputNum(number) {
	passedInput = number.text();
	
	if (d) {
		distanceID.val(distanceID.val()+passedInput)
	}	else {
		timeID.val(timeID.val()+passedInput)
	}
}

function removeOne(bool) {
	if (bool){
		if (d){
		 var input =	distanceID.val().slice(0,-1)
		 distanceID.val(input)
		}else{
			 var input =	timeID.val().slice(0,-1);
		 timeID.val(input);
		}
	}
}

function addStr(str, index, stringToAdd){
  return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}
