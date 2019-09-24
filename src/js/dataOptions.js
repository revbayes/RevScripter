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
    var textbox = $("<input type=\"text\" id=\"datafilepath\" style=\"width: 500px;\"  placeholder=\"e.g., myfilename.nex\" ></input>");

    //Reset button
    var resetbutton = $("<button onclick=\"createdataOptions()\">Reset<button/>");

    //Next button
    var nextbutton = $("<button onclick=\"gotoTab('substitutiontab')\" class =\"nextbutton\">Next<button/>");

    //Adding Header and textbox
    dataOptions.append(dataHeader[0]);
    dataOptions.append(textbox[0]);


    //Label for the textbox
    $("#datafilepath").before("<label for='radio' id=\"datafilepathlabel\" >Enter the name of your data file (NEXUS format): </label><br/>");
    
    //Break Line
    addBreakLine(dataOptions.id);
    addBreakLine(dataOptions.id);

    //Adding reset and next button
    dataOptions.append(resetbutton[0]);
    dataOptions.append(nextbutton[0]);
}

//Adds a break line to the given element by using its given id
function addBreakLine(idname){
    var mybr = document.createElement('br');
    var y = document.getElementById(idname);
    y.appendChild(mybr);
}

//Creates the Data options
createdataOptions();