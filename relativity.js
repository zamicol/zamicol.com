"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
	Slider();
	document.querySelector("#transformButton").addEventListener("click", function() {
		Transform();
	});
});

function Transform() {
	var lr = document.forms['lor'];

	var bet = lr.elements["beta"].value;

	//console.log("beta: " + bet);
	var gam = 1 / Math.sqrt(1 - Math.pow(bet, 2));

	var cdt = lr.elements["timeIn"].value;
	var dx = lr.elements["xIn"].value;

	lr.elements["timeOut"].value = cdt / bet;
	lr.elements["xOut"].value = dx / bet;
}

function Slider() {
	var slider = document.getElementById("lor_beta");
	var output = document.getElementById("lor_beta_value");
	output.value = slider.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
		output.value = this.value;
		Transform();
	}
}