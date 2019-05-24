/*Used to create the MCMC options*/
function createMCMCOptions(){
    
    //Clears mcmc div
    $("#mcmcOptions").empty();

    //gets the mcmc div
    var option = document.getElementById("mcmcOptions");
    
    //Tree Model Header
    var h1 = $("<h2/>");
    var t = document.createTextNode("MCMC");
    h1[0].append(t);
    option.append(h1[0]); 

    //File Monitors Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("File Monitors");
    h2[0].append(t);
    option.append(h2[0]); 


    //Print Frequency Input
    var t = document.createTextNode("Enter print frequency: ");
    var input = $("<input type =\"number\" min=\"1\" value =\"10\" class=\"numberinput\" id=\"fmprintfrequency\" />");
    option.append(t);
    option.append(input[0]);

    //Break Line
    addBreakLine(option.id);
    addBreakLine(option.id);

    //Name for parameter log output file
    var t = document.createTextNode("Enter name for parameter log output file: ")
    var input = $("<input type=\"text\" placeholder=\"myfile.log\" id=\"parameterlogoutputfile\"  style =\"width: 300px;\" />");
    option.append(t);
    option.append(input[0]);

    //Break Line
    addBreakLine(option.id);
    addBreakLine(option.id);

    //Name for tree log outputfile
    var t = document.createTextNode("Enter name for tree log output file: ")
    var input = $("<input type=\"text\" placeholder=\"myfile.trees\" id=\"treelogoutputfile\"  style =\"width: 300px;\" />");
    option.append(t);
    option.append(input[0]);

    //Screen Monitor Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("Screen Monitors");
    h2[0].append(t);
    option.append(h2[0]); 

    //Print Frequency Input
    var t = document.createTextNode("Enter print frequency: ");
    var input = $("<input type =\"number\"  min= \"1\" value =\"10\" class=\"numberinput\" id=\"smprintfrequency\" />");
    option.append(t);
    option.append(input[0]);

    //MCMC Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("MCMC");
    h2[0].append(t);
    option.append(h2[0]); 

    //Number of Generations Input
    var t = document.createTextNode("Enter number of generations: ");
    var input = $("<input type =\"number\"  min= \"1\" value =\"10000\" class=\"numberinput\" id=\"generationnumbers\" />");
    option.append(t);
    option.append(input[0]);

    //Break Line
    addBreakLine(option.id);
    addBreakLine(option.id);

    //Number of runs Input
    var t = document.createTextNode("Enter number of runs: ");
    var input = $("<input type =\"number\"  min= \"1\"  value =\"1\" class=\"numberinput\" id=\"numberofruns\" />");
    option.append(t);
    option.append(input[0]);

    //Break Line
    addBreakLine(option.id);
    addBreakLine(option.id);

    //Back button
    var backbutton = $("<button onclick=\"gotoTab('treetab')\">Back<button/>");

    //Reset button
    var resetbutton = $("<button onclick=\"createMCMCOptions()\">Reset<button/>");

    //Next button
    var nextbutton = $("<button onclick=\"gotoTab('scripttab')\" class =\"nextbutton\">Next<button/>");

    //adds the back, reset, and next button
    option.append(backbutton[0]);
    option.append(resetbutton[0]);
    option.append(nextbutton[0]);

}

//Creates the MCMC Options
createMCMCOptions();