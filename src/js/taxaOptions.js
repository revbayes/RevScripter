function createTaxaOptions(){

    //Gets the taxa div
    var tbody = document.getElementById("taxadatatable");

    var taxadata = getTaxa();
    console.log("Taxa size: " + taxadata.length);

    if(taxadata.length && taxadata.length !== 0){
        //Enables the search input for taxa table
        $('#taxadatasearch').removeAttr('disabled');
        //Clears taxa table
        $("#taxadatatable").empty();
        //Adds the taxa to the table
        for(var i = 0; i < taxa.length; i++){
            //Tr that is appended to tbody
            var tr = document.createElement('TR');
            //Td that is appended to Tr
            //Checks for each option
            var check = $("<input type=\"checkbox\" />");
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
            //Appends the tr to the tbody
            tbody.append(tr);
        }
    }else{
        //Disables the search input for taxa table
        $('#taxadatasearch').attr({'disabled': 'disabled' });
        $("#taxadatatable").empty();
        //Tr that is appended to tbody
        var tr = document.createElement('TR');
        //Td that is appended to Tr
        var td = document.createElement('TD');
        //Taxa names
        var td2 = document.createElement('TD');
        td2.appendChild(document.createTextNode("File has no taxa..."));
        td.style = "text-align: center;";
        tr.append(td);
        tr.append(td2);
        //Appends the tr to the tbody
        tbody.append(tr);
    }

    //Adds the filter functionality to the search bar for the taxa data table
    var $rows = $('#taxadatatable tr');
    $('#taxadatasearch').keyup(debounce(function() {

    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        reg = RegExp(val, 'i'),
        text;

    $rows.show().filter(function() {
        text = $(this).text().replace(/\s+/g, ' ');
        return !reg.test(text);
    }).hide();
    }, 300));

    function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
        args = arguments;
        var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
    };

}

//Updates the selected taxa table with selected taxa
function updateSelectTable(){
    var selectedTaxa = [];
    var table = document.getElementById("taxadata");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var col = row.cells[0].children[0]; 
        if(col.checked){
            selectedTaxa.push(i-1);
        }
    }

    //Updates the selected taxa table
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

//Updates the data displayer
function updateDataDisplayer(){
    //TODO
}
