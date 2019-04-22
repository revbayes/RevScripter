function getMCMCOptions(){
    var filemonitor = ["monitors = MonitorsVector()", "monitors.append( mnModel(filename=\"" + $("#parameterlogoutputfile").val() + "\", printgen=" + $("#fmprintfrequency").val() + ") )",
                         "monitors.append( mnFile(filename=\"" + $("#treelogoutputfile").val() + "\", printgen=" + $("#fmprintfrequency").val() + ", psi) )"];

    filemonitor = filemonitor.join("\n");

    var screenmonitor = "monitors.append( mnScreen(printgen=" + $("#smprintfrequency").val() + ") )";

    var mcmc = ["mymcmc = mcmc(mymodel, monitors, moves, nruns=" + $("#generationnumbers").val() + ")", 
        "mymcmc.run(generations=" + $("#numberofruns").val() + ")"];

    mcmc = mcmc.join("\n");

    var scripts = [filemonitor, screenmonitor, mcmc];

    return scripts.join("\n\n");
}