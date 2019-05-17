/*Used to create the Tree  Model options*/
function createTreeOptions(){

    //Clears the tree model div
    $("#treeOptions").empty();

    //Gets the tree model div
    var option = document.getElementById("treeOptions");
    
    //Tree Model Header
    var h1 = $("<h2/>");
    var t = document.createTextNode("Tree Model");
    h1[0].append(t);

    //Topology Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("Unrooted Topology and Branch Lengths");
    h2[0].append(t);

    //Adding the headers to page
    option.append(h1[0]);
    option.append(h2[0]);  

    //Choices for unrooted
    var uOption = $("<div id=\"uOption\"  />");
    option.append(uOption[0]);

    //Fixed and Estimate for Tree Topology
    displayFE(uOption[0], "unroot", "Tree Topology", "unrootedOptions", null, "tree_file");

    //Fixed and Estimate for Branch Lengths
    displayFE(uOption[0],"unroot2", "Branch Lengths", "vectorofrealposOptions", null,  "branch_length");

    //Calls the method that generates the Tree toplogy one time to make sure that fixed is hidden, since the default option is estimated
    displayFixedBranchLength();

    //Back button
    var backbutton = $("<button onclick=\"gotoTab('substitutiontab')\">Back<button/>");

    //Reset button
    var resetbutton = $("<button onclick=\"createTreeOptions()\">Reset<button/>");

    //Next button
    var nextbutton = $("<button  onclick=\"gotoTab('mcmctab')\" class =\"nextbutton\">Next<button/>");

    //Adding the back, reset, next button
    option.append(backbutton[0]);
    option.append(resetbutton[0]);
    option.append(nextbutton[0]);

}

//Creates unrooted tree choices
//Takes, in fixed radio button, fixed choices div, estimated radio button, estimaded choice div, name used for id, n if needed, and parameter used for input
function unrootedOptions(fixed, fixedc, estimated, estimatedc, name, parameter){
    //clears choices
    $(fixedc).empty();
    $(estimatedc).empty();

    //if fixed is chosen
    if(fixed.is(':checked')){
        //File path to the tree file input
        //Name
        var t = document.createTextNode("Enter the path to the tree file: ");
        //Input
        var y1 = $("<input type=\"text\" style=\"width: 500px;\"  placeholder=\"Ex.) data/primates_and_galeopterus_cytb.nex\" />");        
        y1[0].setAttribute("id", name + "t" );
        fixedc.append(t);
        fixedc.append(y1[0]);
    }

    //if estimate is chosen
    if(estimated.is(':checked')){
        
        //Id name for select menu
        var sName = "eMenu" + name;
        var menuOptions = "menuop" + name;
        
        //Menu
        var m = $("<select  />");
        m[0].setAttribute("id", sName);
        var t = document.createTextNode("Choose prior distribution on topology: ");
        estimatedc[0].append(t);
        
        //menu options
        var z = $("<option value=\"UT\" selected=\"selected\" />");
        var t = document.createTextNode("Uniform Topology");
        z[0].append(t);
        m[0].append(z[0]);
        
        //Menu gets into the element
        estimatedc[0].append(m[0]);
        
        //Break Line
        var mybr = document.createElement('br');
        estimatedc[0].append(mybr);
        
        //menu choices
        var dpo = $("<div class =\"menuOption\" />");
        dpo[0].setAttribute("id", menuOptions);
        
        estimatedc[0].append(dpo[0]);

        //Calls to display the selected        
        unrootedEstimate($("#"+ sName).val(), dpo[0],name);
        
        //Sets attribute to show options on change
        m[0].setAttribute("onchange", "unrootedEstimate($(\"#" + sName +"\").val(), $(\"#" + menuOptions + "\"), (\"" + name + "\"))");
         
    }

    //Used to display fixed depending on what option is chosen for Tree topology
    displayFixedBranchLength();

}

//This method shows or hides the fixed option for Branch Lengths, depending on which Tree topology choice is chosen
function displayFixedBranchLength(){
    
    if($("#funroot").is(':checked')){
        //Enables(if disabled) the branch length option of fixed
        $("#funroot2").prop('checked', false);
        $("#funroot2").attr('disabled', false);
        $("#funroot2").show();
        $("#funroot2label").show();
        
    }

    if($("#eunroot").is(':checked')){
        //Disables, unchecks, hides, and clears the option of the branch length option of fixed
        $("#funroot2").prop('checked', false);
        $("#fcunroot2").empty();
        $("#funroot2").attr('disabled', true);
        $("#funroot2").hide();
        $("#funroot2label").hide();

        //Makes Estimated be checked by default
        $("#eunroot2").prop('checked', true);
        vectorofrealposOptions($("#funroot2"), $("#fcunroot2"), $("#eunroot2"), $("#ecunroot2"), "unroot2", "branch_length");
       
    }
}

//creates the choices for a estimate of an unrooted tree
//Takes in menu value, choices div,and name
function unrootedEstimate(value, choices, name){
    $(choices).empty();//clears choices

    // //Break Line
    addBreakLine($(choices).attr("id"));

    //If menu is Uniform Topology
    if(value == "UT"){
        displayunrootedEstimateUT(choices, name);
    }
  
}

//Creates the options for Uniform Topology 
//Takes in choices div, and a name
function displayunrootedEstimateUT(choices, name){
    //Outgroup option
    //Check box
    var ob = $("<input  type=\"checkbox\" id=\"outgroupB\" name=\"oandnoButton\" />");
    //sets the method for onchange
    ob[0].setAttribute("onchange", "displayunrootedOutgroup($(\"#outgroupB\"), $(\"#outgroupO\"))");
    choices.append(ob[0]);     
    //Name                      
    var t = document.createTextNode("Include Outgroup");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
 
    //Outgroup choices
    var oOption = $("<div id=\"outgroupO\" class=\"radiooptions\"  />");
    choices.append(oOption[0]);


}

//Creates the choices for Uniform Topology
//Takes in outgroup chekcbox and options div
function displayunrootedOutgroup(outgroup, outgroupc){
    $(outgroupc).empty();//clears choices

    //If outgroup is checked
    if(outgroup.is(':checked')){
        //Input name
        var t = document.createTextNode("Enter outgroup name(s) [seperated by commas]: ");
        outgroupc.append(t);

        //Break Line
        addBreakLine($(outgroupc).attr("id"));

        //Input box
        var y1 = $("<input type=\"text\" style=\"width: 500px;\"  placeholder=\"example1, example2, example3 \" />");        
        y1[0].setAttribute("id", "outgroup");
        outgroupc.append(y1[0]);
    }

}

//Creates fixed an estimate choices for Vector  of Realpos
//Takes, in fixed radio button, fixed choices div, estimated radio button, estimaded choice div, name used for id, n if needed, and parameter used for input
function vectorofrealposOptions(fixed, fixedc, estimated, estimatedc, name, parameter){
    //Clears choices
    $(fixedc).empty();
    $(estimatedc).empty();

    //If fixed is chosen
    if(fixed.is(':checked')){
        //Fixed branch length has no choices
    }

    //If estimate is chosen
    if(estimated.is(':checked')){
        //Id names for menu and menu optoins div
        var sName = "eMenu" + name;
        var dpOptions = "menuop" + name;
       
        //Menu
        var m = $("<select  />");
        m[0].setAttribute("id", sName);
        //Sets on change method to change with menu
        m[0].setAttribute("onchange",  "displayEvectorofrealpos($(\"#" + dpOptions + "\"), \"" + name + "e\", $(\"#" + sName + "\").val())");
        //Menu name
        var t = document.createTextNode("Choose prior distribution on branch length: ");
        estimatedc[0].append(t);
    
        //menu options
        var z = $("<option value=1 selected=\"selected\" />");
        var t = document.createTextNode("Exponential");
        z[0].append(t);
        m[0].append(z[0]);
        var z = $("<option value=2  />");
        var t = document.createTextNode("Gamma");
        z[0].append(t);
        m[0].append(z[0]);
        var z = $("<option value=3  />");
        var t = document.createTextNode("Lognormal");
        z[0].append(t);
        m[0].append(z[0]);
        var z = $("<option value=4  />");
        var t = document.createTextNode("Uniform");
        z[0].append(t);
        m[0].append(z[0]);
        estimatedc[0].append(m[0]);
    
        //Break Line
        addBreakLine($(estimatedc).attr("id"));
        addBreakLine($(estimatedc).attr("id"));

        //Menu choices
        var dpo = $("<div class =\"menuOption\" />");
        dpo[0].setAttribute("id", dpOptions);
    
        estimatedc[0].append(dpo[0]);

        //Callse method to display options
        displayEvectorofrealpos($("#" + dpOptions), name + "e", $("#" + sName ).val());

    }

}

//Creates the estimate option for vector of realpos
//takes in choices div, name , and menu value
function displayEvectorofrealpos(choices, name, value){
    choices.empty()//clear choices
    displayFE(choices, name, "Hyperparameter(s)", "displayvectorofrealposOptionsEstimated", value, "branch_length");
    
}

//Creates the estimate choices for vector of realpos
//Takes, in fixed radio button, fixed choices div, estimated radio button, estimaded choice div, name used for id, n if needed, and parameter used for input
function displayvectorofrealposOptionsEstimated(fixed, fixedc, estimated , estimatedc , name, value, parameter){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    //If fixed is chosen
    if(fixed.is(':checked')){
        displayrealposOptions2(value, fixedc, name);
    }

    //if estimate is chosen
    if(estimated.is(':checked')){
         //Id name for select menu
         var sName = "eMenu" + name;
         var dpOptions = "menuop" + name;
 
         //Creates the Menu
         var m = $("<select  />");
         m[0].setAttribute("id", sName);
     
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

        //Label for Menu
        $("#" + sName).before("<label for='radio' id=" + sName + "label" + ">Choose prior distribution: </label>");
     
         //Break Line
         var mybr = document.createElement('br');
         estimatedc[0].append(mybr);
     
         //menu choices
         var dpo = $("<div id=\"menuop\" class =\"menuOption\" />");
         dpo[0].setAttribute("id", dpOptions);
     
         estimatedc[0].append(dpo[0]);
 
         //Calls to display the selected        
         displayrealposOptions($("#"+ sName).val(),dpo[0], name);
         
         //Sets the onchange attribute to show options
         m[0].setAttribute("onchange", "displayrealposOptions($(\"#" + sName +"\").val(), $(\"#" + dpOptions + "\"), (\"" + name + "\"))");

    }

}

//Same method as displayrealpos, except it takes integers for value so that this can be used in vectors of realpos
function displayrealposOptions2(value, choices, name){
    $(choices).empty();//clears choices

    //Break Line
    addBreakLine($(choices).attr("id"));

    if(value == 1){
        //Creates the number input
        var y1 = $("<input type =\"number\" min=\"1\" value=\"1\" step=\"1\" class=\"numberinput\" />");        
        y1[0].setAttribute("id", name);
        choices.append(y1[0]);
 
        //Creates the header for the inputs
        $("#" + name).before("<label for='radio' id=" + name + "label" + ">Enter rate parameter (>0):  </label>");
    }

    if(value == 2){
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

    if(value == 3){
        
        //Mean 
        var y1 = $("<input type =\"number\" min=\"1\" value=\"1\" step=\"1\" class=\"numberinput\" />");         
        y1[0].setAttribute("id", name);
        choices.append(y1[0]);

        //Label for Mean
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

    if(value == 4){
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



//Creates the Tree Model Options
createTreeOptions();


