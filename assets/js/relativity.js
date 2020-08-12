"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
	LorentzSlider();
	document.querySelector("#transformButton").addEventListener("click", function() {
		LorentzTransform();
	});
});

function LorentzTransform() {
	var lr = document.forms['lor'];

	var bet = lr.elements["beta"].value;

	//console.log("beta: " + bet);
	var gam = 1 / Math.sqrt(1 - Math.pow(bet, 2));

	var dt = lr.elements["timeIn"].value;
	var dx = lr.elements["xIn"].value;
	var dm = lr.elements["mIn"].value;
	var dg = lr.elements["gIn"].value;

	lr.elements["gamma"].value = gam;
	lr.elements["timeOut"].value = dt * bet;
	lr.elements["xOut"].value = dx * bet;
	lr.elements["mOut"].value = dm * bet;
	lr.elements["gOut"].value = dg * bet;
}

function LorentzSlider() {
	var slider = document.getElementById("lor_beta");
	var output = document.getElementById("lor_beta_value");
	output.value = slider.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
		output.value = this.value;
		LorentzTransform();
	}
}