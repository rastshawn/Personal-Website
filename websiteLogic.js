// make all links clickable.
// behavior: Links are blue, other text is other colors
// when link is clicked: type the link name, then simulate enter key press
// clear screen, type link name, click enter, display content

var currentDir = "/";

function PROMPT() {return "User@www.ShawnRast.com:~" + currentDir + "$\t";};

var isPrinting = false; // used to prevent typing and printing simultaneously
var input = "";



if ( $("#mobileDetect").css('display') == 'none' ){
	window.location = "http://www.shawnrast.com/mobile";
    // must be on mobile
}



var directories = [
	{
		name: "/",
		files: [
			{
				name : "home",
				type : "file",
				func : home
			}, 
			{
				name : "about",
				type : "file",
				func : function about() {
					display("I am a tinkerer obsessed with bringing crazy ideas to fruition. <br><br>");
					display(
						"I spend a fair amount of my free time maintaining and building upon the network " + 
						"of hacky solutions and automations I've built for myself. A series of GroupMe bots and " + 
						"If This Then That triggers running on a 10-year old Dell Inspiron that my parents insisted was 'obsolete' " +
						"make my life run smoothly. I solving my life's problems with computers, enough that I catch myself inventing" +
						" new ones just for the opportunity to write something." 
						);
					display("<br><br>");
                    display(
						"I have been a musician for almost my entire life. I began studying piano when I was four, "+ 
						"picked up a trombone when I was in the fifth grade, and now am finishing up " +
						"a Bachelor of Arts in Music in addition to my degree in computer science. "+
						"Programming to me is very much like performing - it's a creative outlet. " +
						"I love the rush I get when I find a creative solution. " +
						"Music and programming are also similar in that for each, practicing is both " +
						"crucial and fun. Reading theory books alone doesn't make a good performer or programmer " +
						"- a desire to practice and build skills does. " +
						"I love opportunities to write new solutions, and find myself asking friends and family" +
						" for ideas for tools, websites, and chatbots that would make our lives easier " +
						"or more enjoyable. One of the best things about being a developer " +
						"is that every day brings a new challenge and a new opportunity to " +
						"build a more elegant solution than my last. "
						); 
                    //display("I am in my fourth year of studying computer science at Miami University and my second year of professional software development. I'm most experienced in JavaScript and Java, but I am comfortable enough with C++ to use it almost daily."); 
					display("<br><br>");
                    display(PROMPT(), "blue");
				}
			},
			{
				name : "projects",
				type : "dir",
				func : function projects() {
					currentDir = "/projects";
                    var string = "For examples of my work, please visit";
                    string += " my GitHub link. In addition please feel ";
                    string += "free to click through these demo sites.";
                    string += "<br>";
                    display(string);
					display(PROMPT(), "blue");
				}
			},
			{
				name : "contact",
				type : "dir",
				func : function contact() {
					
					currentDir = "/contact";
					display(PROMPT(), "blue");
				}
			},
			{
				name : "resume",
				type : "file",
				func : function r() {
                    display(resume);
                }
			}
		]
	}, 
	{
		name: "/projects",
		files: [
			{
				name:"GitHub",
				type:"link",
				func:"https://github.com/rastshawn" 
            }
		]
	},
	{
		name: "/contact",
		files: [
			{
				name: "RastShawn@gmail.com",
				type: "link",
				func: "mailto:rastshawn@gmail.com"	
			},
			{
				name: "LinkedIn",
				type: "link",
				func: "https://www.linkedin.com/in/rastshawn/"	
			}
		]
	}
];


var buffer = [];
// polls the buffer to determine if text should be printed to the screen
// buffer is an array of 2-element arrays, where
// [stringToBePrinted, delayInMilliseconds
function checkBuffer() {
	if (buffer[0]) {
		isPrinting = true;
		var top = buffer.shift();
		var htmlstring = top[0];
		var timeout = top[1];
		
		document.getElementById("output").innerHTML += htmlstring;
		scrollToBottom();
		window.setTimeout(checkBuffer, timeout);
		
	} else {
		isPrinting = false;
		window.setTimeout(checkBuffer, 150);
	}
}

function scrollToBottom() {
	document.getElementById('bottom').scrollIntoView();
}

// displays an entire string of text at one time. 
function display(string, color) {
	var htmlstring;
	if (color) {
		htmlstring = "<p style='color:" + color + "'>";
	} else {
		htmlstring = "<p>";
	}
	htmlstring += string;
	htmlstring += "</p>";
	
	buffer.push([htmlstring, 0]);
}

$(document).ready(function() {
	display(PROMPT(), "blue");
	checkBuffer();
	window.setTimeout(start, 1000);
});

// displays a string of text one letter at a time. (to emulate typing)
function type(string) {
    for (var i = 0; i<string.length; i++) {
		buffer.push([string[i], 100]);
	}	
    input += string;
}

// currently unused, but maybe should be used? 
/*
function clearScreen(nextFunction) {
    type("clear");
    nextFunction();
}
*/
// display the initial prompt
function start() {
	type("ls");
    display("<br>");
    listFiles();
    display("<br>");
    display(PROMPT(), "blue");
    type("home");
    display("<br>");
    home();

}

// display the homepage text
function home() {
	//display("<br>");
	display("Welcome to the site! You can type in or click on any ");
	display ("files", "red");
	display(" or ");
	display("directories", "green");
	display(" you'd like to access. External links are blue.");
	display("<br>");
	display("You can also type 'help' for a list of commands.");
	display("<br>");
	display(PROMPT(), "blue");
}

// handles all keypresses and the input variable
window.addEventListener("keypress", function(event) {
	if (isPrinting) {
		// don't do anything with keypresses if the program is writing to the field
	} else {
		if (event.key != "Enter") {
			document.getElementById("output").innerHTML += event.key;
			input += event.key;
		} else {
			parseInput();
		}
	}
});

// creates the link html for a specified file
// given directories[i].files[j]
// with i = directoryIndex, j = fileIndex
function getLink(directoryIndex, fileIndex){
	var i = directoryIndex;
	var j = fileIndex;
	var file = directories[i].files[j];
	if (file.type == "file") {
		var link = "<a style='color:red' href='#' onclick='handleLink(";
		link += i + "," + j;
		link += ")'>" + file.name + "</a>";
		return link;
	} else if (file.type=="dir") {
		var link = "<a style='color:green' href='#' onclick='handleLink(";
		link += i + "," + j;
		link += ")'>" + file.name + "</a>";
		return link;
	} else if (file.type == "link") {
       var link = "<a href='" + file.func + "'>";
       link += file.name;
       link += "</a>";
       return link;
    }
}

// returns array of files in the current directory
function getFiles() {
	var output = [];
	for (var i = 0; i < directories.length; i++) {
		var directory = directories[i];
		if (directory.name == currentDir) {
			for (var j = 0; j<directory.files.length; j++){
				output.push(directory.files[j]);
			}
		}
		
	}
	return output;
}

// formats the list of files in the current directory
// into a string that the display function can use
function getFileString() {
	for (var i = 0; i < directories.length; i++) {
		var directory = directories[i];
		
		if (directory.name == currentDir) {
			var output = "";
			for (var j = 0; j<directory.files.length; j++){
				output += getLink(i, j);
				output += "\t";
			}
			return output;
		}
	}
}

function parseInput() {

	var found = false;
	var args = input.split(' ');
	for ( var c in commands ) {
		if (commands[c].command == args[0]) {
			commands[c].f(args);
			found = true;
			break;
		}
	}
	if (!found) {
        display("<br>");
		display("For a list of commands, type 'help'");
		display("<br>");
		display(PROMPT(), "blue");
	}
	
	input = "";
};

function listFiles() {
	display(getFileString());
}
var commands = [
	{ 
		command : "home",
		f : function() {
			display(PROMPT(), "blue");
			home();
		}
	},
	{
		command : "help", 
		f : function() {
			for (var i = 0; i<commands.length; i++){
				display(commands[i].command + "\t");
				if ((i+1)%10 == 0) display("<br>");
			}
			display("<br>");
			display(PROMPT(), "blue");
		}
	}, 
	{
		command: "ls",
		f : function() {
            display("<br>");
			listFiles();
			display("<br>");
			display(PROMPT(), "blue");
			
		}
	}, 
	{
		command: "clear", 
		f : function() {
			document.getElementById("output").innerHTML = "";
			display(PROMPT(), "blue");
		}
	},
	{
		command: "cat",
		f : function(args) {
			if (args[1]) {
				display("<br>");
				var found = false;
				var files = getFiles();
				for (var i in files) {
					var file = files[i];
					if (args[1] == file.name) {
                        if (file.type == "file") {
						    found = true;
						    file.func();
						    break;
                        } else if (file.type == "link") {
                            found = true;
                            document.href=file.func;
                            break;
                        }
					}
				}
				if (!found) {
					display("No file called " + args[1] + " exists in this directory.<br>");
					display(PROMPT(), "blue");
				}
			} else {
				display("<br>");
				display("Please specify a filename.<br>");
				display(PROMPT(), "blue");
			}
			
		}
	}, 
	{
		command: "cd", 
		f : function(args) {
			if (args[1]) {
				display("<br>");
				var found = false;
				
				var files = getFiles();
				
				if (args[1] == "..") {
					currentDir = "/";
					display(PROMPT(), "blue");
				} else {
					for (var i in files) {
						var file = files[i];
						console.log(file);
						if (args[1] == file.name && file.type == "dir") {
							found = true;
							file.func();
							break;
						}
					}		
					if (!found) {
						display("No directory called " + args[1] + " exists in this directory.<br>");
						display(PROMPT(), "blue");
					}
				}
			} else {
				display("<br>");
				display("Please specify a name.<br>");
				display(PROMPT(), "blue");
			}
			
		}
	}
];


// handles clicked links and directs them to the proper files
function handleLink(directoryIndex, fileIndex) {
	var i = directoryIndex;
	var j = fileIndex;
	var file = directories[i].files[j];
	
	if (file.type == "dir") {
		type("cd " + file.name);
		display("<br>");
		file.func();
        type("ls");
        display("<br>");
        listFiles();
        display("<br>");
        display(PROMPT(),"blue");
	} else {
		type("cat " + file.name); 
		display("<br>");
		file.func();
	}
}

// sorts command list in alphabetical order
commands.sort(function(a, b) {
				if (a.command < b.command) return -1;
				if (a.command > b.command) return 1;
				return 0;
			});
