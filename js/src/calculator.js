

$(function(){

	$(".calculator.loan-auto").accrue({
		mode: "compare",
		response_output_div: ".result.auto",
		response_compare:"You Save: <strong>$%savings%</strong>",
		error_text:"",
	});


	$(".calculator.loan-home").accrue({
		mode: "compare",
		response_output_div: ".result.home",
		response_compare:"You Save: <strong>$%savings%</strong>",
		error_text:"",
	});

	$(".calculator.credit").accrue({
		mode: "compare",
		response_output_div: ".result.credit",
		response_compare:"You Save: <strong>$%savings%</strong>",
		error_text:"",
	});

	$(".numbers-only").keyup(function(){
		var fixed=$(this).val().replace(/[^0-9.]/g,"");
		$(this).val( fixed );
	});

});

