var listOfStates = [];
var listOfTables = [];
var listOfPromoters = []; // for easy access to get salesNumber

function exists(id) {if (document.getElementById(id) === null) {return false;} else {return true;}}

function mainMenu() {
    $('<div/>',{class : 'container text-center list-container', id : 'menuDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'list-group', id: 'tier1'}).appendTo('#menuDiv');
    $('<ul/>', {class : 'list-group list-group-horizontal'}).appendTo('.list-group');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'createLeaderButton'}).appendTo('ul');
    $('<strong/>',{text : 'Create Leader'}).appendTo('#createLeaderButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'createNormalPromoterButton'}).appendTo('ul');
    $('<strong/>',{text : 'Create Normal Promoter'}).appendTo('#createNormalPromoterButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'deletePromoterButton'}).appendTo('#tier1');
    $('<strong/>',{text : 'Delete Promoter'}).appendTo('#deletePromoterButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'editExistingPromoterButton'}).appendTo('#tier1');
    $('<strong/>',{text : 'Edit Existing Promoter'}).appendTo('#editExistingPromoterButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'assignParentsButton'}).appendTo('#tier1');
    $('<strong/>',{text : 'Assign Parents'}).appendTo('#assignParentsButton');
}
