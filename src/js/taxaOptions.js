//Selected taxa from table
var selectedTaxa = [];

//Created taxa groups
var taxaGroups = [];

function createTaxaOptions() {

    //Sets the taxa group back to zero
    taxaGroups = [];

    //Taxa tab body
    var tbody = document.getElementById("taxadatatable");

    var taxadata = getTaxa();

    if (taxadata.length && taxadata.length !== 0) {

        //Enables the checkbox for select all taxa
        $('#selectalltaxacheckbox').attr("checked", false);
        $('#selectalltaxacheckbox').removeAttr('disabled');

        //Enables the search input for taxa table
        $('#taxadatasearch').removeAttr('disabled');
        //Clears taxa table
        $("#taxadatatable").empty();
        //Adds the taxa to the table
        for (var i = 0; i < taxa.length; i++) {
            //Tr that is appended to tbody
            var tr = document.createElement('TR');
            //Td that is appended to Tr
            //Checks for each option
            var check = $("<input type=\"checkbox\"/>");
            //Sets the function to call for each checkbox on change
            check[0].setAttribute("onchange", "updateSelectTable()");
            var td = document.createElement('TD');
            td.appendChild(check[0]);
            //Taxa names
            var td2 = document.createElement('TD');
            td2.appendChild(document.createTextNode(taxadata[i]));
            td.style = "text-align: center;";
            //Td3 
            var td3 = document.createElement('TD');
            tr.append(td);
            tr.append(td2);
            tr.append(td3);
            //Appends the tr to the tbody
            tbody.append(tr);
        }

    } else {
        //Disables the checkbox for select all taxa
        $('#selectalltaxacheckbox').attr("checked", false);
        $('#selectalltaxacheckbox').attr({ 'disabled': 'disabled' });

        //Disables the search input for taxa table
        $('#taxadatasearch').attr({ 'disabled': 'disabled' });

        //Clears table
        $("#taxadatatable").empty();
        //Tr that is appended to tbody
        var tr = document.createElement('TR');
        //Td1 that is appended to Tr
        var td = document.createElement('TD');
        //Td2 Taxa names that is appended to Tr
        var td2 = document.createElement('TD');
        td2.appendChild(document.createTextNode("File has no taxa..."));
        td.style = "text-align: center;";
        //Td3 
        var td3 = document.createElement('TD');
        tr.append(td);
        tr.append(td2);
        tr.append(td3);
        //Appends the tr to the tbody
        tbody.append(tr);
    }

    //Adds the filter functionality to the search bar for the taxa data table
    var $rows = $('#taxadatatable tr');
    $('#taxadatasearch').keyup(debounce(function () {

        var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
            reg = RegExp(val, 'i'),
            text;

        $rows.show().filter(function () {
            text = $(this).text().replace(/\s+/g, ' ');
            return !reg.test(text);
        }).hide();
    }, 300));

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };


    //Updates Select Table
    updateSelectTable();

    //Updates Taxa Group Table
    updateTaxaGroupTable();

}

function updateTaxaTags(groupname, taxaset) {

    var table = document.getElementById('taxadata');
    for (var i = 0, row; row = table.rows[i]; i++) {
        var taxaname = row.cells[1].innerHTML;
        //Adds the taxa index if checkbox is checked.
        if(compareTaxa(taxaname, taxaset) === true){
            var tag = document.createElement('a');
            tag.className = "group-tag";
            tag.appendChild(document.createTextNode(groupname));
            row.cells[2].append(tag);
        }
    }
    
}

function compareTaxa(taxa, taxaset){

    for(var i = 0; i < taxaset.length; i++){
        if(taxa === taxaset[i]){
            return true;
        }
    }
    return false;
}

//Updates the selected taxa table with selected taxa
function updateSelectTable() {
    //Taxa index of each taxa that is selected and displayed
    selectedTaxa = [];
    var taxaData = getTaxa();

    var table = document.getElementById("taxadata");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var col = row.cells[0].children[0];
        //Adds the taxa index if checkbox is checked.
        if (col.checked) {
            selectedTaxa.push(taxaData[i - 1]);
        }
    }

    //Gets the selected taxa table
    var tbody = document.getElementById("selectedtaxatable");

    // var taxadata = getTaxa();
    $("#selectedtaxatable").empty();

    if (selectedTaxa.length !== 0) {
        //Removes disabled from create taxa group form
        $('#taxagroupcreate').removeAttr('disabled');
        $('#taxagroupcreatebutton').removeAttr('disabled');

        //Adds the taxa to the table
        for (var i = 0; i < selectedTaxa.length; i++) {
            //Tr that is appended to tbody
            var tr = document.createElement('TR');
            //Td that is appended to Tr
            var td = document.createElement('TD');
            //Taxa names
            td.appendChild(document.createTextNode(selectedTaxa[i]));
            tr.append(td);
            tbody.append(tr);
        }

    }

    //If no taxa is selected, display message in body of table
    if (selectedTaxa.length === 0) {
        //Adds disabled to create a taxa group form
        $('#taxagroupcreate').attr({ 'disabled': 'disabled' });
        $('#taxagroupcreatebutton').attr({ 'disabled': 'disabled' });


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

function selectAllTaxa() {
    var checktaxa = false;

    if ($('#selectalltaxacheckbox').is(':checked')) {
        checktaxa = true;
    }

    //Sets each taxa depending if the select all check box is checked
    var table = document.getElementById("taxadata");
    //Loop for checking all checkboxes
    for (var i = 1, row; row = table.rows[i]; i++) {
        //Checks the checkbox if it is being displayed
        if (row.style.display !== "none") {
            var col = row.cells[0].children[0];
            col.checked = checktaxa;
        }
    }

    //Updates Select table
    updateSelectTable();
}

function createTaxaGroup() {
    var taxagroup = { name: $("#taxagroupcreate").val(), taxa: selectedTaxa };
    taxaGroups.push(taxagroup);

    //clears the  taxa group input name
    $("#taxagroupcreate").val('');

    //Updates Taxa Group Table
    updateTaxaGroupTable();

    //Updates the Taxa tags
    updateTaxaTags(taxagroup.name, selectedTaxa);
}

function updateTaxaGroupTable() {
    //Gets the selected taxa table
    var tbody = document.getElementById("taxagrouptable");

    // Clears group taxa table
    $("#taxagrouptable").empty();

    if (taxaGroups.length !== 0) {

        //Adds the taxa to the table
        for (var i = 0; i < taxaGroups.length; i++) {
            //Tr that is appended to tbody
            var tr = document.createElement('TR');
            //Td that is appended to Tr
            var td = document.createElement('TD');


            //Td set edit attribute
            // td.setAttribute('contenteditable','true')
            // td.setAttribute('onchange', 'updateTaxaGroupName(' + i +')');


            //Taxa names
            td.appendChild(document.createTextNode(taxaGroups[i].name));
            tr.append(td);
            tbody.append(tr);
        }

    }

    //If no taxa is selected, display message in body of table
    if (taxaGroups.length === 0) {
        //Tr that is appended to tbody
        var tr = document.createElement('TR');
        //Td that is appended to Tr
        var td = document.createElement('TD');
        //Taxa names
        td.appendChild(document.createTextNode("No group is created..."));
        tr.append(td);
        tbody.append(tr);
    }
}

//Updates the data displayer
function updateDataDisplayer() {
    //TODO
}
