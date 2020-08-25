//Keeps track of selected taxa from taxa table
var selectedTaxa = [];

//Keeps track of taxa groups in taxa group table, contains objects with name, taxa, and monophyletic
var taxaGroups = [];

//Creates Taxa Table taxa from parsed taxa and sets different functionalities, is called each time a file is parsed
function createTaxaOptions() {

    //Resets taxa groups
    taxaGroups = [];

    //Body of taxa table
    var tbody = document.getElementById("taxadatatable");

    //Taxa from parsed file
    var taxadata = getTaxa();

    //Checks if taxa from parsed file is more than 0
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
            //Td that is appended to Tr - checkbox
            //Checks for each option
            var check = $("<input type=\"checkbox\"/>");
            //Sets the function to call for each checkbox onchange
            check[0].setAttribute("onchange", "updateSelectTable();  updateAddRemoveForm();");
            var td = document.createElement('TD');
            td.appendChild(check[0]);
            //Td2 that is appended to Tr - taxa name
            var td2 = document.createElement('TD');
            td2.appendChild(document.createTextNode(taxadata[i]));
            td.style = "text-align: center;";
            //Td3 that is appended to Tr - Tags box
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

        //Clears taxa table
        $("#taxadatatable").empty();
        //Tr that is appended to tbody - empty
        var tr = document.createElement('TR');
        //Td1 that is appended to Tr 
        var td = document.createElement('TD');
        //Td2 that is appended to Tr - Message
        var td2 = document.createElement('TD');
        td2.appendChild(document.createTextNode("File has no taxa..."));
        td.style = "text-align: center;";
        //Td3 that is appended to Tr - empty
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

//Checks if given taxa is in current filter
function checkTaginFilter(taxaname) {
    var input, filter;
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

//Creates tag for given taxaset in taxa table, also gives color of each tag depending on given monophyletic
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
    //Selected taxa is reset
    selectedTaxa = [];
    //Taxa from parsed file
    var taxaData = getTaxa();

    //checks which taxa's checkbox are checked and add those to selectedTaxa array
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

    //Adds taxa from selectedTaxa array to selected taxa table, if there are more than 0 taxa checked
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

//Updates the add/remove pop-up form with current tags of each created group
function updateAddRemoveForm() {
    //Empty each section in add/remove form
    $("#addremovetaxaAll").empty();
    $("#addremovetaxaSome").empty();
    $("#addremovetaxaNone").empty();

    //Puts each tag for each group in correct section based off of which taxa are currently selected
    //If no taxa is selected, don't display any tags on form
    if (selectedTaxa.length > 0) {
        //If taxa is selected
        //Iterate through all the taxa groups tags from each taxa.
        for (var i = 0; i < taxaGroups.length; i++) {
            //Tracks if taxa group is in some selected taxa
            var hasTaxa = false;
            //Tracks if taxa group contains all selected taxa
            var hasAllTaxa = 0;
            //checks if each taxa is in group or if some are in group
            for (var j = 0; j < selectedTaxa.length; j++) {
                if (compareTaxa(selectedTaxa[j], taxaGroups[i].taxa)) {
                    hasTaxa = true;
                    hasAllTaxa++;
                }
            }
            //Adds group to correct option
            //Taxa group contains some selected taxa or none
            if (hasTaxa) {
                //Taxa group contains all selected taxa or some taxa
                if (hasAllTaxa === selectedTaxa.length) {
                    var a = document.createElement('a');
                    a.setAttribute('href', '#taxagroupoption');
                    a.className = "addremove-tag";
                    a.setAttribute('onclick', 'removeSelectedTaxaFromGroup(' + i + ')');

                    var ielement = document.createElement('i');
                    ielement.appendChild(document.createTextNode(taxaGroups[i].name));
                    ielement.setAttribute('style', 'padding: 3px 5px;');
                    if (taxaGroups[i].monophyletic === true) {
                        ielement.style.background = '#ffb3b3';
                    } else {
                        ielement.style.background = '#e1ecf4';
                    }
                    a.appendChild(ielement);
                    var form = document.getElementById('addremovetaxaAll');
                    form.appendChild(a);
                } else {
                    var a = document.createElement('a');
                    a.setAttribute('href', '#taxagroupoption');
                    a.className = "addremove-tag";
                    a.setAttribute('onclick', 'addMissingSelectedTaxaToGroup(' + i + ')');

                    var ielement = document.createElement('i');
                    ielement.appendChild(document.createTextNode(taxaGroups[i].name));
                    ielement.setAttribute('style', 'padding: 3px 5px;');
                    if (taxaGroups[i].monophyletic === true) {
                        ielement.style.background = '#ffb3b3';
                    } else {
                        ielement.style.background = '#e1ecf4';
                    }
                    a.appendChild(ielement);
                    var form = document.getElementById('addremovetaxaSome');
                    form.appendChild(a);
                }
            } else {
                var a = document.createElement('a');
                a.setAttribute('href', '#taxagroupoption');
                a.className = "addremove-tag";
                a.setAttribute('onclick', 'addSelectedTaxaToGroup(' + i + ')');

                var ielement = document.createElement('i');
                ielement.appendChild(document.createTextNode(taxaGroups[i].name));
                ielement.setAttribute('style', 'padding: 3px 5px;');
                if (taxaGroups[i].monophyletic === true) {
                    ielement.style.background = '#ffb3b3';
                } else {
                    ielement.style.background = '#e1ecf4';
                }
                a.appendChild(ielement);
                var form = document.getElementById('addremovetaxaNone');
                form.appendChild(a);
            }
        }
    }
}

//Adds all selected taxa to group,group is based on given placeholder
function addSelectedTaxaToGroup(placeholder) {
    for (var j = 0; j < selectedTaxa.length; j++) {
        taxaGroups[placeholder].taxa.push(selectedTaxa[j]);
    }
    //Creates tag for new selected taxa added to group
    createTaxaTags(taxaGroups[placeholder].name, selectedTaxa, taxaGroups[placeholder].monophyletic);
    //Updates form with new taxa in group
    updateAddRemoveForm();
}

//Adds missing selected Taxa to group, group is based on given placeholder
function addMissingSelectedTaxaToGroup(placeholder) {
    var missingSet = [];
    for (var j = 0; j < selectedTaxa.length; j++) {
        if (compareTaxa(selectedTaxa[j], taxaGroups[placeholder].taxa) === false) {
            taxaGroups[placeholder].taxa.push(selectedTaxa[j]);
            missingSet.push(selectedTaxa[j]);
        }
    }
    //Creates tags for new selected added to group
    createTaxaTags(taxaGroups[placeholder].name, missingSet, taxaGroups[placeholder].monophyletic);
    //Updates form with new taxa in group
    updateAddRemoveForm();
}

//Removes selected Taxa from group, group is based on placeholder
function removeSelectedTaxaFromGroup(placeholder) {
    var newgroup = [];
    for (var j = 0; j < taxaGroups[placeholder].taxa.length; j++) {
        if (compareTaxa(taxaGroups[placeholder].taxa[j], selectedTaxa) === true) {
            removeGroupTag(taxaGroups[placeholder].taxa[j], taxaGroups[placeholder].name);
        } else {
            newgroup.push(taxaGroups[placeholder].taxa[j]);
        }
    }
    //copies new taxa to taxa group
    taxaGroups[placeholder].taxa = deepCopyFunction(newgroup);

    //Checks if group is empty, and deletes from taxa groups if it is
    if (taxaGroups[placeholder].taxa.length === 0) {
        deleteTaxaGroup(placeholder);
        if (taxaGroups.length === 0) {
            //Resets table
            resetTaxaGroupTable();
            $('#exportgroupsbtn').attr({ 'disabled': 'disabled' });
        }
    }
    //Updates form with taxa removed from group
    updateAddRemoveForm();
}

//Removes tag from given taxa name in taxa table
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

//Selects all taxa in taxa table, depending on check all checkbox
function selectAllTaxa() {
    //checks if checkbox is checked
    var checktaxa = false;
    if ($('#selectalltaxacheckbox').is(':checked')) {
        checktaxa = true;
    }

    //Sets each taxa depending if the select all check box is checked
    var table = document.getElementById("taxadata");
    //Loop for checking all checkboxes
    for (var i = 1, row; row = table.rows[i]; i++) {
        //Checks the checkbox if it is being displayed(could be filtered with search box)
        if (row.style.display !== "none") {
            var col = row.cells[0].children[0];
            col.checked = checktaxa;
        }
    }
    //Updates Select table
    updateSelectTable();
}

//Clears selected taxa array and selected taxa table
function resetSelectTable() {
    //Selected Taxa array gets reset
    selectedTaxa = [];

    //Table gets reset
    $("#selectedtaxatable").empty();
    var tbody = document.getElementById("selectedtaxatable");

    //Adds disabled attribute to create a taxa group form
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

    //All checkboxes get unchecked
    var table = document.getElementById("taxadata");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var col = row.cells[0].children[0];
        //Adds the taxa index if checkbox is checked.
        col.checked = false;
    }
}

//Adds disabled or removes disabled attribute on create a group unput box and button depending on given boolean
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

//Deep copy function, creates a  deep copy of given object - https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
//Used to create copies of different taxa arrays to created groups and updatind groups with add/remove form
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

//Creates a new taxa group with name on input box, selected taxa, and a false monophyletic
function createTaxaGroup() {
    //Checks if group is not empty or name is already created.
    if ($("#taxagroupcreate").val() && /\S/.test($("#taxagroupcreate").val()) && !ifGroupExists($("#taxagroupcreate").val())) {
        //New group
        var taxagroup = { name: $("#taxagroupcreate").val(), taxa: [], monophyletic: false };
        //Deep copies selected taxa to taxa of created group
        taxagroup.taxa = deepCopyFunction(selectedTaxa);

        //Group gets added to taxa groups array
        taxaGroups.push(taxagroup);

        //clears the  taxa group input name
        $("#taxagroupcreate").val('');

        //Updates Taxa Group Table
        addTaxaGroupToTable(taxagroup.name);

        //Updates the Taxa tags
        createTaxaTags(taxagroup.name, selectedTaxa, taxagroup.monophyletic);

        //Udates taxa filter select
        addOptionToTaxaFilter(taxagroup.name);

        //Updates add/remove form
        updateAddRemoveForm();

        //Enables export groups button
        $('#exportgroupsbtn').removeAttr('disabled');
    } else {
        //debugging
        // console.log("Can't create a group");
    }
}

//Checks if group exist with given name
function ifGroupExists(inputname) {
    for (var i = 0; i < taxaGroups.length; i++) {
        if (inputname === taxaGroups[i].name) {
            return true;
        }
    }
    return false;
}


//Deletes taxa group from taxa table with given placholder
function deleteTaxaGroup(placeholder) {
    //Gets taxa group table body
    var tbody = document.getElementById("taxagrouptable");
    tbody.removeChild(tbody.children[placeholder]);
    taxaGroups.splice(placeholder, 1);
    //Removes group from group table
    var select = document.getElementById('taxatagfilter');
    select.removeChild(select.children[placeholder + 1]);
    //Updates openModal method for each taxa group remaining in taxa group table
    for (var i = 0; i < taxaGroups.length; i++) {
        document.getElementById("taxagrouptable").children[i].children[1].children[0].removeAttribute('onclick');
        document.getElementById("taxagrouptable").children[i].children[1].children[0].setAttribute('onclick', 'openModalOption(\'' + i + '\')');
    }
}

//Adds tag to taxa filter select menu
function addOptionToTaxaFilter(tag) {
    var select = document.getElementById('taxatagfilter');
    var opt = document.createElement('option');
    opt.innerHTML = tag;
    select.appendChild(opt);
}

//Changes group tag in filter with new tag name
function updateOptionInTaxaFilter(oldTag, newTag) {
    var select = document.getElementById('taxatagfilter');
    for (var i = 0; i < select.children.length; i++) {
        if (select.children[i].innerHTML === oldTag) {
            select.children[i].innerHTML = newTag;
        }
    }
}

//Resets taxa group table with message
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

//Adds taxa group name to taxa group table
function addTaxaGroupToTable(groupname) {

    //Deletes messag in table if this is the first group that is created
    if (taxaGroups.length === 1) {
        $("#taxagrouptable").empty();
    }

    //Gets the selected taxa table
    var tbody = document.getElementById("taxagrouptable");

    //Adds the taxa group name to the table
    //Tr that is appended to tbody
    var tr = document.createElement('TR');
    //Td that is appended to Tr - Group naem
    var td = document.createElement('TD');

    //Placeholder of the taxagroup in the table
    var placeholder = taxaGroups.length - 1;

    //Td that is appended to Tr - Edit icon
    var td2 = document.createElement('TD');
    var a = document.createElement('a');
    a.setAttribute('data-toggle', 'modal');
    a.setAttribute('href', '#taxagroupoption');
    a.setAttribute('style', 'color: inherit; text-decoration: none;');
    a.setAttribute('onclick', 'openModalOption(\'' + placeholder + '\')');
    var i = document.createElement('i');
    i.setAttribute('class', 'glyphicon glyphicon-pencil');
    a.appendChild(i);

    //Taxa name is appended
    td.appendChild(document.createTextNode(groupname));
    td2.appendChild(a);
    td2.style = "text-align: center;";
    tr.append(td);
    tr.append(td2);
    tbody.append(tr);
}

//Updates modal option for each group depending on placeholder
function openModalOption(placeholder) {
    //Gets taxa group name from taxa group table
    var groupname = document.getElementById("taxagrouptable").children[placeholder].children[0].innerHTML;
    //Changes the modal header to taxa group name
    document.getElementById('modalheader').innerHTML = groupname;
    //changes the modal input to taxa group name
    document.getElementById('newtaxagroupname').value = groupname;
    //Changes monophyletic checkbox to what is selected to group
    if (taxaGroups[placeholder].monophyletic === true) {
        document.getElementById("monophyleticcheckbox").checked = true;
    } else {
        document.getElementById("monophyleticcheckbox").checked = false;
    }
    //Adds function to change group info for group if clicked on
    document.getElementById('taxagroupchangebutton').removeAttribute("onclick");
    document.getElementById('taxagroupchangebutton').setAttribute('onclick', 'changeGroupInfo(' + placeholder + ')');
}

//Updates group information with information from modal form
function changeGroupInfo(placeholder) {
    //Updates taxa group table and taxa group array with new name
    var oldtaxagroup = document.getElementById("taxagrouptable").children[placeholder].children[0].innerHTML;
    var newtaxagroup = document.getElementById('newtaxagroupname').value;
    //checks if new name from modal exists
    if (!ifGroupExists(newtaxagroup)) {
        taxaGroups[placeholder].name = newtaxagroup;
        document.getElementById("taxagrouptable").children[placeholder].children[0].innerHTML = newtaxagroup;
        //Updates monophyletic boolean for taxa group
        if ($('#monophyleticcheckbox').is(':checked')) {
            taxaGroups[placeholder].monophyletic = true;
        } else {
            taxaGroups[placeholder].monophyletic = false;
        }
        //Updates new group information for tags in taxa table
        updateGroupTaxa(oldtaxagroup, newtaxagroup, taxaGroups[placeholder].monophyletic);
        //Updates taxa filter with name on input
        updateOptionInTaxaFilter(oldtaxagroup, newtaxagroup);
        //Updates add/remove pop-up form
        updateAddRemoveForm();
    }
}

//Updates the new group tag from modal to each taxa tag in taxa table
function updateGroupTaxa(oldtag, newtag, monophyletic) {
    var table = document.getElementById('taxadata');
    //Each row
    for (var i = 1, row; row = table.rows[i]; i++) {
        //Each tag in row
        for (var j = 0; j < row.children[2].children.length; j++) {
            //Changes Tag Name
            if (row.children[2].children[j].innerHTML === oldtag) {
                row.children[2].children[j].innerHTML = newtag;
                //Changes tag color from monophyletic
                if (monophyletic === true) {
                    row.children[2].children[j].style.background = '#ffb3b3';
                } else {
                    row.children[2].children[j].style.background = '#e1ecf4';
                }
            }
        }
    }
}

//Filters taxa by selected tag in select tag filter and search input box
function filterTaxaTag() {
    var input, filter, table, tr;
    //taxa filter from select menu
    input = document.getElementById("taxatagfilter");
    filter = input.value.toUpperCase();
    //Taxa table is selected and name from each row is selected
    table = document.getElementById("taxadata");
    tr = table.getElementsByTagName("tr");
    //Used to check if first option, which is placeholder is selected in the select tag filter
    var firstOptionSelected = input.selectedIndex === 0;
    //Search input value from search input box
    var searchinput = $('#taxadatasearch').val().toLowerCase();
    //Each row is selected from taxa table
    var $rows = $('#taxadatatable tr');
    //Each row is checked and displayed depending on filter
    for (var i = 1, row; row = table.rows[i]; i++) {
        //sets display to none
        row.style.display = "none"

        //Checks if first menu option is selected, which is just a placeholder
        if (firstOptionSelected) {
            row.style.display = "";
        } else {
            //Each tag in row
            for (var j = 0; j < row.children[2].children.length; j++) {
                //Checks if row has tags and if tag matches filter it displayed
                if (row.children[2].children.length !== 0 && row.children[2].children[j].innerHTML.toUpperCase() === filter) {
                    row.style.display = "";
                }
            }
        }
    }

    //Filters with the search input after filter with tag is done
    $rows.filter(function () {
        $(this).toggle(($(this).children(':eq(1)').text().toLowerCase().indexOf(searchinput) > -1) && checkTaginFilter($(this).children(':eq(1)').text()))
    });
}

//Opens Export Modal with and blank filename updated taxa group script
function openExportModal() {
    document.getElementById('exporttaxafilename').value = "";
    document.getElementById('exportgroupscontent').value = createTaxaGroupScript();
}

//Creates taxa group script from taxa group array and returns it
function createTaxaGroupScript() {
    //taxa group script
    var taxagroupscript = [];
    //monophyletic group script
    var monphyleticgroupname = [];
    //Each taxa group
    for (var i = 0; i < taxaGroups.length; i++) {
        //checks if monophyletic is true
        if (taxaGroups[i].monophyletic === true) {
            monphyleticgroupname.push("taxaset_" + taxaGroups[i].name);
        }
        //Creates each taxa groups script with name and taxa
        var groups = [];
        //gets each taxa
        for (var j = 0; j < taxaGroups[i].taxa.length; j++) {
            var group = "\"" + taxaGroups[i].taxa[j] + "\"";
            groups.push(group);
        }
        //Pushes taxa group script to array
        var taxagroup = "taxaset_" + taxaGroups[i].name + " = clade(" + groups.join(", ") + ")";
        taxagroupscript.push(taxagroup);
    }
    //Create monophyletic group script if there are more than1 
    if (monphyleticgroupname.length > 0) {
        var monophyleticgroups = "\nmonophyl_constraints = v(" + monphyleticgroupname.join(", ") + ")";
        taxagroupscript.push(monophyleticgroups);
    }
    //Returns script
    return taxagroupscript.join("\n");
}

//Copies taxa group script from taxa group text area to user's clipboard
function copyTaxaGroupScript() {
    /* Get the text field */
    var copyText = document.getElementById('exportgroupscontent');

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");
}

//Downloads taxa group script with name from input box to users computer
function downloadTaxaGroupScript() {
    //Checks if filename is empty or not
    if ($("#exporttaxafilename").val() && /\S/.test($("#exporttaxafilename").val())) {
        downloadTaxaGroups(document.getElementById('exporttaxafilename').value, document.getElementById('exportgroupscontent').value);
    } else {
        downloadTaxaGroups("taxagroups", document.getElementById('exportgroupscontent').value);
    }
}

//Performs the download for the file in text file form
function downloadTaxaGroups(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

//Updates the data displayer
function updateDataDisplayer() {
    //TODO

}

//For debugging - Prints taxa group from taxa group array with given index
function printGroup(index) {
    console.log("Groupname: " + taxaGroups[index].name + " Taxa: " + taxaGroups[index].taxa + " M: " + taxaGroups[index].monophyletic);
}
