var author = "###Author###\n\n";
var script = "";
var model = "";
var modeltype = "";
var scripttest = "E";
var fixed = 0;
var alpha = 0;
var beta = 0;

var sequenceData;
var variables;
var substitutionModel;
var treeModel;
var phyloctmcModel;
var analysis;
var postProcessing;



function displaydataType(){
    var d = document.getElementById("dataType").value;
    var x = document.getElementById("Nucleotide");
    if( d == "N"){
        x.style.display = "block";
    }
    else{
        x.style.display = "none";
    }
}

function checksiteModel(){
    var sModel = document.getElementById("siteModel");
    var y = document.getElementById("smOptions");
    if(sModel.checked){
        y.style.display = "block";
        fixed = document.getElementById("fixed").value;
        alpha = document.getElementById("alpha").value;
        beta = document.getElementById("beta").value;
    }
    else{
        y.style.display= "none";
    }
}

function setsmOptions(){
    fixed = document.getElementById("fixed").value;
    alpha = document.getElementById("alpha").value;
    beta = document.getElementById("beta").value;
}

function getSubstitutionModel(){
    
}

function readText(fileData){
	scripttest = fileData;
}

/*
//Gets infor from the a file for each script
function doGET(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
		console.log("Test1"); //test
        if (xhr.readyState == 4) {
			console.log("1"); //test
            // The request is done; did it work?
            if (xhr.status == 200) {
                // ***Yes, use `xhr.responseText` here***
				console.log("2"); //test
                callback(xhr.responseText);
            } else {
                // ***No, tell the callback the call failed***
                callback(null);
			}
        }
    };
	script = author + model + scripttest; //test
    xhr.open("GET", path, true);
    xhr.send();
}

//Handles the data from whatever file is accessed
function handleFileData(fileData) {
	console.log("3");//test
    if (!fileData) {
        // Show error
		console.log("error");
        return;
    }
	else{
		console.log("4");//test
	}
    // Use the file data
	scripttest = fileData;
	model = 6;
	readText(fileData);
	console.log("Data from file");
    console.log("5");
}

//Gets the option of which model to get the file from
function val() {
    model = document.getElementById("theModel").value; 
	if(model == "1"){
		modeltype = "jc.txt"
	}
	else if(model == "2"){
		modeltype = "gtrGIR.txt";
	}
	else if(model == "3"){
		modeltype = "gtr.txt";
	}
}
*/


//creates the script that will be generated.
function createScript(){
    script = author + model + "\n" + scripttest + "\n" + fixed + "\n" + alpha + "\n" + beta; 
}


function resetScript(){
    script = "";
    document.getElementById('myTextarea').value = "Example script.....";
}

function generateScript(){
    //val();
    //doGET(modeltype, handleFileData, readText);
	createScript();
    document.getElementById('myTextarea').value = script; 
}