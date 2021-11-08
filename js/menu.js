$(document).ready(function(){

	$(".menu").click(function(){	
		$(".main-menu").toggleClass("show-menu")
	});
//history	
	 $(".bar").click(function(){
		 history();
		});
		$("#historyList").click(function(){
	 	$(".show").removeClass("show");
	 	$(".AS").removeClass("selectedOption");
	 	$(".equals").text("=")
	 	clearInputs();
	 	history();
	 	$(".main-menu").toggleClass("show-menu");
	});
  
});

function history() {
	$(".historyDiv").toggleClass("show-history");
	if ($(".historyDiv").hasClass("show-history")) {
		$(".bar").toggleClass("showPill")
	}else{
		$(".bar").css({'top':'37%'})
		$(".bar").toggleClass("showPill")
	}
}
