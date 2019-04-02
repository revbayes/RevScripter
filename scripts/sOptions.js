function createModelOptions(){
    $("#sOptions").empty();
    var y = document.getElementById("sOptions");
    
    //Substitution Model Header
    var h1 = $("<h2/>");
    var t = document.createTextNode("Substitution Model");
    h1[0].append(t);

    //QMatrix Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("QMatrix");
    h2[0].append(t);

    y.append(h1[0]);
    y.append(h2[0]);  
    
    
    if(($("#datatype").val()) == "N"){

        //Model Menu
        var x = $("<select id=\"mySelect\"  />");
        y.append(x[0]);

        //Model Menu Options
        var z = $("<option value=\"JC\" selected=\"selected\" />");
        var t = document.createTextNode("Jukes-Cantor");
        z[0].append(t);
        x[0].append(z[0]);

        var z = $("<option value=\"F81\" />");
        var t = document.createTextNode("F81");
        z[0].append(t);
        x[0].append(z[0]);

        var z = $("<option value=\"K80\"  />");
        var t = document.createTextNode("K80");
        z[0].append(t);
        x[0].append(z[0]);

        var z = $("<option value=\"HKY\" />");
        var t = document.createTextNode("HKY");
        z[0].append(t);
        x[0].append(z[0]);

        var z = $("<option value=\"GTR\" />");
        var t = document.createTextNode("GTR");
        z[0].append(t);
        x[0].append(z[0]);

        //Break Line
        addBreakLine(y.id);
        addBreakLine(y.id);

       //Space for options from Menu
       var choices = $("<div id=\"choices\" />");
       y.append(choices[0]);

        var temp = "#mySelect";
        var temp2 = "#choices";
        
        displaymodelOptions($(temp).val(),choices[0]);
        
        x[0].setAttribute("onchange", "displaymodelOptions($(\"" + temp +"\").val(), $(\"" + temp2 + "\"))");
       
         
    }  
}

function displaymodelOptions(value, choices){
    $(choices).empty();//clears choices

    if(value == "JC"){
        //JC has no options
    }

    if(value == "F81"){
        baseFrequencySimplex(choices,"f81");
    }

    if(value == "K80"){
        ttRealpos(choices,"k80");
    }

    if(value == "HKY"){
        ttRealpos(choices,"hky");
        baseFrequencySimplex(choices,"hky");
    }

    if(value == "GTR"){
        exSimplex(choices,"gtr");
        baseFrequencySimplex(choices,"gtr");
    }
}

function baseFrequencySimplex(choices, name){
     
    //Id names for the buttons and element choices
    var foption = "bff" + name;
    var fchoice = "bffc" + name;
    var eoption = "bfe" + name;
    var echoice = "bfec" + name;

    //Name attribute for the radio buttons
    var fename = "bffe" + name;

    //Base Frequency Header
    var t = document.createTextNode("Base Frequency: ");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //fixed option
    var x = $("<input type=\"radio\"  />");
    x[0].setAttribute("id", foption);
    x[0].setAttribute("name", fename);
    x[0].setAttribute("onchange", "bfsimplexOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")");
    choices.append(x[0]);        
    var t = document.createTextNode("Fixed");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
    
    //fixed choices
    var f = $("<div class=\"radiooptions\" />");  
    f[0].setAttribute("id", fchoice);
    choices.append(f[0]);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //estimated option
    var y = $("<input  type=\"radio\"  />");
    y[0].setAttribute("id", eoption);
    y[0].setAttribute("name", fename);
    y[0].setAttribute("onchange", "bfsimplexOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")");
    choices.append(y[0]);                           
    var t = document.createTextNode("Estimated");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));

    //estimated choices
    var e = $("<div class=\"radiooptions\"  />");
    e[0].setAttribute("id", echoice);

    choices.append(e[0]);
    addBreakLine($(choices).attr("id"));
            
}

function bfsimplexOptions(fixed, fixedc, estimated, estimatedc, name){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        var t = document.createTextNode("Enter 4 values for the pi simplex vector: ");
        var y1 = $("<input type = \"number\" value=\"0.25\" step=\".01\" style=\"width: 50px;\" />");       
        y1[0].setAttribute("id", name + "bfpi1");
        var y2 = $("<input type = \"number\" value=\"0.25\" step=\".01\" style=\"width: 50px;\" />"); 
        y2[0].setAttribute("id", name + "bfpi2");
        var y3 = $("<input type = \"number\" value=\"0.25\" step=\".01\" style=\"width: 50px;\" />"); 
        y3[0].setAttribute("id", name + "bfpi3");
        var y4 = $("<input type = \"number\" value=\"0.25\" step=\".01\" style=\"width: 50px;\" />");  
        y4[0].setAttribute("id", name + "bfpi4");
        fixedc.append(t);
        fixedc.append(y1[0]);
        fixedc.append(y2[0]);
        fixedc.append(y3[0]);
        fixedc.append(y4[0]);
    }

    if(estimated.is(':checked')){
        var m = $("<select />");
        m[0].setAttribute("id", name + "bfeSelect");
        var t = document.createTextNode("Choose prior distribution: ");
        estimatedc[0].append(t);
    
        //menu options
        var z = $("<option id=\"eval\" value=\"eval\" selected=\"selected\" />");
        var t = document.createTextNode("Dirichlet");
        z[0].append(t);
        m[0].append(z[0]);
        estimatedc[0].append(m[0]);
    
        //Break Line
        var mybr = document.createElement('br');
        estimatedc[0].append(mybr);
    
        //menu choices
        //Dirichlet Prior Distribution Option
        var dpo = $("<div />");
        dpo[0].setAttribute("id", name + "bfed");
        var t = document.createTextNode("Enter concentration parameters(>0): ");
    
        //Break Line
        var mybr = document.createElement('br');
        dpo[0].append(mybr);
        dpo[0].append(mybr);
    
        var y1 = $("<input type = \"number\" value = \"1\" style=\"width: 35px;\" />");
        y1[0].setAttribute("id", name + "bfcparameter1");
        var y2 = $("<input type = \"number\" value = \"1\" style=\"width: 35px;\" />");
        y2[0].setAttribute("id", name + "bfcparameter2");
        var y3 = $("<input type = \"number\" value = \"1\" style=\"width: 35px;\" />");
        y3[0].setAttribute("id", name + "bfcparameter3");
        var y4 = $("<input type = \"number\" value = \"1\" style=\"width: 35px;\" />");
        y4[0].setAttribute("id", name + "bfcparameter4");
        dpo[0].append(t);
        dpo[0].append(y1[0]);
        dpo[0].append(y2[0]);
        dpo[0].append(y3[0]);
        dpo[0].append(y4[0]);
        estimatedc[0].append(dpo[0]);
    }
}

function ttRealpos(choices, name){

    //Id names for the buttons and element choices
    var foption = "ttf" + name; //op1
    var fchoice = "ttfc" + name; //ch1
    var eoption = "tte" + name; //op2
    var echoice = "ttec" + name; //ch2

    //Name attribute for the radio buttons
    var fename = "ttfe" + name;

    //Base Frequency Header
    var t = document.createTextNode("Transition/Transversion Ratio: ");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //fixed option
    var x = $("<input type=\"radio\"  />");
    x[0].setAttribute("id", foption);
    x[0].setAttribute("name", fename);
    x[0].setAttribute("onchange", "realposOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")");
    choices.append(x[0]);        
    var t = document.createTextNode("Fixed");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
    
    //fixed choices
    var f = $("<div class=\"radiooptions\" />");  
    f[0].setAttribute("id", fchoice);
    choices.append(f[0]);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //estimated option
    var y = $("<input type=\"radio\"  />");
    y[0].setAttribute("id", eoption);
    y[0].setAttribute("name", fename);
    y[0].setAttribute("onchange", "realposOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")");
    choices.append(y[0]);
    var t = document.createTextNode("Estimated");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));

    //estimated choices
    var e = $("<div class=\"radiooptions\"  />");
    e[0].setAttribute("id", echoice);

    choices.append(e[0]);
    addBreakLine($(choices).attr("id"));
}

function realposOptions(fixed, fixedc, estimated, estimatedc, name){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        var t = document.createTextNode("Enter a value > 0 for the Kappa: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 25px;\" />");        
        y1[0].setAttribute("id", name +"kappa");
        fixedc.append(t);
        fixedc.append(y1[0]);
    }

    if(estimated.is(':checked')){
        //Id name for select menu
        var sName = "eSelect" + name;
        var dpOptions = "menuop" + name;

        var m = $("<select  />");
        m[0].setAttribute("id", sName);
        var t = document.createTextNode("Choose prior distribution: ");
        estimatedc[0].append(t);
    
        //menu options
        var z = $("<option value=\"E\" selected=\"selected\" />");
        var t = document.createTextNode("Exponential");
        z[0].append(t);
        m[0].append(z[0]);
        var z = $("<option value=\"G\"  />");
        var t = document.createTextNode("Gamma");
        z[0].append(t);
        m[0].append(z[0]);
        var z = $("<option value=\"L\"  />");
        var t = document.createTextNode("Lognormal");
        z[0].append(t);
        m[0].append(z[0]);
        var z = $("<option value=\"U\"  />");
        var t = document.createTextNode("Uniform");
        z[0].append(t);
        m[0].append(z[0]);
        estimatedc[0].append(m[0]);
    
        //Break Line
        var mybr = document.createElement('br');
        estimatedc[0].append(mybr);
    
        //menu choices
        var dpo = $("<div id=\"menuop\"/>");
        dpo[0].setAttribute("id", dpOptions);
    
        estimatedc[0].append(dpo[0]);

        //Calls to display the selected        
        displayrealposOptions($("#"+ sName).val(),dpo[0], name);
        
        m[0].setAttribute("onchange", "displayrealposOptions($(\"#" + sName +"\").val(), $(\"#" + dpOptions + "\"), (\"" + name + "\"))");
    }
}

function displayrealposOptions(value, choices, name){
    $(choices).empty();//clears choices

    // //Break Line
    addBreakLine($(choices).attr("id"));

    if(value == "E"){
        var t = document.createTextNode("Enter a shape parameter > 0: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 25px;\" />");        
        y1[0].setAttribute("id", name + "sparameter" );
        choices.append(t);
        choices.append(y1[0]);
    }

    if(value == "G"){
        var t = document.createTextNode("Enter a shape and rate parameters > 0: ");
        choices.append(t); 
        var mybr = document.createElement('br');

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Shape
        var t1 = document.createTextNode("Shape: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 25px;\" />");         
        y1[0].setAttribute("id", name + "sparameter")
        choices.append(t1);
        choices.append(y1[0]);

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Rate
        var t2 = document.createTextNode("Rate: ");
        var y2 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 25px;\" />");  
        y2[0].setAttribute("id", name + "rparameter")
        choices.append(t2);
        choices.append(y2[0]);

    }

    if(value == "L"){
        var t = document.createTextNode("Enter a mean and standard deviation parameters > 0: ");
        choices.append(t); 

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Mean
        var t1 = document.createTextNode("Mean: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 25px;\" />");         
        y1[0].setAttribute("id", name + "mparameter");
        choices.append(t1);
        choices.append(y1[0]);

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Standard Deviation
        var t2 = document.createTextNode("Standard Deviation: ");
        var y2 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 25px;\" />");  
        y2[0].setAttribute("id", name + "sdparameter");
        choices.append(t2);
        choices.append(y2[0]);
    }

    if(value == "U"){
        var t = document.createTextNode("Enter a min and max parameters > 0: ");
        choices.append(t); 

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Min
        var t1 = document.createTextNode("Min: ");
        var y1 = $("<input type = \"number\"value=\"1\" step=\"1\" style=\"width: 25px;\" />");         
        y1[0].setAttribute("id", name + "minparameter")
        choices.append(t1);
        choices.append(y1[0]);

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Max
        var t2 = document.createTextNode("Max: ");
        var y2 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 25px;\" />");  
        y2[0].setAttribute("id", name + "maxparameter")
        choices.append(t2);
        choices.append(y2[0]);
    }
}

function exSimplex(choices, name){
     
    //Id names for the buttons and element choices
    var foption = "exf" + name;
    var fchoice = "exfc" + name;
    var eoption = "exe" + name;
    var echoice = "exec" + name;

    //Name attribute for the radio buttons
    var fename = "exfe" + name;

    //Base Frequency Header
    var t = document.createTextNode("Exchangeabilities: ");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //fixed option
    var x = $("<input type=\"radio\"  />");
    x[0].setAttribute("id", foption);
    x[0].setAttribute("name", fename);
    x[0].setAttribute("onchange", "exsimplexOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")");
    choices.append(x[0]);        
    var t = document.createTextNode("Fixed");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
    
    //fixed choices
    var f = $("<div class=\"radiooptions\" />");  
    f[0].setAttribute("id", fchoice);
    choices.append(f[0]);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //estimated option
    var y = $("<input  type=\"radio\"  />");
    y[0].setAttribute("id", eoption);
    y[0].setAttribute("name", fename);
    y[0].setAttribute("onchange", "exsimplexOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")");
    choices.append(y[0]);                           
    var t = document.createTextNode("Estimated");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));

    //estimated choices
    var e = $("<div class=\"radiooptions\"  />");
    e[0].setAttribute("id", echoice);

    choices.append(e[0]);
    addBreakLine($(choices).attr("id"));
            
}

function exsimplexOptions(fixed, fixedc, estimated, estimatedc, name){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        var t = document.createTextNode("Enter 6 values for the pi simplex vector: ");
        var y1 = $("<input type = \"number\" value=\"0.16\" step=\".01\" style=\"width: 50px;\" />");       
        y1[0].setAttribute("id", name + "expi1");
        var y2 = $("<input type = \"number\" value=\"0.16\" step=\".01\" style=\"width: 50px;\" />"); 
        y2[0].setAttribute("id", name + "expi2");
        var y3 = $("<input type = \"number\" value=\"0.17\" step=\".01\" style=\"width: 50px;\" />"); 
        y3[0].setAttribute("id", name + "expi3");
        var y4 = $("<input type = \"number\" value=\"0.17\" step=\".01\" style=\"width: 50px;\" />");  
        y4[0].setAttribute("id", name + "expi4");
        var y5 = $("<input type = \"number\" value=\"0.17\" step=\".01\" style=\"width: 50px;\" />");  
        y5[0].setAttribute("id", name + "expi5");
        var y6 = $("<input type = \"number\" value=\"0.17\" step=\".01\" style=\"width: 50px;\" />");  
        y6[0].setAttribute("id", name + "expi6");
        fixedc.append(t);
        fixedc.append(y1[0]);
        fixedc.append(y2[0]);
        fixedc.append(y3[0]);
        fixedc.append(y4[0]);
        fixedc.append(y5[0]);
        fixedc.append(y6[0]);
    }

    if(estimated.is(':checked')){
        var m = $("<select />");
        m[0].setAttribute("id", name + "exeSelect");
        var t = document.createTextNode("Choose prior distribution: ");
        estimatedc[0].append(t);
    
        //menu options
        var z = $("<option id=\"eval\" value=\"eval\" selected=\"selected\" />");
        var t = document.createTextNode("Dirichlet");
        z[0].append(t);
        m[0].append(z[0]);
        estimatedc[0].append(m[0]);
    
        //Break Line
        var mybr = document.createElement('br');
        estimatedc[0].append(mybr);
    
        //menu choices
        //Dirichlet Prior Distribution Option
        var dpo = $("<div />");
        dpo[0].setAttribute("id", name + "exed");
        var t = document.createTextNode("Enter concentration parameters(>0): ");
    
        //Break Line
        var mybr = document.createElement('br');
        dpo[0].append(mybr);
        dpo[0].append(mybr);
    
        var y1 = $("<input type = \"number\" value = \"1\" style=\"width: 35px;\" />");
        y1[0].setAttribute("id", name + "excparameter1");
        var y2 = $("<input type = \"number\" value = \"1\" style=\"width: 35px;\" />");
        y2[0].setAttribute("id", name + "excparameter2");
        var y3 = $("<input type = \"number\" value = \"1\" style=\"width: 35px;\" />");
        y3[0].setAttribute("id", name + "excparameter3");
        var y4 = $("<input type = \"number\" value = \"1\" style=\"width: 35px;\" />");
        y4[0].setAttribute("id", name + "excparameter4");
        dpo[0].append(t);
        dpo[0].append(y1[0]);
        dpo[0].append(y2[0]);
        dpo[0].append(y3[0]);
        dpo[0].append(y4[0]);
        estimatedc[0].append(dpo[0]);
    }
}

//Extras- might need later
function displayFandE(choices){
     
    //fixed choice
    var x = $("<input id=\"fixed\" name=\"fande\" value = \"dandev\" type=\"radio\" onchange=\"display2RadioButton(\'fixed\', \'fop\', \'estimated\',\'eop\')\" />");
    choices.append(x[0]);
            
    var t = document.createTextNode("Fixed");
    choices.append(t);

    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));

    //fixed options
    var f = $("<div id =\"fop\" class=\"options\"/>");
    var t = document.createTextNode("Enter a value (greater than 0): ");
    var y1 = $("<input type = \"number\" id=\"f\" value = \"1\" style=\"width: 35px;\" />");        
    f[0].append(t);
    f[0].append(y1[0]);

    choices.append(f[0]);

    addBreakLine($(choices).attr("id"));

    //estimated choice
    var y = $("<input id=\"estimated\" name=\"fande\" type=\"radio\" onchange=\"display2RadioButton(\'fixed\', \'fop\', \'estimated\',\'eop\')\" />");
    choices.append(y[0]);
    var t = document.createTextNode("Estimated");
    choices.append(t);

    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));

    //estimated options
    var e = $("<div id=\"eop\" class = \"options\"/>");
    var t = document.createTextNode("Choose prior distribution: ");

    e[0].append(t);
    //Select menu
    var m = $("<select id=\"eSelect\"  />");
    //menu options
    var z = $("<option id=\"eval\" value=\"eval\" selected=\"selected\" />");
    var t = document.createTextNode("Exponential");
    z[0].append(t);
    m[0].append(z[0]);
    var z = $("<option id=\"eval2\" value=\"eval2\" />");
    var t = document.createTextNode("Gamma");
    z[0].append(t);
    m[0].append(z[0]);
    var z = $("<option id=\"eval3\" value=\"eval3\" />");
    var t = document.createTextNode("Lognormal");
    z[0].append(t);
    m[0].append(z[0]);
    var z = $("<option id=\"eval4\" value=\"eval4\" />");
    var t = document.createTextNode("Uniform");
    z[0].append(t);
    m[0].append(z[0]);

    e[0].append(m[0]);

    var mybr = document.createElement('br');
    e[0].append(mybr);


    //menu choices
    var t = document.createTextNode("Enter shape parameter(greater than 0): ");
    var y1 = $("<input type = \"number\" id=\"f\" value = \"1\" style=\"width: 35px;\" />");
    e[0].append(t);
    e[0].append(y1[0]);


    choices.append(e[0]);
    addBreakLine($(choices).attr("id"));

    
    
        
    // var x = document.createElement("INPUT");
    // x.setAttribute("type", "number");
    // x.setAttribute("id","number");

    // choices.append(x);
        
    
     
}

function displayFandEOptions(){
    
}

function addBreakLine(idname){
    var mybr = document.createElement('br');
    var y = document.getElementById(idname);
    y.appendChild(mybr);
}


createModelOptions();// for debugging
