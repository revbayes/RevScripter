function createTaxaOptions(){

    //Clears the taxa div
    // $("#taxaOptions").empty();

    //Gets the taxa div
    var option = document.getElementById("taxaOptions");

    var table = document.getElementById("taxadata");

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
            var td = document.createElement('TD');
            //Taxa name
            var td2 = document.createElement('TD');
            td2.appendChild(document.createTextNode(taxadata[i]));
            td.style = "width: 20%";
            tr.append(td);
            tr.append(td2);

            tbody.append(tr);

        }

    }
     
}

createTaxaOptions();
