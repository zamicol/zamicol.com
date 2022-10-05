"use strict";

const C = 299792458; // m/s
const G = 6.67408 * Math.pow(10, -11); // m kg s
const SolarMass = 1.989 * Math.pow(10, 30); // kg
const SolarRadius = 695700000; // m
const EarthMass = 5.972 * Math.pow(10, 24)// kg
const EarthRadius = 6378000;// m

// Solar mass 1.989 × 10^30 kg
// Solar radius 695,700 km
// Solar gravity 273.95 m/s^2
// Earth mass 5.972 × 10^24 kg
// Eath Radius 6,378 km

document.addEventListener("DOMContentLoaded", function(event) {
	LorentzSlider();
	MassSlider();
	RadiusSlider();

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


// Solar mass 1.989 × 10^30 kg
// Solar radius 695,700 m
// Solar gravity 273.95 m/s^2
function GravityTransform() {
	var lr = document.forms['gravity'];


	var units = document.getElementById("gravityUnits").value;
	var time = lr.elements["tIn"].value;
	var length = lr.elements["xIn"].value;
	var inputRadius = lr.elements["rIn"].value;
	var inputMass = lr.elements["mIn"].value;

	// console.log("G: " + G);
	// console.log("SolarMass: " + SolarMass);
	// console.log("Inputs: " + time + length + inputRadius + inputMass);
	// console.log("Using Units: " + units);

	if (units == "solar") {
		inputMass = inputMass * SolarMass;
		inputRadius = inputRadius * SolarRadius;
	}

	if (units == "earth") {
		inputMass = inputMass * EarthMass;
		inputRadius = inputRadius * EarthRadius;
	}


	// Newton Gravity 
	var grav = (G * inputMass) / Math.pow(inputRadius, 2);
	//console.log("Grav: " + grav);

	// Time dilation
	var dt = time * Math.sqrt(1 - ((2 * G * inputMass) / (inputRadius * Math.pow(C, 2))));
	//console.log("Time dilation: " + dt);

		// Length Contraction
		var dx = length * Math.sqrt(1 - ((2 * G * inputMass) / (inputRadius * Math.pow(C, 2))));
		//console.log("Time dilation: " + dt);

	// Escape
	var esc = Math.sqrt((2 * G * inputMass) / inputRadius);
	//console.log("Escape: " + esc);


	if (Math.sign(dt) == -1 || dt.toString() == "NaN") {
		dt = "Black Hole";
		dx = "Black Hole";
		grav = "Black Hole";
		esc = "Black Hole";
	}

	// Schwarzschild Radius 
	var swarz = (2 * G * inputMass) / Math.pow(C, 2);
	//console.log("Swarz: " + swarz);

	// Schwarzschild Mass
	var swarzM = (inputRadius * Math.pow(C, 2))/(2 * G);
	console.log("Swarz Mass: " + swarzM);






	document.querySelector(".gravityFrame .tOut").textContent = dt.toString();
	document.querySelector(".gravityFrame .xOut").textContent = dx.toString();
	document.querySelector(".gravityFrame .gOut").textContent = grav.toString();
	document.querySelector(".gravityFrame .escOut").textContent = esc.toString();
	document.querySelector(".gravityFrame .sczOut").textContent = swarz.toString();
	document.querySelector(".gravityFrame .sczMOut").textContent = swarzM.toString();

	
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


function MassSlider() {
	var slider = document.getElementById("massSlider");
	var output = document.getElementById("mIn");
	output.value = slider.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
		output.value = this.value;
		GravityTransform();
	}
}


function RadiusSlider() {
	var slider = document.getElementById("radiusSlider");
	var output = document.getElementById("rIn");
	output.value = slider.value; // Display the default slider value

	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
		output.value = this.value;
		GravityTransform();
	}
}