"use strict";

const C = 299792.458;
const G = .0000000000667408;

document.addEventListener("DOMContentLoaded", function(event) {
	LorentzSlider();
	document.querySelector("#transformButton").addEventListener("click", function() {
		LorentzTransform();
	});
	document.querySelector("#gravityTransform").addEventListener("click", function() {
		GravityTransform();
	});
});

function LorentzTransform() {
	var lr = document.forms['lor'];

	var beta = lr.elements["beta"].value;


	var gam = 1 / Math.sqrt(1 - Math.pow(beta, 2));

	var dt = lr.elements["tIn"].value;
	var dx = lr.elements["xIn"].value;
	var dm = lr.elements["mIn"].value;
	var dg = lr.elements["gIn"].value;


	lr.elements["vIn"].value = C * beta;
	lr.elements["gamma"].value = gam;

	// Frame 1
	document.querySelector(".frame1 .tOut").value = dt * gam;
	document.querySelector(".frame1 .xOut").value = dx * gam;
	document.querySelector(".frame1 .mOut").value = dm * gam;
	document.querySelector(".frame1 .gOut").value = dg * gam;

	// Frame 2
	document.querySelector(".frame2 .tOut").value = dt / gam;
	document.querySelector(".frame2 .xOut").value = dx / gam;
	document.querySelector(".frame2 .mOut").value = dm / gam;
	document.querySelector(".frame2 .gOut").value = dg / gam;
}



function GravityTransform() {
	var lr = document.forms['gravity'];


	var time = lr.elements["tIn"].value;
	var length = lr.elements["xIn"].value;
	var radius = lr.elements["rIn"].value;
	var mass = lr.elements["mIn"].value;

	console.log(time + length + radius + mass);
	console.log((2 * G * mass));
	console.log(radius * Math.pow(C, 2));
	console.log(( (2 * G * mass) / radius * Math.pow(C, 2)));


	
	console.log(1 - ( (2 * G * mass) / radius * Math.pow(C, 2)));
	console.log(Math.sqrt(1 - ( (2 * G * mass) / radius * Math.pow(C, 2) )));

dt = time * Math.sqrt(1 - ( (2 * G * mass) / radius * Math.pow(C, 2) ));
	if (Math.sign(dt) == -1)
	{
		dt = "Black Hole";
	}


	var dt = dt;
	document.querySelector(".gravityFrame .tOut").textContent = dt.toString();

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