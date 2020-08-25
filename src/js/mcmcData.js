/*Creates the script for MCMC options */
function getMCMCOptions(){
    var filemonitor = ["monitors.append( mnModel(filename=\"" + $("#parameterlogoutputfile").val() + "\", printgen=" + $("#fmprintfrequency").val() + ") )",
                         "monitors.append( mnFile(filename=\"" + $("#treelogoutputfile").val() + "\", printgen=" + $("#fmprintfrequency").val() + ", psi) )"];

    filemonitor = filemonitor.join("\n");

    var screenmonitor = "monitors.append( mnScreen(printgen=" + $("#smprintfrequency").val() + ") )";

    var mcmc = ["mymcmc = mcmc(mymodel, monitors, moves, nruns=" + $("#numberofruns").val() + ")", 
        "mymcmc.run(generations=" +  $("#generationnumbers").val() + ")"];

    mcmc = mcmc.join("\n");

    //Checks, to make sure that parameter log output file and tree log output  file are not empty
    if(($("#parameterlogoutputfile").val().length < 1) || ($("#treelogoutputfile").val().length < 1)){
        return null;
    }

    //Gives an alert if Number of Generations is bigger than 4
    if( $("#numberofruns").val() > 4){
        alert("Running more than 4 runs simultaneously may lead to a large computational burden.");
    }



    var scripts = [filemonitor, screenmonitor, mcmc];

    return scripts.join("\n\n");
}