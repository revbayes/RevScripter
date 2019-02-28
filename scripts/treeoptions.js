function displaytopUR(){
    document.getElementById("topu").style.display = "none";
    document.getElementById("topr").style.display = "none";

    if(document.getElementById("topuru").checked == true){
        document.getElementById("topu").style.display = "block";
    }
    if(document.getElementById("topurr").checked == true){
        document.getElementById("topr").style.display = "block";
    }
}

function displaytopURU(){
    document.getElementById("unrootf").style.display = "none";
    document.getElementById("unroote").style.display = "none";

    if(document.getElementById("unrootfef").checked == true){
        document.getElementById("unrootf").style.display = "block";
    }
    if(document.getElementById("unrootfee").checked == true){
        document.getElementById("unroote").style.display = "block";
    }
}

function displaytopURUPD(){
    var priordistribution = document.getElementById("topuepriordistribution").value;
    var UT = document.getElementById("UT").style.display = "none";
    
    document.getElementById(priordistribution).style.display = "block";
}

function displayutOG(){
    document.getElementById("utopo").style.display = "none";
    document.getElementById("utopn").style.display = "none";

    if(document.getElementById("utopono").checked == true){
        document.getElementById("utopo").style.display = "block";
    }
    if(document.getElementById("utoponn").checked == true){
        document.getElementById("untopn").style.display = "block";
    }
}

function displaytopURR(){
    document.getElementById("rootf").style.display = "none";
    document.getElementById("roote").style.display = "none";

    if(document.getElementById("rootfef").checked == true){
        document.getElementById("rootf").style.display = "block";
    }
    if(document.getElementById("rootfee").checked == true){
        document.getElementById("roote").style.display = "block";
    }
}

function displaytopURRCO(){
    document.getElementById("rootage").style.display = "none";
    document.getElementById("origentime").style.display = "none";

    if(document.getElementById("raotrootage").checked == true){
        document.getElementById("rootage").style.display = "block";
    }
    if(document.getElementById("raotorigentime").checked == true){
        document.getElementById("origentime").style.display = "block";
    }
}

function displayCORA(){
    document.getElementById("rootagef").style.display = "none";
    document.getElementById("rootagee").style.display = "none";

    if(document.getElementById("rootagefef").checked == true){
        document.getElementById("rootagef").style.display = "block";
    }
    if(document.getElementById("rootagefee").checked == true){
        document.getElementById("rootagee").style.display = "block";
    }
}

function displayrootageEList(){
    var priordistribution = document.getElementById("rootageelist").value;
    var URA = document.getElementById("URA").style.display = "none";
    var ERA = document.getElementById("ERA").style.display = "none";
    var GRA = document.getElementById("GRA").style.display = "none";
    var LRA = document.getElementById("LRA").style.display = "none";

    document.getElementById(priordistribution).style.display = "block";
}

function displayCOOT(){
    document.getElementById("origentimef").style.display = "none";
    document.getElementById("origentimee").style.display = "none";

    if(document.getElementById("origentimefef").checked == true){
        document.getElementById("origentimef").style.display = "block";
    }
    if(document.getElementById("origentimefee").checked == true){
        document.getElementById("origentimee").style.display = "block";
    }
}

function displayorigentimeEList(){
    var priordistribution = document.getElementById("origentimeelist").value;
    var URA = document.getElementById("URA2").style.display = "none";
    var ERA = document.getElementById("ERA2").style.display = "none";
    var GRA = document.getElementById("GRA2").style.display = "none";
    var LRA = document.getElementById("LRA2").style.display = "none";

    document.getElementById(priordistribution).style.display = "block";
}

function display3SelectList(listname,option1,option2,option3){
    var listvalue = document.getElementById(listname).value;
    var URA = document.getElementById(option1).style.display = "none";
    var ERA = document.getElementById(option2).style.display = "none";
    var GRA = document.getElementById(option3).style.display = "none";
   

    document.getElementById(listvalue).style.display = "block";
}

function display4SelectList(listname,option1,option2,option3, option4){
    var listvalue = document.getElementById(listname).value;
    var OP1 = document.getElementById(option1).style.display = "none";
    var OP2 = document.getElementById(option2).style.display = "none";
    var OP3 = document.getElementById(option3).style.display = "none";
    var OP4 = document.getElementById(option4).style.display="none"

    document.getElementById(listvalue).style.display = "block";
}

function display2RadioButton(option1b,option1, option2b, option2){
    document.getElementById(option1).style.display = "none";
    document.getElementById(option2).style.display = "none";

    if(document.getElementById(option1b).checked == true){
        document.getElementById(option1).style.display = "block";
    }
    if(document.getElementById(option2b).checked == true){
        document.getElementById(option2).style.display = "block";
    }
}

