/*This is used to generate the Data options*/
function createdataOptions(){

    //Clears the data div
    $("#dataOptions").empty();

    //Gets data Div
    var dataOptions = document.getElementById("dataOptions");
    
    //Substitution Model Header
    var dataHeader = $("<h2/>");
    var t = document.createTextNode("Data");
    dataHeader[0].append(t);

    //Input file text box
    // var textbox = $("<input type=\"text\" id=\"datafilepath\" style=\"width: 500px;\"  placeholder=\"e.g., myfilename.nex\" ></input>");
    var textbox = $("<input type=\"file\" id=\"datafilepath\" ></input>");
   
    //Reset button
    var resetbutton = $("<button onclick=\"createdataOptions()\">Reset<button/>");

    //Next button
    var nextbutton = $("<button onclick=\"gotoTab('substitutiontab')\" class =\"nextbutton\">Next<button/>");

    //Adding the information that will be displayed from parsed file
    var parsedData = $("<textarea id=\"parseddata\" rows=\"6\" cols=\"40\" wrap=\"soft\" readonly></textarea>");

    //Adding Header and textbox
    dataOptions.append(dataHeader[0]);
    dataOptions.append(textbox[0]);
    dataOptions.append(parsedData[0]);

    //Label for the file input
    $("#datafilepath").before("<label id=\"datafilepathlabel\" >Enter the name of your data file (NEXUS format): </label><br/>");
    
     //Label for the file input
     $("#parseddata").before("<label id=\"parseddatalabel\" style=\"margin-top: 40px;\">Parsed data: </label><br/>");

    //Parsed file data
    document.getElementById('datafilepath').addEventListener('change', handleFileSelect, false);

    // var temparray = filecontent.split('\n');
    // var n = new NexusReader(temparray);

    //Break Line
    addBreakLine(dataOptions.id);
    addBreakLine(dataOptions.id);

    //Adding reset and next button
    dataOptions.append(resetbutton[0]);
    dataOptions.append(nextbutton[0]);
}

//Handles the inputed file and converts data to text
function handleFileSelect(event){
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

//Handles the data from the inputed file
function handleFileLoad(event){
    console.log(event);
    filecontent = event.target.result;
    var temparray = filecontent.split('\n');
    // var n = new NexusReader(temparray);
    // console.log("Taxa Size: " + n.getTaxa.length);
    parseData(temparray);
}

function parseData(data){
    var n = new NexusReader(data);
    document.getElementById('parseddata').textContent = "Datatype: " + n.getdataType + "\n\nNumber of Taxa: " + n.getNTAX + "\n\nNumber of Characters: " + n.getNCHAR;
}

//Adds a break line to the given element by using its given id
function addBreakLine(idname){
    var mybr = document.createElement('br');
    var y = document.getElementById(idname);
    y.appendChild(mybr);
}

//Creates the Data options
createdataOptions();