/*Creates the script for Substitution Model options */
function getSubstitutionOptions(){
    //variable for each part
    var substitutionModel = "";
    var model = "";
    var ioption = "";
    var goption = "";

    //Adds the script for the selected model
    if(document.getElementById("nucleotideModel").value == "JC"){
        model = getQString("JC", "num_char_states", null);
    }
    else if(document.getElementById("nucleotideModel").value == "F81"){
        //Checks the basefrequency
        //If it is fixed
        if($("#ff81bf").is(':checked')){
            var n = [$("#f81bf0").val(), $("#f81bf1").val(), $("#f81bf2").val(), $("#f81bf3").val()];
            model = getSimplexFString("pi_F81", n);
        }
        //if it is estimated
        if($("#ef81bf").is(':checked')){
            model = getSimplexEString("pi_F81", $("#f81bfcparameter0").val(), $("#f81bfcparameter0").val(), $("#f81bfcparameter0").val(), $("#f81bfcparameter0").val());
        }
        var temp = [model, getQString("F81", "pi_F81", null)];
        model = temp.join("\n");

        //Checks to make sure one of the radio buttons is checked
        if(!$("#ff81bf").is(':checked') && !$("#ef81bf").is(':checked')){
            return null;
        }
    }
    else if(document.getElementById("nucleotideModel").value == "K80"){
        //Checks transition/transversion ratio
        //If it is fixed
        if($("#fk80tt").is(':checked')){
            
            model = getProbabilityFString("kappa_K80", $("#k80tt").val());
        }
        //if it is estimated
        if($("#ek80tt").is(':checked')){
            model = getRealPosEString($("#eMenuk80tt").val(), "kappa_K80", $("#k80tt").val(), $("#k80tt2").val())
        }
        var temp = [model, getQString("K80", "kappa_K80", null)];
        model = temp.join("\n");

        //Checks to make sure one of the radio buttons is checked
        if(!$("#fk80tt").is(':checked') && !$("#ek80tt").is(':checked')){
            return null;
        }
    }
    else if(document.getElementById("nucleotideModel").value == "HKY"){

        var tt = "";
        var bf = "";

        //Checks transition/transversion ratio
        //If it is fixed
        if($("#fhkytt").is(':checked')){
            
            tt = getProbabilityFString("kappa_HKY", $("#hkytt").val());
        }
        //if it is estimated
        if($("#ehkytt").is(':checked')){
            tt = getRealPosEString($("#eMenuhkytt").val(), "kappa_HKY", $("#hkytt").val(), $("#hkytt2").val())
        }

        //Checks the basefrequency
        //If it is fixed
        if($("#fhkybf").is(':checked')){
            var n = [$("#hkybf0").val(), $("#hkybf1").val(), $("#hkybf2").val(), $("#hkybf3").val()];
            bf = getSimplexFString("pi_HKY", n);
        }
        //if it is estimated
        if($("#ehkybf").is(':checked')){
            bf = getSimplexEString("pi_HKY", $("#hkybfcparameter0").val(), $("#hkybfcparameter1").val(), $("#hkybfcparameter2").val(), $("#hkybfcparameter3").val());
        }

        var temp = [tt, bf, getQString("HKY", "kappa_HKY", "pi_HKY")];
        model = temp.join("\n");

        //Checks to make sure one of the radio buttons is checked
        if(!$("#fhkytt").is(':checked') && !$("#ehkytt").is(':checked')){
            return null;
        }

        //Checks to make sure one of the radio buttons is checked
        if(!$("#fhkybf").is(':checked') && !$("#ehkybf").is(':checked')){
            return null;
        }

    }
    else if(document.getElementById("nucleotideModel").value == "GTR"){
        var er = "";
        var bf = "";
        
        //Checks exchangability
        //If it is fixed
        if($("#fgtre").is(':checked')){
            var n = [$("#gtre0").val(), $("#gtre1").val(), $("#gtre2").val(), $("#gtre3").val(), $("#gtre4").val(), $("#gtre5").val()];
            er = getSimplexFString("er_GTR", n);
        }
        //If it is estimated
        if($("#egtre").is(':checked')){
            er = getSimplex6EString("er_GTR", $("#gtrecparameter0").val(), $("#gtrecparameter1").val(), $("#gtrecparameter2").val(), $("#gtrecparameter3").val(), $("#gtrecparameter4").val(), $("#gtrecparameter5").val());
        }

        //Checks the basefrequency
        //If it is fixed
        if($("#fgtrbf").is(':checked')){
            var n = [$("#gtrbf0").val(), $("#gtrbf1").val(), $("#gtrbf2").val(), $("#gtrbf3").val()];
            bf = getSimplexFString("pi_GTR", n);
        }
        //if it is estimated
        if($("#egtrbf").is(':checked')){
            bf = getSimplexEString("pi_GTR", $("#gtrbfcparameter0").val(), $("#gtrbfcparameter1").val(), $("#gtrbfcparameter2").val(), $("#gtrbfcparameter3").val());
        }

        var temp = [er, bf, getQString("GTR", "er_GTR", "pi_GTR")];
        model = temp.join("\n");

        //Checks to make sure one of the radio buttons is checked
        if(!$("#fgtre").is(':checked') && !$("#egtre").is(':checked')){
            return null;
        }

        //Checks to make sure one of the radio buttons is checked
        if(!$("#fgtrbf").is(':checked') && !$("#egtrbf").is(':checked')){
            return null;
        }

    }

    //Adds the script for the i option
    if($("#icheckbox").is(':checked')){
        //Checks the matrix type
        //If it is fixed
        if($("#fioption").is(':checked')){
            ioption = getProbabilityFString("prop_inv", $("#ioptionpparameter").val());
        }
        //if it is estimated
        if($("#eioption").is(':checked')){
           ioption = getProbabilityEString("prop_inv", $("#ioptionpalpha").val(), $("#ioptionpbeta").val());
        }

        //Checks to make sure one of the radio buttons is checked
        if(!$("#fioption").is(':checked') && !$("#eioption").is(':checked')){
            return null;
        }

    }
    
    //Adds the script for the g option
    if($("#gcheckbox").is(':checked')){

        var site_rates = "";
        //Checks the shape parameter
        //If it is fixed
        if($("#fgoption").is(':checked')){
            goption = getProbabilityFString("site_rates_shape", $("#goption").val());
            site_rates = "site_rates := fnDiscretizeGamma(site_rates_shape, num_rate_categories)";
        }
        //if it is estimated
        if($("#egoption").is(':checked')){
           goption = getRealPosEString($("#eMenugoption").val(), "site_rates_shape", $("#goption").val(), $("#goption2").val());
           site_rates = "site_rates := fnDiscretizeGamma(site_rates_shape, site_rates_shape, num_rate_categories)";
        }

        var temp = [goption, "num_rate_categories <- " + $("#numratecategories").val() ,site_rates];
        goption = temp.join("\n");

        //Checks to make sure one of the radio buttons is checked
        if(!$("#fgoption").is(':checked') && !$("#egoption").is(':checked')){
            return null;
        }
    }

    //Adds the i+ and g+ options that checked to the script
    if(ioption == "" && goption == ""){
        substitutionModel = [model];
    }
    else if(ioption != "" && goption == ""){
        substitutionModel = [model, ioption];
    }
    else if(goption != "" && ioption == ""){
        substitutionModel = [model, goption];
    }
    else{
        substitutionModel = [model, ioption, goption];
    }

    return substitutionModel.join('\n\n');

}

//Makes the script for a Q string (Ex. "Q <- fnJC(num_char_states)")
function getQString(name, input, input2){
    if(input2){
        var scripts = ["Q := ", "fn", name, "(", input, ",", input2, ")"];
        return scripts.join('');
    }
    else{
        if(name == "JC"){
            var scripts = ["Q <- ", "fn", name, "(", input, ")"];
        }
        else{
            var scripts = ["Q :- ", "fn", name, "(", input, ")"];
        }
        return scripts.join('');
    }
}

//Makes the script for a simplex parameter when it is Fixed
function getSimplexFString(parameter, n){

    var values = n.shift() + ",";
    var nLength = n.length;
    for(i=1; i <= nLength; i++){
        if(i < nLength){
            values = values + " " + n.shift() + ", ";
        }
        else{
            values = values + " " + n.shift(); 
        }
        
    }

    return parameter + " <- " + "v(" + values + ")";
}

//Makes the script for a simplex parameter when it is estimataed
function getSimplexEString(parameter, value1, value2, value3, value4){
    var scripts = [parameter + " ~ dnDirichlet(v(" + value1 + ", " + value2 + ", " + value3 + ", " + value4 + "))", "moves.append(mvBetaSimplex(" + parameter + "))"];
    return scripts.join("\n");
}

//Makes the script for a 6-simplex parameter when it is estimataed
function getSimplex6EString(parameter, value1, value2, value3, value4, value5, value6){
    var scripts = [parameter + " ~ dnDirichlet(v(" + value1 + ", " + value2 + ", " + value3 + ", " + value4 + ", " + value5 + ", " + value6 + "))", "moves.append(mvBetaSimplex(" + parameter + "))"];
    return scripts.join("\n");
}

//Makes the script for a probabilty parameter when it is fixed 
//This also works for Real Pos when it is fixed
function getProbabilityFString(parameter, value){
    return parameter + " <- " + value;
}

//Makes the script for a probability parameter when it is estimated
function getProbabilityEString(parameter, alpha, beta){
    var scripts = [parameter + " ~ " + "dnBeta(" + alpha + ", " + beta + ")", "moves.append(mvScale(" + parameter + "))"];
    return scripts.join("\n");
}

//Makes the script for a Real Pos parameter when it is estimated
function getRealPosEString(option, parameter, value1, value2){
    dn = "";
    if(option == "E"){
        dn = "dnExponential(" + value1 + ")";
    }
    
    if(option == "G"){
        dn = "dnGamma(" + value1 + "," + value2 + ")";
    }

    if(option == "L"){
        dn = "dnLognormal(mean=" + value1 + ",sd=" + value2 + ")";
    }

    if(option == "U"){
        dn = "dnUniform(" + value1 + "," + value2 + ")";
    }

    var scripts = [parameter + " ~ " + dn, "moves.append(mvScale(" + parameter + "))"];
    return scripts.join("\n");

}

