
//With rooted option
/*
function createTreeOptions(){
    var option = document.getElementById("treeOptions");
    
    //Tree Model Header
    var h1 = $("<h2/>");
    var t = document.createTextNode("Tree Model");
    h1[0].append(t);

    //Topology Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("Topology");
    h2[0].append(t);

    //Adding the headers to page
    option.append(h1[0]);
    option.append(h2[0]);  


    //Unrooted option
    var ub = $("<input  type=\"radio\" id=\"uButton\" name=\"randuButton\" />");
    //sets the method for onchange
    ub[0].setAttribute("onchange", "treeOptions($(\"#uButton\"), $(\"#uOption\"), $(\"#rButton\"), $(\"#rOption\"))");
    option.append(ub[0]);                           
    var t = document.createTextNode("Unrooted");
    option.append(t);

    //Break Line
    addBreakLine(option.id);
    addBreakLine(option.id);

    //Unrooted choices
    var uOption = $("<div id=\"uOption\" class=\"radiooptions\"  />");
    option.append(uOption[0]);


    //Rooted Option
    var rb = $("<input type=\"radio\"  id=\"rButton\" name=\"randuButton\" />");
    //sets the method for onchange
    rb[0].setAttribute("onchange", "treeOptions($(\"#uButton\"), $(\"#uOption\"), $(\"#rButton\"), $(\"#rOption\"))");
    option.append(rb[0]);        
    var t = document.createTextNode("Rooted");
    option.append(t);

    //Break Line
    addBreakLine(option.id);
    addBreakLine(option.id);
    
    //Rooted Choices
    var rOption = $("<div id=\"rOption\" class=\"radiooptions\" />");  
    option.append(rOption[0]);

    //Break Line
    addBreakLine(option.id);

}
*/

//With rooted option
/*
function treeOptions(unrooted, unrootedc, rooted, rootedc){
    $(unrootedc).empty();//clears choices
    $(rootedc).empty();

    if(unrooted.is(':checked')){
        displayFE(unrootedc, "unroot", "Fixed or Estimate", "unrootedOptions",null, "tree_file");
    }

    if(rooted.is(':checked')){
        displayFE(rootedc, "root", "Rooted", "unrootedOptions",null, "tree_file");
    }

}
*/

function createTreeOptions(){
    var option = document.getElementById("treeOptions");
    
    //Tree Model Header
    var h1 = $("<h2/>");
    var t = document.createTextNode("Tree Model");
    h1[0].append(t);

    //Topology Header
    var h2 = $("<h3/>");
    var t = document.createTextNode("Topology");
    h2[0].append(t);

    //Adding the headers to page
    option.append(h1[0]);
    option.append(h2[0]);  

    //Choices for unrooted
    var uOption = $("<div id=\"uOption\"  />");
    option.append(uOption[0]);

    displayFE(uOption[0], "unroot", "Unrooted", "unrootedOptions", null, "tree_file");

    displayFE(uOption[0],"unroot2", "Branch Lengths", "vectorofrealposOptions", null,  "branch_length");

}

function unrootedOptions(fixed, fixedc, estimated, estimatedc, name, parameter){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        var t = document.createTextNode("Enter tree_file filename: ");
        var y1 = $("<textarea rows=\"1\" cols=\"80\" style=\"resize: none;\"/>");        
        y1[0].setAttribute("id", name + "t" );
        fixedc.append(t);
        fixedc.append(y1[0]);

        //Enables(if disabled) the branch length option of fixed
        $("#funroot2").attr('disabled', false);
    }

    if(estimated.is(':checked')){
        //Id name for select menu
        var sName = "eMenu" + name;
        var menuOptions = "menuop" + name;
        
        //Menu
        var m = $("<select  />");
        m[0].setAttribute("id", sName);
        var t = document.createTextNode("Choose Prior Distribution: ");
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
        unrootedEstimate($("#"+ sName).val(),dpo[0], name);
        
        m[0].setAttribute("onchange", "unrootedEstimate($(\"#" + sName +"\").val(), $(\"#" + menuOptions + "\"), (\"" + name + "\"))");
       
        //Disables, unchecks, and clears the option of the branch length option of fixed
        $("#funroot2").prop('checked', false);
        $("#fcunroot2").empty();
        $("#funroot2").attr('disabled', true);
        
    }



}

//Diplays the options for a estimate
function unrootedEstimate(value, choices, name){
    $(choices).empty();//clears choices

    // //Break Line
    addBreakLine($(choices).attr("id"));

    if(value == "UT"){
        displayunrootedEstimate(choices, name);
    }
  
}

//Displays the choices for the menu of unrooted estimate
function displayunrootedEstimate(choices, name){
    //Outgroup option
    var ob = $("<input  type=\"radio\" id=\"outgroupB\" name=\"oandnoButton\" />");
    //sets the method for onchange
    ob[0].setAttribute("onchange", "displayunrootedEstimateOptions($(\"#outgroupB\"), $(\"#outgroupO\"), $(\"#noutgroupB\"), $(\"#noutgroupO\"))");
    choices.append(ob[0]);                           
    var t = document.createTextNode("Outgroup");
    choices.append(t);

    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
 
    //Outgroup choices
    var oOption = $("<div id=\"outgroupO\" class=\"radiooptions\"  />");
    choices.append(oOption[0]);

    //Break Line
    addBreakLine($(choices).attr("id"));

    //No outgroup Option
    var nob = $("<input type=\"radio\"  id=\"noutgroupB\" name=\"oandnoButton\" />");
    //sets the method for onchange
    nob[0].setAttribute("onchange", "displayunrootedEstimateOptions($(\"#outgroupB\"), $(\"#outgroupO\"), $(\"#noutgroupB\"), $(\"#noutgroupO\"))");
    choices.append(nob[0]);        
    var t = document.createTextNode("No Outgroup");
    choices.append(t);
    
    // //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
    
    //No Outgroup Choices
    var noOption = $("<div id=\"noutgroupO\" class=\"radiooptions\" />");  
    choices.append(noOption[0]);

}

function displayunrootedEstimateOptions(fixed, fixedc, estimated, estimatedc){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        var t = document.createTextNode("Enter outgroup name(s) (seperated by commas): ");
        var y1 = $("<textarea id=\"urEstimateOutgroup\"  rows=\"1\" cols=\"80\" style=\"resize: none;\"/>");        
        y1[0].setAttribute("id", name + "outgroup" );
        fixedc.append(t);
        fixedc.append(y1[0]);
    }

    if(estimated.is(':checked')){
        //No Outgroup has no options
    }
    
}

function vectorofrealposOptions(fixed, fixedc, estimated, estimatedc, name, parameter){
    $(fixedc).empty();//clears choices
    $(estimatedc).empty();

    if(fixed.is(':checked')){
        //Fixed branch length has no choices
    }

    if(estimated.is(':checked')){
        var sName = "eMenu" + name;
        var dpOptions = "menuop" + name;

        var m = $("<select  />");
        m[0].setAttribute("id", sName);
        m[0].setAttribute("onchange",  "displayEBranchLength($(\"#" + dpOptions + "\"), \"" + name + "e\", $(\"#" + sName + "\").val())");
        var t = document.createTextNode("Choose prior distribution: ");
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

        displayEBranchLength($("#" + dpOptions), name + "e", $("#" + sName ).val());

    }

}

function displayEBranchLength(choices, name, value){
    choices.empty()//clear choices
    displayFE(choices, name, "Hyper Matrix", "displayvectorofrealposOptionsEstimated", value, "branch_length");
}


function displayvectorofrealposOptionsEstimated(iid, iidc, h , hc , name, value, parameter){
    $(iidc).empty();//clears choices
    $(hc).empty();

    if(iid.is(':checked')){
        displayrealposOptions2(value, iidc, name);
    }

    if(h.is(':checked')){
         //Id name for select menu
         var sName = "eMenu" + name;
         var dpOptions = "menuop" + name;
 
         var m = $("<select  />");
         m[0].setAttribute("id", sName);
         var t = document.createTextNode("Choose prior distribution: ");
         hc[0].append(t);
     
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
         hc[0].append(m[0]);
     
         //Break Line
         var mybr = document.createElement('br');
         hc[0].append(mybr);
     
         //menu choices
         var dpo = $("<div id=\"menuop\" class =\"menuOption\" />");
         dpo[0].setAttribute("id", dpOptions);
     
         hc[0].append(dpo[0]);
 
         //Calls to display the selected        
         displayrealposOptions($("#"+ sName).val(),dpo[0], name);
         
         m[0].setAttribute("onchange", "displayrealposOptions($(\"#" + sName +"\").val(), $(\"#" + dpOptions + "\"), (\"" + name + "\"))");

    }

}

function displayrealposOptions2(value, choices, name){
    $(choices).empty();//clears choices

    if(value == 1){
        var t = document.createTextNode("Enter shape parameter > 0: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 40px;\" />");        
        y1[0].setAttribute("id", name);
        choices.append(t);
        choices.append(y1[0]);
    }

    if(value == 2){
        var t = document.createTextNode("Enter shape and rate parameters > 0: ");
        choices.append(t); 
        var mybr = document.createElement('br');

        //Break Line
        addBreakLine($(choices).attr("id"));

        //Shape
        var t1 = document.createTextNode("Shape: ");
        var y1 = $("<input type = \"number\" value=\"1\" step=\"1\" style=\"width: 40px;\" />");         
        y1[0].setAttribute("id", name);
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

    if(value == 3){
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

    if(value == 4){
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
        y2[0].setAttribute("id", name + "2")
        choices.append(t2);
        choices.append(y2[0]);
    }
}

//could be used for vectors of real pos in another option
function vectorofrealposOptionsEstimated(choices, name, parameter){
    //Id names for the buttons and element choices
    var foption = "iid" + name;
    var fchoice = "iidc" + name;
    var eoption = "h" + name;
    var echoice = "hc" + name;
 
    //Name attribute for the radio buttons
    var fename = "iidh" + name;
 
    //  //Base Frequency Header
    //  var t = document.createTextNode(type + " : ");
    //  choices.append(t);
 
    //  //Break Line
    //  addBreakLine($(choices).attr("id"));
    
    //IID option
    var x = $("<input type=\"radio\"  />");
    x[0].setAttribute("id", foption);
    x[0].setAttribute("name", fename);
    //sets the method for onchange 
    x[0].setAttribute("onchange", "displayvectorofrealposOptionsEstimated($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", \"" + parameter + "\" )"); 
     
    choices.append(x[0]);        
    var t = document.createTextNode("IID");
    choices.append(t);
 
    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
     
    //IID choices
    var f = $("<div class=\"radiooptions\" />");  
    f[0].setAttribute("id", fchoice);
    choices.append(f[0]);
 
    //Break Line
    addBreakLine($(choices).attr("id"));
 
    //Hierarchical option
    var y = $("<input  type=\"radio\"  />");
    y[0].setAttribute("id", eoption);
    y[0].setAttribute("name", fename);
    //sets the method for onchange
    y[0].setAttribute("onchange", "displayvectorofrealposOptionsEstimated($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\", \"" + parameter + "\" )"); 
     
 
    choices.append(y[0]);                           
    var t = document.createTextNode("Hierarchical");
    choices.append(t);
 
    //Break Line
    addBreakLine($(choices).attr("id"));
    addBreakLine($(choices).attr("id"));
 
    //Hierarchical choices
    var e = $("<div class=\"radiooptions\"  />");
    e[0].setAttribute("id", echoice);
 
    choices.append(e[0]);
    addBreakLine($(choices).attr("id"));

}

//Can be used in Rooted-Fixed
function displayTopology(choices, name){
    //Id names for the buttons and element choices
    var foption = "t" + name;
    var fchoice = "tc" + name;
    var eoption = "tb" + name;
    var echoice = "tbc" + name;

    //Name attribute for the radio buttons
    var fename = "ttb" + name;

    // //Topology Header
    // var t = document.createTextNode(type + " : ");
    // choices.append(t);

    // //Break Line
    // addBreakLine($(choices).attr("id"));

    //Topology option
    var x = $("<input type=\"radio\"  />");
    x[0].setAttribute("id", foption);
    x[0].setAttribute("name", fename);
    //sets the method for onchange
    x[0].setAttribute("onchange", "topologyOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")"); 
    
    choices.append(x[0]);        
    var t = document.createTextNode("Topology Only");
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
    y[0].setAttribute("onchange", "topologyOptions($(\"#" + foption +"\"), $(\"#" + fchoice + "\"), $(\"#" + eoption + "\"), $(\"#" + echoice + "\"),\"" + name + "\")"); 
  
    choices.append(y[0]);                           
    var t = document.createTextNode("Topology and Branch Lengths");
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

function topologyOptions(topology, topologyc, topologybranch, topologybranchc, name){
    $(topologyc).empty();//clears choices
    $(topologybranchc).empty();

    if(topology.is(':checked')){
        var t = document.createTextNode("Enter tree_file filename: ");
        var y1 = $("<textarea rows=\"1\" cols=\"80\" style=\"resize: none;\"/>");        
        y1[0].setAttribute("id", name + "t" );
        topologyc.append(t);
        topologyc.append(y1[0]);
    }

    if(topologybranch.is(':checked')){
        var t = document.createTextNode("Enter tree_file filename: ");
        var y1 = $("<textarea rows=\"1\" cols=\"80\" style=\"resize: none;\"/>");        
        y1[0].setAttribute("id", name + "tb" );
        topologybranchc.append(t);
        topologybranchc.append(y1[0]);
    }

}

createTreeOptions();
