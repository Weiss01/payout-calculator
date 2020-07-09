const editStateButton = $("#editStateButton");
var currentState = '';

$(".jumbotron").on("click", '#createStateButton', function(){
    $('#title').html('Create a New State');
    cleanup();
    createStateDiv();
})

$(".jumbotron").on("click", '#editStateButton', function(){
    $('#title').text('Edit Existing State');
    cleanup();
    listStates(listOfStates);
})

$(".jumbotron").on("click", '#cancelButton', function(){
    $('#title').text('States Settings');
    cleanup();
    menu();
});

function cleanup() {
    exists('listOfStatesDiv') ? $('#listOfStatesDiv').remove() : {};
    exists('stateModal') ? $('#stateModal').remove() : {};
    exists('menuDiv') ? $('#menuDiv').remove() : {};
    exists('createStateDiv') ? $('#createStateDiv').remove() : {};
    exists('editStateDiv') ? $('#editStateDiv').remove() : {};
    exists('listOfPromotersDiv') ? $('#listOfPromotersDiv').remove() : {};
}

function exists(id) {if (document.getElementById(id) === null) {return false;} else {return true;}}

function createStateDiv(){
    $('<div/>',{class : 'container', id : 'createStateDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#createStateDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'State Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#createStateDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#createStateDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'cancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'confirmCreateButton', text: 'Confirm'}).appendTo('.btn-group');
}

function editStateDiv(promoterList) {
    $('<div/>',{class : 'container', id : 'editStateDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#editStateDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'New State Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', placeholder : '<Leave blank if no change is required>'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#editStateDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#editStateDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'cancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'confirmEditButton', text: 'Confirm'}).appendTo('.btn-group');
    $('<br/>',{}).appendTo('#editStateDiv');
    listPromoters(promoterList);
}

function menu() {
    $('<div/>',{class : 'container text-center list-container', id : 'menuDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'list-group'}).appendTo('#menuDiv');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'createStateButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Create a New State'}).appendTo('#createStateButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'editStateButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Edit Existing State'}).appendTo('#editStateButton');
}

function createModal() {
    $('<div/>',{class : 'modal fade', id : 'stateModal', tabindex : '-1', role : 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true'}).prependTo('body');
    $('<div/>',{class : 'modal-dialog'}).appendTo('#stateModal');
    $('<div/>',{class : 'modal-content'}).appendTo('.modal-dialog');
    $('<div/>',{class : 'modal-header'}).appendTo('.modal-content');
    $('<h5/>',{class : 'modal-title', id: 'modalTitle', text: "Promoter Removal"}).appendTo('.modal-header');
    $('<button/>',{type: 'button', class : 'close', 'data-dismiss': 'modal', 'aria-label': 'Close'}).appendTo('.modal-header');
    $('<span/>',{'aria-hidden': 'true', text: "x"}).appendTo('.close');
    $('<div/>',{class : 'modal-body', text: "A"}).appendTo('.modal-content');
}

function generateHandlerForPromoter(name) {
    return function (event) {
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to remove " + name + ' from ' + currentState + "?");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelRemove', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmRemove', text: 'Remove'}).appendTo('#modalFooter');
    };
}

function listPromoters(promoterList) {
    $('<div/>',{class : 'container text-center', id : 'listOfPromotersDiv'}).appendTo('.jumbotron');
    $('<br/>',{}).appendTo('#listOfPromotersDiv');
    $('<br/>',{}).appendTo('#listOfPromotersDiv');
    $('<div/>',{class : 'list-group'}).appendTo('#listOfPromotersDiv');
    promoterList.forEach((item, i) => {
        $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#stateModal',  id: 'promoter' + i, text: item.getPromoterName()}).appendTo('.list-group');
        $('#promoter' + i).click(generateHandlerForPromoter(item.getPromoterName()));
    });
}

function generateHandlerForStates(state) {
    return function (event) {
        cleanup();
        currentState = state;
        createModal();
        var list = State.getListofPromoters(currentState, currentState.getLeadersList());
        editStateDiv(list);
    }
}

function listStates(stateList) {
    $('<div/>',{class : 'container text-center', id : 'listOfStatesDiv'}).appendTo('.jumbotron');
    $('<br/>',{}).appendTo('#listOfStatesDiv');
    $('<div/>',{class : 'list-group'}).appendTo('#listOfStatesDiv');
    stateList.forEach((item, i) => {
        $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id: 'state' + i, text: item.getStateName()}).appendTo('.list-group');
        $('#state' + i).click(generateHandlerForStates(item));
    });
}
