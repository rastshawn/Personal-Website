// make all links clickable.
// behavior: Links are blue, other text is other colors
// when link is clicked: type the link name, then simulate enter key press
// clear screen, type link name, click enter, display content


var PROMPT = "User@www.ShawnRast.com:~$\t";

var isPrinting = false; // used to make sure things don't print while text is typing
var input = "";
var currentDir = "/";


var buffer = [];

function bufferObj(string, timeout) {
	this.string = string;
	this.timeout = timeout;
}

function checkBuffer() {
	if (buffer[0]) {
		var top = buffer.shift();
		var htmlstring = top.string;
		var timeout = top.timeout;
		
		document.getElementById("output").innerHTML += htmlstring;
		window.setTimeout(checkBuffer, timeout);
	} else {
		window.setTimeout(checkBuffer, 150);
	}
}

function display(string, color) {
    // displays text into the console like a computer would. 
    //$("#output").append(string);
    
    /*
    if (isPrinting){
	
		window.setTimeout(function(){ //display(string, color)
			displayQueue.add([string, color]);
			
			 }, 150);
	} else {
		var htmlstring;
		if (color) {
			htmlstring = "<p style='color:" + color + "'>";
		} else {
			htmlstring = "<p>";
		}
		htmlstring += string;
		htmlstring += "</p>";
		document.getElementById("output").innerHTML += htmlstring;

	}
	*/
	var htmlstring;
	if (color) {
		htmlstring = "<p style='color:" + color + "'>";
	} else {
		htmlstring = "<p>";
	}
	htmlstring += string;
	htmlstring += "</p>";
	
	buffer.push(new bufferObj(htmlstring, 0));
}

$(document).ready(function() {
	display(PROMPT, "blue");
	
	window.setTimeout(start, 1000);
});

function type(string) {
    // types the letters into the console window one by one. 
    for (var i = 0; i<string.length; i++) {
		buffer.push(new bufferObj(string[i], 150));
	}
	/*
    function print(i) {
		isPrinting = true;
		document.getElementById("output").innerHTML += string[i];
		if (i+1 == string.length) {
				
				window.setTimeout(function() {isPrinting = false;}, 150);
				return;
		}
		window.setTimeout(function(){ print(i+1); }, 150);
	}
	
	print(0);
	*/
	
}

function clearScreen(nextFunction) {
    type("clear");
    nextFunction();
}

function start() {
	checkBuffer();
	type("ls");
    display("<br>");
    listFiles();
    display("<br>");
    display(PROMPT, "blue");
    type("home");
    home();

}

function home() {
	display("<br>");
	display("Welcome to the site!");
	display("<br>");
	display(PROMPT, "blue");
}

window.addEventListener("keypress", function(event) {
	//console.log(event);
	if (event.key != "Enter") {
		display(event.key);
		input += event.key;
	} else {
		parseInput();
	}
});

function parseInput() {
	display("<br>");
	/*
	switch(input) {
		case "home": display(PROMPT, "blue"); home();
		break;
		default: display("For a list of commands, type 'help'");
				display("<br>");
				display(PROMPT, "blue");
		break;
	}
	*/
	var found = false;
	for ( var c in commands ) {
		if (commands[c].command == input) {
			commands[c].f();
			found = true;
		}
	}
	if (!found) {
		display("For a list of commands, type 'help'");
		display("<br>");
		display(PROMPT, "blue");
	}
	
	input = "";
};

function listFiles() {
	if (currentDir == "/") {
		display("home\tabout\tcontact\tprojects", "green");
	}
}
var commands = [
	{ 
		command : "home",
		f : function() {
			display(PROMPT, "blue");
			home();
		}
	},
	{
		command : "help", 
		f : function() {
			commands.sort(function(a, b) {
				return a > b;
			});
			for (var i = 0; i<commands.length; i++){
				display(commands[i].command + "\t");
			}
			display("<br>");
			display(PROMPT, "blue");
		}
	}, 
	{
		command: "ls",
		f : function() {
			listFiles();
			
			
		}
	}
];
