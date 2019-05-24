/*Used to create the Substitution  Model options*/
//Only Nucelotide
function createModelOptions(){

    //clears the substitution model div
    $("#substitutionOptions").empty();

    //gets the substitution model div
    var y = document.getElementById("substitutionOptions");
    
    //Substitution Model Header
    var h1 = $("<h2/>");
    var t = document.createTextNode("Substitution Model");
    h1[0].append(t);

    //Rate Matrix Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("Rate Matrix");
    h2[0].append(t);

    //Adding the headers
    y.append(h1[0]);
    y.append(h2[0]);  
    
    //Nucleotide Option
    //Name for menu
    var t = document.createTextNode("Nucleotide Substitution Model: ");
    y.append(t);
    //Model Menu
    var x = $("<select id=\"nucleotideModel\"  />");
    y.append(x[0]);

    //Model Menu Options
    var z = $("<option value=\"JC\" selected=\"selected\" />");
    var t = document.createTextNode("Jukes-Cantor");
    z[0].append(t);
    x[0].append(z[0]);

    //Options for Menu
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

    //id Names for menu and menu options
    var temp = "#nucleotideModel";
    var temp2 = "#nOptions";
    
    //Calls method to display menu options
    displaymodelOptions($(temp).val(),choices[0]);
        
    //Sets the attribute for the menu options to change everytime the menu changes
    x[0].setAttribute("onchange", "displaymodelOptions($(\"" + temp +"\").val(), $(\"" + temp2 + "\"))");
       
    //Among-site Rate Variation Header
    var h2 = $("<h3 />");
    var t = document.createTextNode("Among-site Rate Variation");
    h2[0].append(t);
    y.append(h2[0]);

    //+I-Button
    //Name
    var i = document.createTextNode("Invariant Sites (+I)");
    //Button
    var iButton = $("<input type=\"checkbox\" id =\"icheckbox\" class=\"checkboxbutton\" />");
    //sets attribute so that options show on change
    iButton[0].setAttribute("onchange","displayiCheckBoxOp($(\"#icheckbox\"), $(\"#ioptions\"))" );
    var iOptions = $("<div id= \"ioptions\" class=\"menuOption\" />");

    //Adding +i name and button
    y.append(i);
    y.append(iButton[0]);

    //Break Line
    addBreakLine(y.id);
    addBreakLine(y.id);

    //Adding +i options
    y.append(iOptions[0]);
 
    //+G-Button
    //Name
    var g = document.createTextNode("Gamma-distributed Rates(+G)");
    //Button
    var gButton = $("<input type=\"checkbox\" id =\"gcheckbox\" class=\"checkboxbutton\" />");
    //Sets attribute so that options show on change
    gButton[0].setAttribute("onchange","displaygCheckBoxOp($(\"#gcheckbox\"), $(\"#goptions\"))" );
    var gOptions = $("<div id= \"goptions\" class=\"menuOption\" />");

    //Adding +g name and button
    y.append(g);
    y.append(gButton[0]);

    //Break Line
    addBreakLine(y.id);
    addBreakLine(y.id);
     
    //Adding +g options
    y.append(gOptions[0]);

    //Back button
    var backbutton = $("<button onclick=\"gotoTab('datatab')\">Back<button/>");

    //Reset button
    var resetbutton = $("<button onclick=\"createModelOptions()\">Reset<button/>");

    //Next button
    var nextbutton = $("<button onclick=\"gotoTab('treetab')\" class =\"nextbutton\">Next<button/>");

    //Adding back, reset, and next button
    y.append(backbutton[0]);
    y.append(resetbutton[0]);
    y.append(nextbutton[0]);
   
}

//Creates nucleotide options
//Takes in menu value and the div of choices
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

//Creates a fixed and estimate radio button options with choices
//Takes in the div choices, name used for the id of buttons and choices, type used for the header of the fixed and estimate, 
//options is the given method of what choices to display, n if the options needs a number(like realpos), and parameter used fo asking the input
function displayFE(choices, name, type, options, n, parameter){
    //Id names for the buttons and element choices
    var foption = "f" + name;
    var fchoice = "fc" + name;
    var eoption = "e" + name;
    var echoice = "ec" + name;

    //Name attribute for the radio buttons
    var fename = "fe" + name;

    //Header
    var h2 = $("<h4/>");
    var t = document.createTextNode(type + " : ");
    h2[0].append(t);
    choices.append(h2[0]);

    //Estimated option
    //Radio button
    var y = $("<input  type=\"radio\" checked=\"checked\" />");
    y[0].setAttribute("id", eoption);
    y[0].setAttribute("name", fename);
    choices.append(y[0]);          
    
    //Creates the label for the Estimated radio button
   $("#" + eoption).after("<label for='radio' id=" + eoption + "label" + ">Estimated</label>");

    //Fixed option
    //Radio button
    var x = $("<input type=\"radio\"  />");
    x[0].setAttribute("id", foption);
    x[0].setAttribute("name", fename);
    x[0].setAttribute("class", "fixed");
    choices.append(x[0]);      
    
    //Creates the label for the estimated radio button
   $("#" + foption).after("<label for='radio' id=" + foption + "label" + ">Fixed</label>");

    //Estimated choices div
    var e = $("<div class=\"radiooptions\"  />");
    e[0].setAttribute("id", echoice);

    //Fixed choices div
    var f = $("<div class=\"radiooptions\" />");  
    f[0].setAttribute("id", fchoice);

    //Adding the choices
    choices.append(f[0]);
    choices.append(e[0]);

    //Break line
    addBreakLine($(choices).attr("id"));

   //Calls the method to show the options at the beginning, depending if method needs n
   if(n != null){
       window[options]($("#" + foption), $("#" + fchoice), $("#" + eoption), $("#" + echoice), name, n, parameter);
   }
   else{
       window[options]($("#" + foption), $("#" + fchoice), $("#" + eoption), $("#" + echoice), name, parameter);
   }


   //sets the method for onchange for fixed radio button, dependng if method needs n
   if(n != null){
       x[0].setAttribute("onchange", options + "($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", " + n + ", \"" + parameter + "\" )");
    }
    else{
       x[0].setAttribute("onchange", options + "($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", \"" + parameter + "\" )"); 
    }

    //sets the method for onchange for estimated radio button, depending if method needs n
    if(n != null){
       y[0].setAttribute("onchange", options + "($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", " + n + ", \"" + parameter + "\" )");
    }
    else{
       y[0].setAttribute("onchange", options + "($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", \"" + parameter + "\" )"); 
    }


}

//Creates fixed and estimated choices for simplex
//Takes, in fixed radio button, fixed choices div, estimated radio button, estimaded choice div, name used for id, n if needed, and parameter used for input
function simplexOptions(fixed, fixedc, estimated, estimatedc, name, n, parameter){
    //Clears both choices
    $(fixedc).empty();
    $(estimatedc).empty();

    //If fixed radio button is picked
    if(fixed.is(':checked')){
        //Break Line
        addBreakLine($(fixedc).attr("id"));
        
        //Generates the number of input boxes depending on n
        var i;
        for (i = 0; i < n; i++) { 
            var input = $("<input type = \"number\" min=\"0.00\" value=\"0.00\" step=\".01\" class=\"decimalnumberinput\" />");       
            input[0].setAttribute("id", name + i);
            fixedc.append(input[0]);
        }

        //Adds the label to the inputs
        $("#" + name + 0).before("<label for='radio' id=" + name + "label" + ">"+ "Enter " + n + " values for the " + parameter + " simplex vector (Values must add up to 1): " +"</label><br/>");


    }

    //If estimate radio button is picked
    if(estimated.is(':checked')){
        //Break Line
        addBreakLine($(estimatedc).attr("id"));

        //Prior distribution menu
        var m = $("<select />");
        m[0].setAttribute("id", name + "eSelect");

        //menu options
        var z = $("<option id=\"eval\" value=\"eval\" selected=\"selected\" />");
        var t = document.createTextNode("Dirichlet");
        z[0].append(t);
        m[0].append(z[0]);
        estimatedc[0].append(m[0]);

        //Adds the label to the inputs
        $("#" + name + "eSelect").before("<label for='menu' id=" + name + "eSelect" + "label" + ">Choose prior distribution: </label>");

        //Break Line
        addBreakLine($(estimatedc).attr("id"));
    
        //menu choices
        //Dirichlet Prior Distribution Option div
        var dpo = $("<div class =\"menuOption\" />");
        dpo[0].setAttribute("id", name + "ed");
    
        //Break Line
        var mybr = document.createElement('br');
        dpo[0].append(mybr);
        dpo[0].append(mybr);
    
        //Inputs for Direchlet option
        var y1 = $("<input type =\"number\" min=\"1\" value = \"1\" class=\"numberinput\" />");
        y1[0].setAttribute("id", name + "cparameter1");
        var y2 = $("<input type =\"number\" min =\"1\" value = \"1\" class=\"numberinput\" />");
        y2[0].setAttribute("id", name + "cparameter2");
        var y3 = $("<input type =\"number\" min=\"1\" value = \"1\" class=\"numberinput\" />");
        y3[0].setAttribute("id", name + "cparameter3");
        var y4 = $("<input type =\"number\" min=\"1\" value = \"1\" class=\"numberinput\" />");
        y4[0].setAttribute("id", name + "cparameter4");
        dpo[0].append(y1[0]);
        dpo[0].append(y2[0]);
        dpo[0].append(y3[0]);
        dpo[0].append(y4[0]);

        //adding those options
        estimatedc[0].append(dpo[0]);

        //Creates the label for the inputs
        $("#" + name + "cparameter1").before("<label for='radio' id=" + name + "label" + ">Enter concentration parameters (> 0): </label>");
    }
}

//Creates fixed and estimated choices for realpos
//Takes, in fixed radio button, fixed choices div, estimated radio button, estimaded choice div, name used for id, n if needed, and parameter used for input
function realposOptions(fixed, fixedc, estimated, estimatedc, name, parameter){
    //Clears choices
    $(fixedc).empty();
    $(estimatedc).empty();

    if(fixed.is(':checked')){

        //Creates the number input
        var y1 = $("<input type = \"number\" min=\"1\" value=\"1\" step=\"1\" class=\"numberinput\" />");        
        y1[0].setAttribute("id", name);
        fixedc.append(y1[0]);

        //Creates the label for the inputs
        $("#" + name).before("<label for='radio' id=" + name + "label" + ">" + "Enter a value for the " + parameter + " (> 0 ): </label>");
    }

    if(estimated.is(':checked')){
        //Break Line
        addBreakLine($(estimatedc).attr("id"));

        //Id name for select menu
        var sName = "eMenu" + name;
        var dpOptions = "menuop" + name;

        //Menu for prior distribution
        var m = $("<select />");
        m[0].setAttribute("id", sName);
    
        //Menu options
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

        //Adds the label to the menu
        $("#" + sName).before("<label for='menu' id=" + sName + "label" + ">Choose prior distribution: </label>");
    
        //Break Line
        addBreakLine($(estimatedc).attr("id"));
    
        //menu choices div
        var dpo = $("<div id=\"menuop\" class =\"menuOption\" />");
        dpo[0].setAttribute("id", dpOptions);
    
        estimatedc[0].append(dpo[0]);

        //Calls to display the selected        
        displayrealposOptions($("#"+ sName).val(),dpo[0], name);
        
        //Sets the attribute on change to display meny choices
        m[0].setAttribute("onchange", "displayrealposOptions($(\"#" + sName +"\").val(), $(\"#" + dpOptions + "\"), (\"" + name + "\"))");
    }
}

//Creates estimated choices for realpos depending on the value from menu that is selected
//Takes in value of menu, choices div, and name
function displayrealposOptions(value, choices, name){
    $(choices).empty();//clears choices

    //Break Line
    addBreakLine($(choices).attr("id"));

    if(value == "E"){
        //Creates the number input
        var y1 = $("<input type =\"number\" min=\"1\" value=\"1\" step=\"1\" class=\"numberinput\" />");        
        y1[0].setAttribute("id", name);
        choices.append(y1[0]);

        //Creates the header for the inputs
        $("#" + name).before("<label for='radio' id=" + name + "label" + ">Enter rate parameter (>0):  </label>");
    }

    if(value == "G"){
        
        //Shape
        var y1 = $("<input type =\"number\" min=\"1\" value=\"1\" step=\"1\" class=\"numberinput\" />");         
        y1[0].setAttribute("id", name)
        choices.append(y1[0]);

        //Label for shape
        $("#" + name).before("<label for='radio' id=" + name + "label" + ">Shape: </label>");

        //Rate
        var y2 = $("<input type =\"number\" min=\"1\" value=\"1\" step=\"1\" class=\"numberinput\" />");  
        y2[0].setAttribute("id", name + "2");
        choices.append(y2[0]);

        //Label for rate
        $("#" + name + "2").before("<label for='radio' id=" + name + "2" + "label" + ">Rate: </label>");

        //Creates the label for the inputs
        $("#" + name + "label").before("<label for='label' id=" + name + "header" + ">Enter shape and rate parameters (> 0): </label> <br />");

    }

    if(value == "L"){
        
        //Mean 
        var y1 = $("<input type =\"number\" min=\"1\" value=\"1\" step=\"1\" class=\"numberinput\" />");         
        y1[0].setAttribute("id", name);
        choices.append(y1[0]);

        //Label for Mean- can use mathjax here now
        $("#" + name).before("<label for='radio' id=" + name + "label" + ">Mean: </label>");

        //Standard Deviation
        var y2 = $("<input type =\"number\" min=\"1\" value=\"1\" step=\"1\" class=\"numberinput\" />");  
        y2[0].setAttribute("id", name + "2");
        choices.append(y2[0]);

        //Label for Standard Deviation
        $("#" + name + "2").before("<label for='radio' id=" + name + "2" +"label" + ">Standard Deviation: </label>");

        //Label for both
        $("#" + name + "label").before("<label for='radio' id=" + name  +"header" + ">Enter mean and standard deviation parameters (> 0): </label> <br />");

    }

    if(value == "U"){
    
        //Min
        var y1 = $("<input type =\"number\" min=\"0\" value=\"0\" step=\"1\" class=\"numberinput\" />");         
        y1[0].setAttribute("id", name);
        choices.append(y1[0]);

        //Label for Min
        $("#" + name).before("<label for='radio' id=" + name + "label" + ">Min: </label>");


        //Max
        var y2 = $("<input type =\"number\" min=\"1\" value=\"100\" step=\"1\" class=\"numberinput\" />");  
        y2[0].setAttribute("id", name + "2");
        choices.append(y2[0]);

        //Label for Max
        $("#" + name + "2").before("<label for='radio' id=" + name + "2" + "label" + ">Max: </label>");

        //Creates the label for the inputs
        $("#" + name + "label").before("<label for='label' id=" + name + "header" + ">Enter min and max parameters (> 0): </label> <br />");

    }
}

//Creates fixed and estimate choices for probability
//Takes, in fixed radio button, fixed choices div, estimated radio button, estimaded choice div, name used for id, n if needed, and parameter used for input
function probabilityOptions(fixed, fixedc, estimated, estimatedc, name, parameter){
    //Clears choices
    $(fixedc).empty();//clears
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        //Creates the number input
        var y1 = $("<input type =\"number\" min=\"0\" value=\"0.00\" step=\".01\" class=\"decimalnumberinput\" />");       
        y1[0].setAttribute("id", name + "pparameter");
        fixedc.append(y1[0]);

        //Creates the header for the inputs
        $("#" + name + "pparameter").before("<label for='radio' id=" + name + "pparameter" + "label" + ">" + "Enter a value between 0 and 1 for the " + parameter + ": " + "</label>");

    }

    if(estimated.is(':checked')){

        //Break Line
        addBreakLine($(estimatedc).attr("id"));

        //Creates the menu
        var m = $("<select />");
        m[0].setAttribute("id", name + "peSelect");
    
        //menu options
        var z = $("<option  value=\"B\" selected=\"selected\" />");
        var t = document.createTextNode("Beta");
        z[0].append(t);
        m[0].append(z[0]);
        estimatedc[0].append(m[0]);

        //Creates the header for the inputs
        $("#" + name + "peSelect").before("<label for='radio' id=" + name + "peSelect" + "label" + ">Choose prior distribution: </label>");
    
        //Break Line
        addBreakLine($(estimatedc).attr("id"));
        addBreakLine($(estimatedc).attr("id"));
    
        //Menu choices
        //Beta Option
        var dpo = $("<div class =\"menuOption\" />");
        dpo[0].setAttribute("id", name + "peg");

        //Added to the estimate choices
        estimatedc[0].append(dpo[0]);
    
        //Alpha input
        var y1 = $("<input type =\"number\" min=\"1\" value = \"1\" class=\"numberinput\" />");
        y1[0].setAttribute("id", name + "palpha");
        dpo[0].append(y1[0]);

        //Creates the label for alpha
        $("#" + name + "palpha").before("<label for='radio' id=" + name + "palpha" + "label" + ">Alpha: </label>");

        //Beta input
        var y2 = $("<input type =\"number\" min=\"1\" value = \"1\" class=\"numberinput\" />");
        y2[0].setAttribute("id", name + "pbeta");
        dpo[0].append(y2[0]);

        //Creates the label for beta
        $("#" + name + "pbeta").before("<label for='radio' id=" + name + "pbeta" + "label" + ">Beta: </label>");

        //Creates the header for the inputs
        $("#" + name + "palpha" + "label").before("<label for='label' id=" + name + "header" + ">Enter Alpha and Beta parameter (>0): </label><br/>");
         
    }
}

//Creates +I options
//given the check box and optins div
function displayiCheckBoxOp(checkbox, checkboxoptions){
    $(checkboxoptions).empty();//clears choices
   
    //Checks if checkbox is checked
    if(checkbox.is(':checked')){
        //Creates the fixed and estimate options
        displayFE(checkboxoptions, "ioption", "Matrix Type", "probabilityOptions", null, "prop_inv");
    }
}

//Creates +G options
//given the checkbox and options div
function displaygCheckBoxOp(checkbox, checkboxoptions){
    $(checkboxoptions).empty();//clears choices
   
    //Checks if chebox is checked
    if(checkbox.is(':checked')){
        //Creates fixed and estimate options
        displayFE(checkboxoptions, "goption", "Shape Parameter ", "realposOptions", null, "site_rates_shape");

        //Input box
        //Name(can change to label if need mathjax or hover, add it after the input box is added to options div)
        var t = document.createTextNode("Enter number of site rate categories (>0): ");
        checkboxoptions.append(t);
        //Input
        var inputbox = $("<input type =\"number\" min=\"1\" value=\"4\" class=\"numberinput\" />"); 
        inputbox[0].setAttribute("id", "numratecategories");
        checkboxoptions.append(inputbox[0]);

        //Break Line
        addBreakLine($(checkboxoptions).attr("id"));
        addBreakLine($(checkboxoptions).attr("id"));
    }
    
}

//Creates the Substitution Model Options
createModelOptions();
