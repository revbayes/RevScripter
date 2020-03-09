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
        var value = $(this).val().toLowerCase();
        $rows.filter(function () {
            $(this).toggle(($(this).children(':eq(1)').text().toLowerCase().indexOf(value) > -1) && checkTaginFilter($(this).children(':eq(1)').text()))
        });
    }, 300));

    //To prevent filter function to run too often
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
    resetTaxaGroupTable();
}

function checkTaginFilter(taxaname) {
    var input, filter, table, tr, td;
    input = document.getElementById("taxatagfilter");
    filter = input.value.toUpperCase();
    var firstOptionSelected = input.selectedIndex === 0;
    if (firstOptionSelected) {
        return true;
    } else {
        for (var i = 0; i < taxaGroups.length; i++){
            if(taxaGroups[i].name.toUpperCase() === filter){
                for (var j = 0; j < taxaGroups[i].taxa.length; j++){
                    if (taxaGroups[i].taxa[j] === taxaname){
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function updateTaxaTags(groupname, taxaset) {

    var table = document.getElementById('taxadata');
    for (var i = 0, row; row = table.rows[i]; i++) {
        var taxaname = row.cells[1].innerHTML;
        //Adds the taxa index if checkbox is checked.
        if (compareTaxa(taxaname, taxaset) === true) {
            var tag = document.createElement('a');
            tag.className = "group-tag";
            tag.appendChild(document.createTextNode(groupname));
            row.cells[2].append(tag);
        }
    }

}

function compareTaxa(taxa, taxaset) {

    for (var i = 0; i < taxaset.length; i++) {
        if (taxa === taxaset[i]) {
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

    //Clears Selected Taxa table
    $("#selectedtaxatable").empty();


    if (selectedTaxa.length !== 0) {
        //Removes disabled from create taxa group form
        disableSelectedTaxaForms(false);

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
        disableSelectedTaxaForms(true);


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

function resetSelectTable() {
    //Selected Taxa array gets reset
    selectedTaxa = [];

    //Table gets reset
    $("#selectedtaxatable").empty();
    var tbody = document.getElementById("selectedtaxatable");

    //Adds disabled to create a taxa group form
    disableSelectedTaxaForms(true);

    //Tr that is appended to tbody
    var tr = document.createElement('TR');
    //Td that is appended to Tr
    var td = document.createElement('TD');
    //Taxa names
    td.appendChild(document.createTextNode("No data is selected..."));
    tr.append(td);
    tbody.append(tr);

    //Unchecks select all taxa checkbox
    $('#selectalltaxacheckbox').attr("checked", false);

    //Checkboxes get unchecked
    var table = document.getElementById("taxadata");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var col = row.cells[0].children[0];
        //Adds the taxa index if checkbox is checked.
        col.checked = false;
    }

}

function disableSelectedTaxaForms(disable) {
    if (disable) {
        $('#taxagroupcreate').attr({ 'disabled': 'disabled' });
        $('#taxagroupcreatebutton').attr({ 'disabled': 'disabled' });
        $('#resetselecttaxa').attr({ 'disabled': 'disabled' });
    } else {
        $('#taxagroupcreate').removeAttr('disabled');
        $('#taxagroupcreatebutton').removeAttr('disabled');
        $('#resetselecttaxa').removeAttr('disabled');
    }
}

function createTaxaGroup() {
    var taxagroup = { name: $("#taxagroupcreate").val(), taxa: selectedTaxa };
    taxaGroups.push(taxagroup);

    //clears the  taxa group input name
    $("#taxagroupcreate").val('');

    //Updates Taxa Group Table
    addTaxaGroupToTable(taxagroup.name);

    //Updates the Taxa tags
    updateTaxaTags(taxagroup.name, selectedTaxa);

    //Udates taxa filter select
    addOptionToTaxaFilter(taxagroup.name);
}

function addOptionToTaxaFilter(tag) {
    var select = document.getElementById('taxatagfilter');
    var opt = document.createElement('option');
    opt.innerHTML = tag;
    select.appendChild(opt);
}

function changeOptionInTaxaFilter(oldTag, newTag) {
    var select = document.getElementById('taxatagfilter');
    for (var i = 0; i < select.children.length; i++) {
        if (select.children[i].innerHTML === oldTag) {
            select.children[i].innerHTML = newTag;
        }
    }
}

// function updateTaxaGroupTable() {
//     //Gets the selected taxa table
//     var tbody = document.getElementById("taxagrouptable");

//     // Clears group taxa table
//     $("#taxagrouptable").empty();

//     if (taxaGroups.length !== 0) {

//         //Adds the taxa to the table
//         for (var i = 0; i < taxaGroups.length; i++) {
//             //Tr that is appended to tbody
//             var tr = document.createElement('TR');
//             //Td that is appended to Tr
//             var td = document.createElement('TD');


//             //Td set edit attribute
//             td.setAttribute('contenteditable','true');
//             // td.setAttribute('onchange', 'updateTaxaGroupName(' + i +')');


//             //Taxa names
//             td.appendChild(document.createTextNode(taxaGroups[i].name));
//             tr.append(td);
//             tbody.append(tr);
//         }

//     }

//     //If no taxa is selected, display message in body of table
//     if (taxaGroups.length === 0) {
//         //Tr that is appended to tbody
//         var tr = document.createElement('TR');
//         //Td that is appended to Tr
//         var td = document.createElement('TD');
//         //Taxa names
//         td.appendChild(document.createTextNode("No group is created..."));
//         tr.append(td);
//         tbody.append(tr);
//     }
// }

function resetTaxaGroupTable() {
    //Gets the selected taxa table
    var tbody = document.getElementById("taxagrouptable");

    // Clears group taxa table
    $("#taxagrouptable").empty();

    //Addes message to Taxa Group Table
    //Tr that is appended to tbody
    var tr = document.createElement('TR');
    //Td that is appended to Tr
    var td = document.createElement('TD');
    //Taxa names
    td.appendChild(document.createTextNode("No group is created..."));
    //Td2 that is appended to Tr
    var td2 = document.createElement('TD');
    tr.append(td);
    tr.append(td2);
    tbody.append(tr);

}

function addTaxaGroupToTable(groupname) {

    //Deletes messag in table if this is the first group that is created
    if (taxaGroups.length === 1) {
        $("#taxagrouptable").empty();
    }

    //Gets the selected taxa table
    var tbody = document.getElementById("taxagrouptable");

    //Adds the taxa to the table
    //Tr that is appended to tbody
    var tr = document.createElement('TR');
    //Td that is appended to Tr
    var td = document.createElement('TD');

    //Placeholder of the taxagroup in the table
    var placeholder = taxaGroups.length;

    //Td that is appended to Tr
    var td2 = document.createElement('TD');

    var a = document.createElement('a');
    a.setAttribute('data-toggle', 'modal');
    a.setAttribute('href', '#taxagroupoption');
    a.setAttribute('style', 'color: inherit; text-decoration: none;');
    a.setAttribute('onclick', 'openModalOption(\'' + placeholder + '\')');

    var i = document.createElement('i');
    i.setAttribute('class', 'glyphicon glyphicon-pencil');
    // i.setAttribute('style', 'float: right;');
    a.appendChild(i);

    //Taxa names
    td.appendChild(document.createTextNode(groupname));
    // td.appendChild(a);
    td2.appendChild(a);
    tr.append(td);
    tr.append(td2);
    tbody.append(tr);

}

function openModalOption(placeholder) {
    var groupname = document.getElementById('taxagroupdata').rows[placeholder].children[0].innerHTML;
    document.getElementById('modalheader').innerHTML = groupname;
    document.getElementById('newtaxagroupname').value = groupname;
    // console.log(placeholder);
    document.getElementById('taxagroupchangebutton').removeAttribute("onclick");
    document.getElementById('taxagroupchangebutton').setAttribute('onclick', 'changeGroupName(' + placeholder + ')');
}

function changeGroupName(placeholder) {
    // console.log(placeholder === 1);
    var oldtaxagroup = document.getElementById('taxagroupdata').rows[placeholder].children[0].innerHTML;
    var newtaxagroup = document.getElementById('newtaxagroupname').value;
    // console.log('Old name: ' + oldtaxagroup + '\n New name: ' + newtaxagroup);
    taxaGroups[placeholder - 1].name = newtaxagroup;
    document.getElementById('taxagroupdata').rows[placeholder].children[0].innerHTML = newtaxagroup;
    updateNewTaxaName(oldtaxagroup, newtaxagroup);
    changeOptionInTaxaFilter(oldtaxagroup, newtaxagroup);
}

function updateNewTaxaName(oldtag, newtag) {
    var table = document.getElementById('taxadata');
    // console.log('Removed Tag: ' + oldtag);
    for (var i = 1, row; row = table.rows[i]; i++) {
        //Each tag in row
        for (var j = 0; j < row.children[2].children.length; j++) {
            if (row.children[2].children[j].innerHTML === oldtag) {
                // console.log(row.children[2].children[j].innerHTML);
                // console.log('Removes tag');
                // row.children[2].removeChild(row.children[2].children[j]);
                row.children[2].children[j].innerHTML = newtag;
                console.log(row.children[2].children[j].innerHTML);
            }
        }
    }
}

function filterTaxaTag() {
    var input, filter, table, tr, td;
    input = document.getElementById("taxatagfilter");
    filter = input.value.toUpperCase();
    table = document.getElementById("taxadata");
    tr = table.getElementsByTagName("tr");
    var firstOptionSelected = input.selectedIndex === 0;
    //Search input value
    var searchinput = $('#taxadatasearch').val().toLowerCase();
    var $rows = $('#taxadatatable tr');
    console.log("Search box: " + searchinput);

    console.log("Filter: " + filter);
    for (var i = 1, row; row = table.rows[i]; i++) {
        //sets display to none
        row.style.display = "none"

        //Checks if first menu option is selected
        if (firstOptionSelected) {
            row.style.display = "";
        } else {
            //Each tag in row
            for (var j = 0; j < row.children[2].children.length; j++) {
                //Checks if row has tags and if tag matches filter
                if (row.children[2].children.length !== 0 && row.children[2].children[j].innerHTML.toUpperCase() === filter) {
                    row.style.display = "";
                }
            }
        }
    }

    //Filters with the search input
    $rows.filter(function () {
        $(this).toggle(($(this).children(':eq(1)').text().toLowerCase().indexOf(searchinput) > -1) && checkTaginFilter($(this).children(':eq(1)').text()))
    });

}

//Updates the data displayer
function updateDataDisplayer() {
    //TODO

}
