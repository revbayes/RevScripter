//Nucleotide with Amino Acid Option
/*
function createModelOptions(){
    $("#substitutionOptions").empty();
    var y = document.getElementById("substitutionOptions");
    
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
    
    //Nucleotide Option
    if(($("#datatype").val()) == "N"){

        //Model Menu
        var t = document.createTextNode("Model ");
        y.append(t);
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
       var choices = $("<div id=\"nOptions\" class = \"menuOption\" />");
       y.append(choices[0]);

        var temp = "#mySelect";
        var temp2 = "#nOptions";
        
        displaymodelOptions($(temp).val(),choices[0]);
        
        x[0].setAttribute("onchange", "displaymodelOptions($(\"" + temp +"\").val(), $(\"" + temp2 + "\"))");
       
         
    }  

    //Amino Acid Option
    if(($("#datatype").val()) == "A"){
        
        //Amino Acid Options
        var aaOptions = $("<div id= \"aaoptions\" class=\"menuOption\" />");
        y.append(aaOptions[0]);

        displayAAOptions(aaOptions[0], "aa");

    }

    //Site Model Header
    var h2 = $("<h3 />");
    var t = document.createTextNode("Site Model");
    h2[0].append(t);
    y.append(h2[0]);

    //+I-Button
    var i = document.createTextNode("+I");
    var iButton = $("<input type=\"checkbox\" id =\"iicheckbox\"  />");
    iButton[0].setAttribute("onchange","displayiCheckBoxOp($(\"#iicheckbox\"), $(\"#iioptions\"))" );
    var iOptions = $("<div id= \"iioptions\" class=\"menuOption\" />");

    y.append(i);
    y.append(iButton[0]);

    //Break Line
    addBreakLine(y.id);
    addBreakLine(y.id);

    y.append(iOptions[0]);
 
    //+G-Button
    var g = document.createTextNode("+G");
    var gButton = $("<input type=\"checkbox\" id =\"ggcheckbox\" />");
    gButton[0].setAttribute("onchange","displaygCheckBoxOp($(\"#ggcheckbox\"), $(\"#ggoptions\"))" );
    var gOptions = $("<div id= \"ggoptions\" class=\"Option\" />");

    y.append(g);
    y.append(gButton[0]);

    //Break Line
    addBreakLine(y.id);
    addBreakLine(y.id);
     
    y.append(gOptions[0]);

   
}
*/

//Only Nucelotide
function createModelOptions(){
    $("#substitutionOptions").empty();
    var y = document.getElementById("substitutionOptions");
    
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
    
    //Nucleotide Option

        //Model Menu
        var t = document.createTextNode("Model ");
        y.append(t);
        var x = $("<select id=\"nucleotideModel\"  />");
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
       var choices = $("<div id=\"nOptions\" class = \"menuOption\" />");
       y.append(choices[0]);

        var temp = "#nucleotideModel";
        var temp2 = "#nOptions";
        
        displaymodelOptions($(temp).val(),choices[0]);
        
        x[0].setAttribute("onchange", "displaymodelOptions($(\"" + temp +"\").val(), $(\"" + temp2 + "\"))");
       
         

    //Site Model Header
    var h2 = $("<h3 />");
    var t = document.createTextNode("Site Model");
    h2[0].append(t);
    y.append(h2[0]);

    //+I-Button
    var i = document.createTextNode("+I");
    var iButton = $("<input type=\"checkbox\" id =\"icheckbox\"  />");
    iButton[0].setAttribute("onchange","displayiCheckBoxOp($(\"#icheckbox\"), $(\"#ioptions\"))" );
    var iOptions = $("<div id= \"ioptions\" class=\"menuOption\" />");

    y.append(i);
    y.append(iButton[0]);

    //Break Line
    addBreakLine(y.id);
    addBreakLine(y.id);

    y.append(iOptions[0]);
 
    //+G-Button
    var g = document.createTextNode("+G");
    var gButton = $("<input type=\"checkbox\" id =\"gcheckbox\" />");
    gButton[0].setAttribute("onchange","displaygCheckBoxOp($(\"#gcheckbox\"), $(\"#goptions\"))" );
    var gOptions = $("<div id= \"goptions\" class=\"menuOption\" />");

    y.append(g);
    y.append(gButton[0]);

    //Break Line
    addBreakLine(y.id);
    addBreakLine(y.id);
     
    y.append(gOptions[0]);

   
}

function displaymodelOptions(value, choices){
    $(choices).empty();//clears choices

    if(value == "JC"){
        //JC has no options
    }

    if(value == "F81"){
        displayFE(choices,"f81bf","Base Frequency", "simplexOptions", 4, "pi_F81");    
    }

    if(value == "K80"){
        displayFE(choices,"k80tt", "Transition/Transversion Ratio", "realposOptions", null, "kappa_K80");
    }

    if(value == "HKY"){
        displayFE(choices,"hkytt", "Transition/Transversion Ratio", "realposOptions", null, "kappa_HKY");
        displayFE(choices,"hkybf", "Base Frequency", "simplexOptions", 4, "pi_HKY");
    }

    if(value == "GTR"){
        displayFE(choices,"gtre", "Exchangeabilities", "simplexOptions", 6, "er_GTR");
        displayFE(choices,"gtrbf", "Base Frequency", "simplexOptions", 4, "pi_GTR");
    }
}

function simplexOptions(fixed, fixedc, estimated, estimatedc, name, n, parameter){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        //Header
        var t = document.createTextNode("Enter " + n + " values for the " + parameter + " simplex vector (Values must add up to 1): ");
        fixedc.append(t);

        var i;
        for (i = 0; i < n; i++) { 
            var input = $("<input type = \"number\" value=\"0\" step=\".01\" style=\"width: 45px;\" />");       
            input[0].setAttribute("id", name + i);
            fixedc.append(input[0]);
        }

    }

    if(estimated.is(':checked')){
        var m = $("<select />");
        m[0].setAttribute("id", name + "eSelect");
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
        var dpo = $("<div class =\"menuOption\" />");
        dpo[0].setAttribute("id", name + "ed");
        var t = document.createTextNode("Enter concentration parameters (>0): ");
    
        //Break Line
        var mybr = document.createElement('br');
        dpo[0].append(mybr);
        dpo[0].append(mybr);
    
        var y1 = $("<input type = \"number\" value = \"1\" style=\"width: 40px;\" />");
        y1[0].setAttribute("id", name + "cparameter1");
        var y2 = $("<input type = \"number\" value = \"1\" style=\"width: 40px;\" />");
        y2[0].setAttribute("id", name + "cparameter2");
        var y3 = $("<input type = \"number\" value = \"1\" style=\"width: 40px;\" />");
        y3[0].setAttribute("id", name + "cparameter3");
        var y4 = $("<input type = \"number\" value = \"1\" style=\"width: 40px;\" />");
        y4[0].setAttribute("id", name + "cparameter4");
        dpo[0].append(t);
        dpo[0].append(y1[0]);
        dpo[0].append(y2[0]);
        dpo[0].append(y3[0]);
        dpo[0].append(y4[0]);
        estimatedc[0].append(dpo[0]);
    }
}

function realposOptions(fixed, fixedc, estimated, estimatedc, name, parameter){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        var t = document.createTextNode("Enter a value > 0 for the " + parameter + ": ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 40px;\" />");        
        y1[0].setAttribute("id", name);
        fixedc.append(t);
        fixedc.append(y1[0]);
    }

    if(estimated.is(':checked')){
        //Id name for select menu
        var sName = "eMenu" + name;
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
        var dpo = $("<div id=\"menuop\" class =\"menuOption\" />");
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
        var t = document.createTextNode("Enter shape parameter > 0: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 40px;\" />");        
        y1[0].setAttribute("id", name);
        choices.append(t);
        choices.append(y1[0]);
    }

    if(value == "G"){
        var t = document.createTextNode("Enter shape and rate parameters > 0: ");
        choices.append(t); 
        var mybr = document.createElement('br');

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Shape
        var t1 = document.createTextNode("Shape: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 40px;\" />");         
        y1[0].setAttribute("id", name)
        choices.append(t1);
        choices.append(y1[0]);

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Rate
        var t2 = document.createTextNode("Rate: ");
        var y2 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 40px;\" />");  
        y2[0].setAttribute("id", name + "2")
        choices.append(t2);
        choices.append(y2[0]);

    }

    if(value == "L"){
        var t = document.createTextNode("Enter mean and standard deviation parameters > 0: ");
        choices.append(t); 

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Mean
        var t1 = document.createTextNode("Mean: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 40px;\" />");         
        y1[0].setAttribute("id", name);
        choices.append(t1);
        choices.append(y1[0]);

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Standard Deviation
        var t2 = document.createTextNode("Standard Deviation: ");
        var y2 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 40px;\" />");  
        y2[0].setAttribute("id", name + "2");
        choices.append(t2);
        choices.append(y2[0]);
    }

    if(value == "U"){
        var t = document.createTextNode("Enter min and max parameters > 0: ");
        choices.append(t); 

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Min
        var t1 = document.createTextNode("Min: ");
        var y1 = $("<input type = \"number\"value=\"0\" step=\"1\" style=\"width: 40px;\" />");         
        y1[0].setAttribute("id", name);
        choices.append(t1);
        choices.append(y1[0]);

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Max
        var t2 = document.createTextNode("Max: ");
        var y2 = $("<input type = \"number\" value=\"100\" step=\"1\" style=\"width: 40px;\" />");  
        y2[0].setAttribute("id", name + "2");
        choices.append(t2);
        choices.append(y2[0]);
    }
}

function displayAAOptions(choices, name){
    //Id names for the buttons and element choices
    var foption = "em" + name;
    var fchoice = "emc" + name;
    var eoption = "e" + name;
    var echoice = "ec" + name;

    //Name attribute for the radio buttons
    var fename = "eme" + name;

    //Base Frequency Header
    var t = document.createTextNode("Matrix Type: ");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //Emperical option
    var x = $("<input type=\"radio\"  />");
    x[0].setAttribute("id", foption);
    x[0].setAttribute("name", fename);
    x[0].setAttribute("onchange", "AAOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")");
    choices.append(x[0]);        
    var t = document.createTextNode("Empirical");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
    
    //Empirical choices
    var f = $("<div class=\"radiooptions\" />");  
    f[0].setAttribute("id", fchoice);
    choices.append(f[0]);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //estimated option
    var y = $("<input  type=\"radio\"  />");
    y[0].setAttribute("id", eoption);
    y[0].setAttribute("name", fename);
    y[0].setAttribute("onchange", "AAOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")");
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

function AAOptions(emperical, empericalc, estimated, estimatedc, name){
    $(empericalc).empty();//clears choices
    $(estimatedc).empty();

    if(emperical.is(':checked')){

        //Base frequency
        //baseFrequencySimplex(empericalc, name);
        displayFE(empericalc, name,"Base Frequency", "simplexOptions", 4, "pi_aa");

        //Menu
        var m = $("<select />");
        m[0].setAttribute("id", name + "modelSelect");
        var t = document.createTextNode("Model ");
        empericalc[0].append(t);
    
        //menu options
        var z = $("<option value=\"wag\" selected=\"selected\" />");
        var t = document.createTextNode("WAG");
        z[0].append(t);
        m[0].append(z[0]);
        var z = $("<option value=\"lg\"  />");
        var t = document.createTextNode("LG");
        z[0].append(t);
        m[0].append(z[0]);
        var z = $("<option value=\"other\" />");
        var t = document.createTextNode("Other");
        z[0].append(t);
        m[0].append(z[0]);
        empericalc[0].append(m[0]);
        
    }

    if(estimated.is(':checked')){
       //Menu
       var m = $("<select />");
       m[0].setAttribute("id", name + "modelSelect");
       var t = document.createTextNode("Model ");
       estimatedc[0].append(t);
   
       //menu options
       var z = $("<option value=\"p\" selected=\"selected\" />");
       var t = document.createTextNode("Poisson");
       z[0].append(t);
       m[0].append(z[0]);
       var z = $("<option value=\"g\" />");
       var t = document.createTextNode("GTR");
       z[0].append(t);
       m[0].append(z[0]);

       estimatedc[0].append(m[0]);
    }
}

function displayFE(choices, name, type, options, n, parameter){
     //Id names for the buttons and element choices
     var foption = "f" + name;
     var fchoice = "fc" + name;
     var eoption = "e" + name;
     var echoice = "ec" + name;
 
     //Name attribute for the radio buttons
     var fename = "fe" + name;
 
     //Base Frequency Header
     var t = document.createTextNode(type + " : ");
     choices.append(t);
 
     //Break Line
     addBreakLine($(choices).attr("id"));
 
     //Fixed option
     var x = $("<input type=\"radio\"  />");
     x[0].setAttribute("id", foption);
     x[0].setAttribute("name", fename);

     //sets the method for onchange
     if(n != null){
        x[0].setAttribute("onchange", options + "($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", " + n + ", \"" + parameter + "\" )");
     }
     else{
        x[0].setAttribute("onchange", options + "($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", \"" + parameter + "\" )"); 
     }


     choices.append(x[0]);        
     var t = document.createTextNode("Fixed");
     choices.append(t);
 
     //Break Line
     addBreakLine($(choices).attr("id"));
     addBreakLine($(choices).attr("id"));
     
     //Fixed choices
     var f = $("<div class=\"radiooptions\" />");  
     f[0].setAttribute("id", fchoice);
     choices.append(f[0]);
 
     //Break Line
     addBreakLine($(choices).attr("id"));
 
     //estimated option
     var y = $("<input  type=\"radio\"  />");
     y[0].setAttribute("id", eoption);
     y[0].setAttribute("name", fename);

     //sets the method for onchange
     if(n != null){
        y[0].setAttribute("onchange", options + "($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", " + n + ", \"" + parameter + "\" )");
     }
     else{
        y[0].setAttribute("onchange", options + "($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", \"" + parameter + "\" )"); 
     }

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

function probabilityOptions(fixed, fixedc, estimated, estimatedc, name, parameter){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        var t = document.createTextNode("Enter a value between 0 and 1 for the " + parameter + ": ");
        var y1 = $("<input type = \"number\" value=\"0.00\" step=\".01\" style=\"width: 45px;\" />");       
        y1[0].setAttribute("id", name + "pparameter");
        fixedc.append(t);
        fixedc.append(y1[0]);
    }

    if(estimated.is(':checked')){
        var m = $("<select />");
        m[0].setAttribute("id", name + "peSelect");
        var t = document.createTextNode("Choose prior distribution: ");
        estimatedc[0].append(t);
    
        //menu options
        var z = $("<option  value=\"B\" selected=\"selected\" />");
        var t = document.createTextNode("Beta");
        z[0].append(t);
        m[0].append(z[0]);
        estimatedc[0].append(m[0]);
    
        //Break Line
        addBreakLine($(estimatedc).attr("id"));
        addBreakLine($(estimatedc).attr("id"));
    
        //menu choices
        //Beta Option
        var dpo = $("<div class =\"menuOption\" />");
        dpo[0].setAttribute("id", name + "peg");

        //Added to the estimate choices
        estimatedc[0].append(dpo[0]);

        //Header
        var t = document.createTextNode("Enter Alpha and Beta parameter (>0): ");
        dpo[0].append(t);

    
        //Break Line
        addBreakLine($(dpo[0]).attr("id"));
    
        //Alph input
        var t = document.createTextNode("Alpha: ");
        var y1 = $("<input type = \"number\" value = \"1\" style=\"width: 40px;\" />");
        y1[0].setAttribute("id", name + "palpha");
        dpo[0].append(t);
        dpo[0].append(y1[0]);

        //Break Line
        addBreakLine($(dpo[0]).attr("id"));

        //Beta input
        var t1 = document.createTextNode("Beta: ");
        var y2 = $("<input type = \"number\" value = \"1\" style=\"width: 40px;\" />");
        y2[0].setAttribute("id", name + "pbeta");
        dpo[0].append(t1);
        dpo[0].append(y2[0]);
       
        
    }
}

function displayiCheckBoxOp(checkbox, checkboxoptions){
    $(checkboxoptions).empty();//clears choices
   
    if(checkbox.is(':checked')){
        displayFE(checkboxoptions, "ioption", "Matrix Type", "probabilityOptions", null, "prop_inv");
    }
}

function displaygCheckBoxOp(checkbox, checkboxoptions){
    $(checkboxoptions).empty();//clears choices
   
    if(checkbox.is(':checked')){
        displayFE(checkboxoptions, "goption", "Shape Parameter ", "realposOptions", null, "site_rates_shape");

        //Input box
        var t = document.createTextNode("Enter number of site rate categories (>0): ");
        checkboxoptions.append(t);
        var inputbox = $("<input type = \"number\" value=\"4\" style=\"width: 50px;\" />"); 
        inputbox[0].setAttribute("id", "numratecategories");
        checkboxoptions.append(inputbox[0]);

        //Break Line
        addBreakLine($(checkboxoptions).attr("id"));
        addBreakLine($(checkboxoptions).attr("id"));
    }
    
}

function addBreakLine(idname){
    var mybr = document.createElement('br');
    var y = document.getElementById(idname);
    y.appendChild(mybr);
}


createModelOptions();
