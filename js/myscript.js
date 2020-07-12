// var listOfStates = [];
// var listOfPayouts = [];
// var listOfPromoters = []; // for easy access to get salesNumber
var currentState = '';
var currentLeader = '';
var currentPromoter = '';
var currentParent = '';
var currentMonth = '';
var currentPayout = '';

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

$(".jumbotron").on("click", '#payoutButton', function(){
    $('#title').html('Payout Settings');
    cleanup();
    payoutMenu();
})

function exists(id) {if (document.getElementById(id) === null) {return false;} else {return true;}}

function isNum(val) { return /^\d+$/.test(val); }

function cleanup() {
    // currentState = '';
    // currentLeader = '';
    // currentPromoter = '';
    exists('payoutModal') ? $('#payoutModal').modal('dispose') : {};
    exists('stateModal') ? $('#stateModal').modal('dispose') : {};
    exists('promoterModal') ? $('#promoterModal').modal('dispose') : {};
    exists('viewButtons') ? $('#viewButtons').remove() : {};
    exists('tableDiv') ? $('#tableDiv').remove() : {};
    exists('listOfPayoutsDiv') ? $('#listOfPayoutsDiv').remove() : {};
    exists('createPayoutDiv') ? $('#createPayoutDiv').remove() : {};
    exists('enterSalesDiv') ? $('#enterSalesDiv').remove() : {};
    exists('payoutMenuDiv') ? $('#payoutMenuDiv').remove() : {};
    exists('mainMenuDiv') ? $('#mainMenuDiv').remove() : {};
    exists('listOfStatesDiv') ? $('#listOfStatesDiv').remove() : {};
    exists('stateModal') ? $('#stateModal').remove() : {};
    exists('payoutModal') ? $('#payoutModal').remove() : {};
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
