function createTaxaOptions(){

    //Gets the taxa div
    var tbody = document.getElementById("taxadatatable");

    var taxadata = getTaxa();
    console.log("Taxa size: " + taxadata.length);

    if(taxadata.length !== 0){
        $("#taxadatatable").empty();
        //Adds the taxa to the table
        for(var i = 0; i < taxa.length; i++){
            //Tr that is appended to tbody
            var tr = document.createElement('TR');
            //Td that is appended to Tr
            //Checks for each option
            var check = $("<input type=\"checkbox\" class=\"custom-control-input\" />");
            //Sets the function to call for each checkbox on change
            check[0].setAttribute("onchange","updateSelectTable()" );
            var td = document.createElement('TD');
            td.appendChild(check[0]);
            //Taxa names
            var td2 = document.createElement('TD');
            td2.appendChild(document.createTextNode(taxadata[i]));
            td.style = "text-align: center;";
            tr.append(td);
            tr.append(td2);

            tbody.append(tr);

        }

    }
     
}

function updateSelectTable(){
    var selectedTaxa = [];
    var table = document.getElementById("taxadata");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var col = row.cells[0].children[0]; 
        if(col.checked){
            selectedTaxa.push(i-1);
        }
    }

    //Updates the selected taca table
    var tbody = document.getElementById("selectedtaxatable");

    var taxadata = getTaxa();

    if(taxadata.length !== 0){
        $("#selectedtaxatable").empty();
        //Adds the taxa to the table
        for(var i = 0; i < selectedTaxa.length; i++){
            //Tr that is appended to tbody
            var tr = document.createElement('TR');
            //Td that is appended to Tr
            var td = document.createElement('TD');
            //Taxa names
            td.appendChild(document.createTextNode(taxadata[selectedTaxa[i]]));
            tr.append(td);
            tbody.append(tr);
        }

        //If no taxa is selected display message in body of table
        if(selectedTaxa.length === 0){
            //Tr that is appended to tbody
            var tr = document.createElement('TR');
            //Td that is appended to Tr
            var td = document.createElement('TD');
            //Taxa names
            td.appendChild(document.createTextNode("No data is selected..."));
            tr.append(td);
            tbody.append(tr);
        }

    }

}

createTaxaOptions();
