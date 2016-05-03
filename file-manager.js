var fs = require('fs');

var useStdin = function () {
	var input = process.stdin.read();
	if (input !== null) {
		var inputSplit = input.toString().trim().split(" ");

		if (inputSplit[0] == "cat") {
			//cat <filename>
			catFile(inputSplit[1]);

		} else if (inputSplit[0] == "touch") {
			//touch <filename>
			createNewFile(inputSplit[1]);

		} else if (inputSplit[0] == "rm") {
			//remove <filename>
			removeFile(inputSplit[1]);

		} else if (inputSplit[0] == "replace") {
			findAndReplace(inputSplit[1], inputSplit[2], inputSplit[3]);

		} else if (inputSplit[0] == "grep") {
			findInLine(inputSplit[1], inputSplit[2]);
		}
	};
}


//create a file (touch)
function createNewFile(fileName) {
	fs.writeFile(fileName, "", function (err) {
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

//read from a file (cat)
function catFile(fileName) {
	fs.readFile(fileName, function (err, data) {
		if (err) {
			console.log("Unable to read from file");
		} else {
			console.log(data.toString());
		}
	});
}

//remove a file* remove a file
//		"rm" <file name>
//		> rm hello.txt
//			entirely delete the file hello.txt

function removeFile(fileName) {

	fs.unlink(fileName, function (err, data) {
		if (err) {
			console.log("Could not find file");
		} else {
			console.log('file deleted successfully');
		}
	});
}


//find and replace a word in the file
//		"replace" <file to search> <word to replace> <replacement word>
//		> replace hello.txt hello goodbye
//			replace all instances of hello in hello.txt with goodbye
//		> replace what.txt there their
//			replace all instances of there in what.txt with their

//find and replace a word in the file

function findAndReplace(fileName, replaceMe, withMe) {
	fs.readFile(fileName, "", function (err, data) {
		if (err) {
			console.log("Could not find file");
		} else {

			var result = data.toString().split(replaceMe).join(withMe);
			fs.writeFile(fileName, result, function (err) {
				if (err) console.log("Didn't work");
			})
			console.log('Renamed successfully');
		}
	});
}

//* find a line in a file
//		"grep" <file name> <word to find>
//		> grep hello.txt hello
//			print out all of the lines in hello.txt that contain "hello"
//		> grep what.txt there
//			print out all of the lines in what.txt that contain "there"

function findInLine(fileName, findMe) {
	fs.readFile(fileName, "", function (err, data) {
		if (err) {
			console.log("Could not find " + findMe + "in line or file");
		} else {

			//			Pull in all data and change to string
			var result = data.toString().split("\n");
//				result = result.filter(findMe);
//				console.log(results);
//				console.log(result.filter(findMe));
			for (i = 0; result.length < 0; i++) {
				if (result[i].indexOf(findMe) !== -1) {
					console.log(result[i]);
				}
			}
		}
	})
};

process.stdin.on('readable', useStdin);

/*
Your assignment is to implement the following functionality:

	* 

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/