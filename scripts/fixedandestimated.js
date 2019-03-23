function createModelOptions(){

    var y = document.getElementById("mcmc");

    var choices = $("<div id=\"choices\" />");

    var x = $("<select id=\"mySelect\"  />");

    y.append(x[0]);

    addBreakLine(y.id);
    addBreakLine(y.id);
    
    y.append(choices[0]);

    var z = $("<option id=\"value1\" value=\"value1\" selected=\"selected\" />");
    var t = document.createTextNode("Volvo");
    z[0].append(t);
    x[0].append(z[0]);


    var z = $("<option id=\"value2\" value=\"value2\" />");
    var t = document.createTextNode("Volvo2");
    z[0].append(t);
    x[0].append(z[0]);

   
    var temp = "#mySelect";
    var temp2 = "#choices";
    displayFandE($(temp).val(),choices[0]);
    
    x[0].setAttribute("onchange", "displayFandE($(\"" + temp +"\").val(), $(\"" + temp2 + "\"))");
}

function displayFandE(value,choices){
     
    $(choices).empty();//clears choices

    if(value == "value1"){      
 
            //fixed choice
            var x = $("<input id=\"fixed\" name=\"fande\" value = \"dandev\" type=\"radio\" />");
            choices.append(x[0]);
            var t = document.createTextNode("Fixed");
            choices.append(t);

            addBreakLine($(choices).attr("id"));
            addBreakLine($(choices).attr("id"));

            //fixed options
            var f = $("<div id =\"fop\" />");
            var t = document.createTextNode("Enter a value (greater than 0): ");
            var y1 = $("<input type = \"number\" id=\"f\" value = \"1\" style=\"width: 35px;\" />");        
            f[0].append(t);
            f[0].append(y1[0]);

            choices.append(f[0]);

            addBreakLine($(choices).attr("id"));

            //estimated choice
            var x = $("<input id=\"estimated\" name=\"fande\" type=\"radio\" />");
            choices.append(x[0]);
            var t = document.createTextNode("Estimated");
            choices.append(t);

            addBreakLine($(choices).attr("id"));
            addBreakLine($(choices).attr("id"));

            //estimated options
            var e = $("<div id=\"eop\" />");
            var t = document.createTextNode("Choose prior distribution: ");

            e[0].append(t);
            //Select menu
            var x = $("<select id=\"eSelect\"  />");
            //menu options
            var z = $("<option id=\"eval\" value=\"eval\" selected=\"selected\" />");
            var t = document.createTextNode("Exponential");
            z[0].append(t);
            x[0].append(z[0]);
            var z = $("<option id=\"eval2\" value=\"eval2\" />");
            var t = document.createTextNode("Gamma");
            z[0].append(t);
            x[0].append(z[0]);
            var z = $("<option id=\"eval3\" value=\"eval3\" />");
            var t = document.createTextNode("Lognormal");
            z[0].append(t);
            x[0].append(z[0]);
            var z = $("<option id=\"eval4\" value=\"eval4\" />");
            var t = document.createTextNode("Uniform");
            z[0].append(t);
            x[0].append(z[0]);

            e[0].append(x[0]);

            var mybr = document.createElement('br');
            e[0].append(mybr);
        
            //menu choices
            var t = document.createTextNode("Enter shape parameter(greater than 0): ");
            var y1 = $("<input type = \"number\" id=\"f\" value = \"1\" style=\"width: 35px;\" />");        
            e[0].append(t);
            e[0].append(y1[0]);

            
            choices.append(e[0]);
            addBreakLine($(choices).attr("id"));
                
    }
    
    if(value == "value2"){
          
        var x = document.createElement("INPUT");
        x.setAttribute("type", "number");
        x.setAttribute("id","number");

        choices.append(x);
        
    }
     
}

function addBreakLine(idname){
    var mybr = document.createElement('br');
    var y = document.getElementById(idname);
    y.appendChild(mybr);
}


createModelOptions();// for debugging
