var listOfStates;
var listOfTables;
var listOfPromoters; // for easy access to get salesNumber

$(".navbar").on("click", '#homeButton', function(){
    $('#title').html('Payout System');
    cleanup();
    mainMenu();
})

$(".jumbotron").on("click", '#stateButton', function(){
    $('#title').html('State Settings');
    cleanup();
    stateMenu();
})

$(".jumbotron").on("click", '#promoterButton', function(){
    $('#title').html('Promoter Settings');
    cleanup();
    promoterMenu();
})

function exists(id) {if (document.getElementById(id) === null) {return false;} else {return true;}}

function cleanup() {
    exists('mainMenuDiv') ? $('#mainMenuDiv').remove() : {};
    exists('listOfStatesDiv') ? $('#listOfStatesDiv').remove() : {};
    exists('stateModal') ? $('#stateModal').remove() : {};
    exists('stateMenuDiv') ? $('#stateMenuDiv').remove() : {};
    exists('createStateDiv') ? $('#createStateDiv').remove() : {};
    exists('editStateDiv') ? $('#editStateDiv').remove() : {};
    exists('listOfPromotersDiv') ? $('#listOfPromotersDiv').remove() : {};
    exists('promoterMenuDiv') ? $('#promoterMenuDiv').remove() : {};
    exists('promoterModal') ? $('#promoterModal').remove() : {};
    exists('createLeaderDiv') ? $('#createLeaderDiv').remove() : {};
    exists('createNormalPromoterDiv') ? $('#createNormalPromoterDiv').remove() : {};
    exists('deletePromoterDiv') ? $('#deletePromoterDiv').remove() : {};
    exists('editExistingPromoterDiv') ? $('#editExistingPromoterDiv').remove() : {};
}

function mainMenu() {
    $('#title').text("Payout System");
    $('<div/>',{class : 'container text-center list-container', id : 'mainMenuDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'list-group'}).appendTo('#mainMenuDiv');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'stateButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'State'}).appendTo('#stateButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'promoterButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Promoter'}).appendTo('#promoterButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'payoutButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Payout'}).appendTo('#payoutButton');
}
