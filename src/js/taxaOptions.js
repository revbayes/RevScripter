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
            check[0].setAttribute("onchange", "updateSelectTable();  updateAddRemoveForm();");
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

    //Adds functionality to create taxa group
    // $("#creategroupform").on('submit', function (e) {
    //     createTaxaGroup();

    //     //stop form submission
    //     e.preventDefault();
    // });

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
        for (var i = 0; i < taxaGroups.length; i++) {
            if (taxaGroups[i].name.toUpperCase() === filter) {
                for (var j = 0; j < taxaGroups[i].taxa.length; j++) {
                    if (taxaGroups[i].taxa[j] === taxaname) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

//Creates tag for given taxaset in taxatable
function createTaxaTags(groupname, taxaset, monophyletic) {

    var table = document.getElementById('taxadata');
    for (var i = 0, row; row = table.rows[i]; i++) {
        var taxaname = row.cells[1].innerHTML;
        //Adds the taxa index if checkbox is checked.
        if (compareTaxa(taxaname, taxaset) === true) {
            var tag = document.createElement('a');
            tag.className = "group-tag";
            tag.appendChild(document.createTextNode(groupname));
            if (monophyletic === true) {
                tag.style.background = '#ffb3b3';
            } else {
                tag.style.background = '#e1ecf4';
            }
            row.cells[2].append(tag);
        }
    }

}

//Checks if given taxa is in the given taxaset
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

function updateAddRemoveForm() {
    console.log("This is the add remove function.");
    //Empty each option
    $("#addremovetaxaAll").empty();
    $("#addremovetaxaSome").empty();
    $("#addremovetaxaNone").empty();
    // console.log("Both groups: ");
    // printGroup(0);
    // printGroup(1);

    //If no taxa is selected

    //If taxa is selected
    //Going to get all the taxa groups from each taxa.
    for (var i = 0; i < taxaGroups.length; i++) {
        var hasTaxa = false;
        var hasAllTaxa = 0;
        //checks each taxa is in each group
        for (var j = 0; j < selectedTaxa.length; j++) {
            if (compareTaxa(selectedTaxa[j], taxaGroups[i].taxa)) {
                hasTaxa = true;
                hasAllTaxa++;
            }
        }
        //Adds group to correct option
        if (hasTaxa) {
            //All have tag
            if (hasAllTaxa === selectedTaxa.length) {
                // console.log(taxaGroups[i].name + " is in all.")
                var a = document.createElement('a');
                // a.setAttribute('data-toggle', 'modal');
                a.setAttribute('href', '#taxagroupoption');
                a.setAttribute('style', 'color: inherit; text-decoration: none; font: 16px Arial; display: block; ');
                // a.setAttribute('onclick', 'changeTaxaGroup(\'' + taxaGroups[i].name + '\', \'r\')');
                a.setAttribute('onclick', 'removeTaxaFromGroup(' + i + ')');


                var ielement = document.createElement('i');
                ielement.appendChild(document.createTextNode(taxaGroups[i].name));
                var br = document.createElement('br');
                var br2 = document.createElement('br');
                // i.setAttribute('class', 'glyphicon glyphicon-pencil');
                a.appendChild(ielement);
                var form = document.getElementById('addremovetaxaAll');
                form.appendChild(a);
                // form.appendChild(br);
                // form.appendChild(br2);
                // Some have tag
            } else {
                // console.log(taxaGroups[i].name + " is in some.")
                var a = document.createElement('a');
                // a.setAttribute('data-toggle', 'modal');
                a.setAttribute('href', '#taxagroupoption');
                a.setAttribute('style', 'color: inherit; text-decoration: none; font: 16px Arial; display: block;  ');
                a.setAttribute('onclick', 'addMissingTaxaToGroup(' + i + ')');

                var ielement = document.createElement('i');
                ielement.appendChild(document.createTextNode(taxaGroups[i].name));
                var br = document.createElement('br');
                var br2 = document.createElement('br');
                // i.setAttribute('class', 'glyphicon glyphicon-pencil');
                a.appendChild(ielement);
                var form = document.getElementById('addremovetaxaSome');
                form.appendChild(a);
                // form.appendChild(br);
                // form.appendChild(br2);
            }
            //None have tag
        } else {
            // console.log(taxaGroups[i].name + " is in none.")
            var a = document.createElement('a');
            // a.setAttribute('data-toggle', 'modal');
            a.setAttribute('href', '#taxagroupoption');
            a.setAttribute('style', 'color: inherit; text-decoration: none; font: 16px Arial; display: block;');
            a.setAttribute('onclick', 'addTaxaToGroup(' + i + ')');

            var ielement = document.createElement('i');
            ielement.appendChild(document.createTextNode(taxaGroups[i].name));
            var br = document.createElement('br');
            var br2 = document.createElement('br');
            // i.setAttribute('class', 'glyphicon glyphicon-pencil');
            a.appendChild(ielement);
            var form = document.getElementById('addremovetaxaNone');
            form.appendChild(a);
            // form.appendChild(br);
            // form.appendChild(br2);
        }
    }

}

function addTaxaToGroup(placeholder) {
    var newgroup = [];
    // for(var i = 0; i < taxaGroups[placeholder].taxa.length; i++){
    //     newgroup.push(taxaGroups[placeholder].taxa[i]);
    // }
    // console.log("before:");
    // printGroup(0);
    // printGroup(1);
    for (var j = 0; j < selectedTaxa.length; j++) {
        taxaGroups[placeholder].taxa.push(selectedTaxa[j]);
    }
    //taxaGroups[placeholder].taxa = newgroup;
    // console.log("after:");
    // printGroup(0);
    // printGroup(1);
    createTaxaTags(taxaGroups[placeholder].name, selectedTaxa, taxaGroups[placeholder].monophyletic);
    updateAddRemoveForm();
}

function addMissingTaxaToGroup(placeholder) {
    // var newgroup = taxaGroups[placeholder].taxa;
    var newgroup = [];
    var missingSet = [];
    //for(var i = 0; i < taxaGroups[placeholder].taxa.length; i++){
    // newgroup.push(taxaGroups[placeholder].taxa[i]);
    //}
    // console.log("before:");
    // printGroup(0);
    // printGroup(1);
    for (var j = 0; j < selectedTaxa.length; j++) {
        if (compareTaxa(selectedTaxa[j], taxaGroups[placeholder].taxa) === false) {
            // newgroup.push(selectedTaxa[j]);
            taxaGroups[placeholder].taxa.push(selectedTaxa[j]);
            missingSet.push(selectedTaxa[j]);
        }
    }
    // taxaGroups[placeholder].taxa = newgroup;
    // console.log("after:");
    // printGroup(0);
    // printGroup(1);
    createTaxaTags(taxaGroups[placeholder].name, missingSet, taxaGroups[placeholder].monophyletic);
    updateAddRemoveForm();
}

function removeTaxaFromGroup(placeholder) {
    var newgroup = [];
    // console.log("before:");
    // printGroup(0);
    //printGroup(1);

    for (var j = 0; j < taxaGroups[placeholder].taxa.length; j++) {
        if (compareTaxa(taxaGroups[placeholder].taxa[j], selectedTaxa) === true) {
            removeGroupTag(taxaGroups[placeholder].taxa[j], taxaGroups[placeholder].name);
        } else {
            newgroup.push(taxaGroups[placeholder].taxa[j]);
        }
    }

    taxaGroups[placeholder].taxa = deepCopyFunction(newgroup);
    // console.log("taxa that is changed: " + taxaGroups[placeholder].taxa)
    // console.log("Test for remove taxa from group");
    // console.log("after:");
    // printGroup(0);
    //printGroup(1);
    updateAddRemoveForm();
}


/*
function changeTaxaGroup(groupname, change) {
    console.log("Group is: " + groupname + ". And change is: " + change);
    //Adds Tag to all
    if (change === "a") {
        console.log("Before:")
        printGroup(0);
        printGroup(1);
        for (var i = 0; i < taxaGroups.length; i++) {
            if (groupname === taxaGroups[i].name) {
                // for (var j = 0; j < selectedTaxa.length; j++) {
                taxaGroups[i].taxa = addAllSetToGroup(taxaGroups[i].taxa, selectedTaxa);
                // }
            }
        }
        createTaxaTags(groupname, selectedTaxa);
        console.log("After:")
        printGroup(0);
        printGroup(1);
    }
    //Adds Tag to missing
    if (change === "m") {
        // console.log("Before:")
        // printGroup(0);
        // printGroup(1);
        var missingSet = [];
        let group = taxaGroups.find((p) => {
            return p.name === groupname;
        });
        console.log("this is the group name: " + group.name + " and Group Taxa: " + group.taxa);

        // for (var i = 0; i < taxaGroups.length; i++) {
        //     if (groupname === taxaGroups[i].name) {
        // for (var j = 0; j < selectedTaxa.length; j++) {
        // var newGroup = {name: taxaGroups[i].name, taxa: [], monophyletic: taxaGroups[i].monophyletic};
        // console.log("New Group that is changeded: " + taxaGroups[i].length);
        //             missingSet = findMissingSetInGroup(group.taxa, selectedTaxa);
        //             // // console.log("Taxa that is missed: " + missingSet);
        //             var newtaxa = addAllSetToGroup(group.taxa, missingSet);
        //             // taxaGroups[i] = newGroup;
        //             // console.log("Gruop after it is changeded: " + taxaGroups[i].length);
        //         // }
        // //     }
        // // }
        // group.taxa = newtaxa;
        
        for (var j = 0; j < selectedTaxa.length; j++) {
            var isInGroup = false;
            for (var n = 0; n < group.taxa.length; n++) {
                if (selectedTaxa[j] === group.taxa[n]) {
                    isInGroup = true;
                }
            }
            if (isInGroup === false) {
                missingSet.push(selectedTaxa[j])
                console.log("Before:")
                printGroup(0);
                printGroup(1);
                group.taxa.push(selectedTaxa[j])
                console.log("After:")
                printGroup(0);
                printGroup(1);
            }
        }


        createTaxaTags(groupname, missingSet);
        // console.log("After:")
        // printGroup(0);
        // printGroup(1);

    }
    //Removes Tag from all
    if (change === "r") {
        for (var i = 0; i < taxaGroups.length; i++) {
            if (groupname === taxaGroups[i].name) {

                for (var j = 0; j < selectedTaxa.length; j++) {
                    for (var n = 0; n < taxaGroups[i].taxa.length; n++) {
                        if (selectedTaxa[j] === taxaGroups[i].taxa[n]) {
                            console.log("Before:")
                            printGroup(0);
                            printGroup(1);
                            removeGroupTag(taxaGroups[i].taxa[n], taxaGroups[i].name);
                            taxaGroups[i].taxa = removeTaxaFromGroup(taxaGroups[i].taxa, selectedTaxa[j]);
                            // (taxaGroups[i].taxa).splice(n, 1);
                            // console.log("Group that is changed: " + taxaGroups[i].name);
                            // console.log("Taxa that is Changed(temp): " + temp);
                            // taxaGroups[i].taxa = temp;
                            console.log("After:")
                            printGroup(0);
                            printGroup(1);
                            // console.log("Group that is changed: " + taxaGroups[i].name);
                            // console.log("Taxa that is Changed: " + taxaGroups[i].taxa);
                        }
                    }
                }

            }
        }
    }

    //Updates the add/remove form and taxa tags
    updateAddRemoveForm();


}

//Finds given taxa set to taxagroup, if they are missing
function findMissingSetInGroup(group, taxaset) {
    var missingGroup = [];
    // for (var i = 0; i < group.length; i++){
    for (var j = 0; j < taxaset.length; j++) {
        if (!compareTaxa(taxaset[j], group)) {
            missingGroup.push(taxaset[j]);
        }
    }
    // }
    return missingGroup;
}

//Adds given taxa set to taxagroup
function addAllSetToGroup(group, taxaset) {
    var newgroup = group;
    // for (var i = 0; i < group.length; i++){
    for (var j = 0; j < taxaset.length; j++) {
        newgroup.push(taxaset[j]);
    }
    // }
    return newgroup;
}*/

//Removes given taxa from taxa group
// function removeTaxaFromGroup(group, taxa) {
//     var newgroup = [];
//     for (var i = 0; i < group.length; i++) {
//         if (group[i] !== taxa) {
//             newgroup.push(group[i]);
//         }
//     }
//     return newgroup;
// }

//Removes tag from given taxa in taxa table
function removeGroupTag(taxaname, taxatag) {
    var table = document.getElementById('taxadata');
    for (var i = 0, row; row = table.rows[i]; i++) {
        var rowname = row.cells[1].innerHTML;
        //Finds the row in taxa table
        if (taxaname === rowname) {
            //finds tag in taxatable
            for (var j = 0; j < row.children[2].children.length; j++) {
                //Removes 
                if (row.children[2].children[j].innerHTML === taxatag) {
                    row.children[2].removeChild(row.children[2].children[j]);
                }
            }

        }
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

//Deep copy function - https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
function deepCopyFunction(inObject) {
    let outObject, value, key

    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
        value = inObject[key]

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopyFunction(value)
    }

    return outObject
}

function createTaxaGroup() {
    //If group is not empty or name is already created.
    if ($("#taxagroupcreate").val() && /\S/.test($("#taxagroupcreate").val()) && !ifGroupExists($("#taxagroupcreate").val())) {
        var taxagroup = { name: $("#taxagroupcreate").val(), taxa: [], monophyletic: false };
        //Deep copies selected taxa to taxa of created group
        taxagroup.taxa = deepCopyFunction(selectedTaxa);

        taxaGroups.push(taxagroup);

        //clears the  taxa group input name
        $("#taxagroupcreate").val('');

        //Updates Taxa Group Table
        addTaxaGroupToTable(taxagroup.name);

        //Updates the Taxa tags
        createTaxaTags(taxagroup.name, selectedTaxa, taxagroup.monophyletic);

        //Udates taxa filter select
        addOptionToTaxaFilter(taxagroup.name);

        //Updates add remove option
        updateAddRemoveForm();

        //Enbales export groups button
        $('#exportgroupsbtn').removeAttr('disabled');
    } else {
        console.log("Can't create a group");
    }
}

function ifGroupExists(inputname){
    for(var i = 0; i < taxaGroups.length; i++){
        if(inputname === taxaGroups[i].name){
            return true;
        }
    }
    return false;
}


function addOptionToTaxaFilter(tag) {
    var select = document.getElementById('taxatagfilter');
    var opt = document.createElement('option');
    opt.innerHTML = tag;
    select.appendChild(opt);
}

//Changes group tag in filter with new tag name
function changeOptionInTaxaFilter(oldTag, newTag) {
    var select = document.getElementById('taxatagfilter');
    for (var i = 0; i < select.children.length; i++) {
        if (select.children[i].innerHTML === oldTag) {
            select.children[i].innerHTML = newTag;
        }
    }
}

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
    a.appendChild(i);

    //Taxa names
    td.appendChild(document.createTextNode(groupname));
    // td.appendChild(a);
    td2.appendChild(a);
    td2.style = "text-align: center;";
    tr.append(td);
    tr.append(td2);
    tbody.append(tr);

}

//Updates modal option for each group, when the modal is opened. And gives onlclick function to each group in group table.
function openModalOption(placeholder) {
    var groupname = document.getElementById('taxagroupdata').rows[placeholder].children[0].innerHTML;
    //Changes the modal header to groupname
    document.getElementById('modalheader').innerHTML = groupname;
    //changes the modal input to groupname
    document.getElementById('newtaxagroupname').value = groupname;
    //Changes monophyletic input to what is selected to group
    if (taxaGroups[placeholder - 1].monophyletic === true) {
        document.getElementById("monophyleticcheckbox").checked = true;
    } else {
        document.getElementById("monophyleticcheckbox").checked = false;
    }
    document.getElementById('taxagroupchangebutton').removeAttribute("onclick");
    document.getElementById('taxagroupchangebutton').setAttribute('onclick', 'changeGroupInfo(' + placeholder + ')');
}

//Updates group information with information from modal form
function changeGroupInfo(placeholder) {
    //Updates group table and array with new name
    var oldtaxagroup = document.getElementById('taxagroupdata').rows[placeholder].children[0].innerHTML;
    var newtaxagroup = document.getElementById('newtaxagroupname').value;
    taxaGroups[placeholder - 1].name = newtaxagroup;
    document.getElementById('taxagroupdata').rows[placeholder].children[0].innerHTML = newtaxagroup;
    //Updates monophyletic boolean
    if ($('#monophyleticcheckbox').is(':checked')) {
        taxaGroups[placeholder - 1].monophyletic = true;
    } else {
        taxaGroups[placeholder - 1].monophyletic = false;
    }
    //Updates new group information for tags in taxa table
    updateGroupTaxa(oldtaxagroup, newtaxagroup, taxaGroups[placeholder - 1].monophyletic);
    //Updates taxa filter with name on input
    changeOptionInTaxaFilter(oldtaxagroup, newtaxagroup);
    //Updates add/remove pop-up form
    updateAddRemoveForm();
}

//Updates the new group tag from modal to taxa table
function updateGroupTaxa(oldtag, newtag, monophyletic) {
    var table = document.getElementById('taxadata');
    // console.log('Removed Tag: ' + oldtag);
    for (var i = 1, row; row = table.rows[i]; i++) {
        //Each tag in row
        for (var j = 0; j < row.children[2].children.length; j++) {
            // console.log("Tag color: " + row.children[2].children[j].style.background)
            // console.log("Monophyletic: " + monophyletic)
            // row.children[2].children[j].style.background = 'red';
            //Changes Tag Name
            if (row.children[2].children[j].innerHTML === oldtag) {
                row.children[2].children[j].innerHTML = newtag;
                //Changes Tag color if it is monophyletic
                if (monophyletic === true) {
                    row.children[2].children[j].style.background = '#ffb3b3';
                } else {
                    row.children[2].children[j].style.background = '#e1ecf4';
                }
            }
        }
    }
}

//Filters taxa by selected tag
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

// //Exports created taxa groups to a text file
// function exportTaxaGroups(){
//     console.log('Exporting taxa groups');
//     var groupstext;
//     var mconstraint;
//     for(var i =0; i<taxaGroups.length;i++){
//         //var group = taxaGroups[i].name + " = clade(";
//         var groups = [];
//         for(var j = 0;j<taxaGroups[i].taxa.length;j++){
//             var group = "\"" + taxaGroups[i].taxa[j] + "\"";
//             groups.push(group);
//         }
//         groups.join(", ");
//         //group = group + ")";
//     }
//     console.log(groupstext);
//     // downloadFile("taxagroups", document.getElementById('scriptBox').value);
// }

// //function dowloads the file to the users computer
// function downloadFile(filename, text) {
//     var element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', filename);
  
//     element.style.display = 'none';
//     document.body.appendChild(element);
  
//     element.click();
  
//     document.body.removeChild(element);
// }

//Updates the data displayer
function updateDataDisplayer() {
    //TODO

}

//For debugging
function printGroup(index) {
    console.log("Groupname: " + taxaGroups[index].name + " Taxa: " + taxaGroups[index].taxa + " M: " + taxaGroups[index].monophyletic);
}
