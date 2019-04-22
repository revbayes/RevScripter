function createMCMCOptions(){
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
    var input = $("<input type =\"number\" value =\"1\" style=\"width: 40px;\" id=\"fmprintfrequency\" />");
    option.append(t);
    option.append(input[0]);

    //Break Line
    addBreakLine(option.id);

    //Name for parameter log output file
    var t = document.createTextNode("Enter name for parameter log output file: ")
    var input = $("<input type=\"text\" id=\"parameterlogoutputfile\"  style =\"width: 300px;\" />");
    option.append(t);
    option.append(input[0]);

    //Break Line
    addBreakLine(option.id);

    //Name for tree log outputfile
    var t = document.createTextNode("Enter name for tree log output file: ")
    var input = $("<input type=\"text\" id=\"treelogoutputfile\"  style =\"width: 300px;\" />");
    option.append(t);
    option.append(input[0]);

    //Screen Monitor Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("Screen Monitors");
    h2[0].append(t);
    option.append(h2[0]); 

    //Print Frequency Input
    var t = document.createTextNode("Enter print frequency: ");
    var input = $("<input type =\"number\" value =\"1\" style=\"width: 40px;\" id=\"smprintfrequency\" />");
    option.append(t);
    option.append(input[0]);

    //MCMC Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("MCMC");
    h2[0].append(t);
    option.append(h2[0]); 

    //Number of Generations Input
    var t = document.createTextNode("Enter number of generations: ");
    var input = $("<input type =\"number\" value =\"1\" style=\"width: 40px;\" id=\"generationnumbers\" />");
    option.append(t);
    option.append(input[0]);

    //Break Line
    addBreakLine(option.id);

    //Number of runs Input
    var t = document.createTextNode("Enter number of runs: ");
    var input = $("<input type =\"number\" value =\"1\" style=\"width: 40px;\" id=\"numberofruns\" />");
    option.append(t);
    option.append(input[0]);


}

createMCMCOptions();