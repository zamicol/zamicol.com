"use strict";


document.addEventListener("DOMContentLoaded", function(event) {
	start();
});

async function start() {
	var random = await RandomBase64Number();
	document.querySelector("#nonce").value = random;

	document.querySelector("#submit").addEventListener("click", function() {
		hash();
	});
}

// random256 generates a new number as a ArrayBuffer.
async function random256() {
	// A 256 bit string should be 42.6 base64 characters and 32 bytes
	let randomString = new Uint8Array(32);
	randomString = window.crypto.getRandomValues(randomString);

	// Hash to guarantee uniform.  
	var hash = await crypto.subtle.digest('SHA-256', randomString);
	return hash;
}


async function arrayBufferToBase64(buffer) {
	var binary = '';
	var len = buffer.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(buffer[i]);
	}
	return window.btoa(binary);
}

async function RandomBase64Number() {
	var r256 = await random256();
	var b64 = btoa(String.fromCharCode.apply(null, new Uint8Array(r256))).replace('=', '');
	// Debug
	// console.log(r256);
	// console.log(b64);
	return b64;
}

async function hash() {
	// Hash the file first
	var text = document.querySelector("#input").value;


	var encoder = new TextEncoder();
	var data = encoder.encode(text);
	var hash = await crypto.subtle.digest('SHA-256', data);
	document.querySelector("#inputHash").value = btoa(String.fromCharCode.apply(null, new Uint8Array(hash))).replace('=', '');

	// Then hash both compenents together.  
	encoder = new TextEncoder();
	//Remove the gawd awful right padding character "="
	const input = document.querySelector("#inputHash").value.replace('=', '');
	const nonce = document.querySelector("#nonce").value.replace('=', '');
	data = encoder.encode(input + nonce);
	hash = await crypto.subtle.digest('SHA-256', data);
	document.querySelector("#output").value = btoa(String.fromCharCode.apply(null, new Uint8Array(hash)));

	ShareURL();
}


function ShareURL() {
	var input = document.querySelector("#input").value;
	var hash = document.querySelector("#inputHash").value;
	var nonce = document.querySelector("#nonce").value;
	var output = document.querySelector("#inputHash").value;


	var share = new URL(window.location.href);
	share.searchParams.set("hash", output);
	share.searchParams.set("nonce", nonce);


	var save = new URL(window.location.href);
	save.searchParams.set("input", input);
	save.searchParams.set("nonce", nonce);


	document.querySelector("#share").innerHTML = "<a href='" + share.href + "'>" + share.href + "</a>";
	document.querySelector("#save").innerHTML = "<a href='" + save.href + "'>" + save.href + "</a>";
}


// Populate fields from URL parameters. 
function PopulateFromURL() {
	var url = new URL(window.location.href);
	var input = url.searchParams.get("input");
	var output = url.searchParams.get("output");
	var nonce = url.searchParams.get("nonce");



	if (input != "" || inAlpha != "" || outAlpha != "") {
		document.getElementById("inputString").value = input;
		document.getElementById("inputAlphabet").value = inAlpha;
		document.getElementById("outputAlphabet").value = outAlpha;
		document.getElementById("PadCheckbox").checked = pad;

		Convert();
	}

	//Recreate the share URL
	ShareURL();
}