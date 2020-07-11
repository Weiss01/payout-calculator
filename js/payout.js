var currentState;
var currentMonth;
var currentPayout;

$(".jumbotron").on("click", '#createPayoutButton', function(){
    $('#title').text('Create a New Payout');
    cleanup();
    createPayoutModal();
    createPayoutDiv();
});

$(".jumbotron").on("click", '#deletePayoutButton', function(){
    $('#title').text('Delete Payout');
    cleanup();
    createPayoutModal();
    deletePayoutDiv();
});

$(".jumbotron").on("click", '#viewPayoutButton', function(){
    $('#title').text('View Payout');
    cleanup();
    // viewPayoutDiv();
});

$(".jumbotron").on("click", '#payoutCancelButton', function(){
    $('#title').text('Payout Settings');
    cleanup();
    payoutMenu();
});

$("body").on("click", '#confirmCreatePayout', function(){
    currentMonth = $('#payoutMonthInput').val();
    $('#title').text('Enter Sales of ' + currentState.getStateName() + ' for ' + currentMonth);
    cleanup();
    enterSales();
});

function payoutMenu() {
    $('<div/>',{class : 'container text-center list-container', id : 'payoutMenuDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'list-group'}).appendTo('#payoutMenuDiv');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'createPayoutButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Create a New Payout'}).appendTo('#createPayoutButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'deletePayoutButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Edit Existing Payout'}).appendTo('#deletePayoutButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'viewPayoutButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'View Payout'}).appendTo('#viewPayoutButton');
}

function createPayoutModal() {
    $('<div/>',{class : 'modal fade', id : 'payoutModal', tabindex : '-1', role : 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true'}).prependTo('body');
    $('<div/>',{class : 'modal-dialog'}).appendTo('#payoutModal');
    $('<div/>',{class : 'modal-content'}).appendTo('.modal-dialog');
    $('<div/>',{class : 'modal-header'}).appendTo('.modal-content');
    $('<h5/>',{class : 'modal-title', id: 'modalTitle', text: "Promoter Removal"}).appendTo('.modal-header');
    $('<button/>',{type: 'button', class : 'close', 'data-dismiss': 'modal', 'aria-label': 'Close'}).appendTo('.modal-header');
    $('<span/>',{'aria-hidden': 'true', text: "x"}).appendTo('.close');
    $('<div/>',{class : 'modal-body', text: "A"}).appendTo('.modal-content');
}

function createPayoutDiv() {
    $('<div/>',{class : 'container', id : 'createPayoutDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#createPayoutDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Month:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id: 'payoutMonthInput'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#createPayoutDiv');
    payoutListStates(listOfStates);
    $('<br/>',{}).appendTo('#createPayoutDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#createPayoutDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'payoutCancelButton', text : 'Cancel'}).appendTo('.btn-group');
}

function enterSales() {
    var list = [];
    currentState.getLeadersList().forEach((item, i) => {
        State.getBranchFromParent(list, item);
    });
    payoutListPromoters(list);
    $('<br/>',{}).appendTo('#enterSalesDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#enterSalesDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'payoutCancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'confirmSalesButton', text : 'Confirm'}).appendTo('.btn-group');
}

function deletePayoutDiv() {
    listPayouts(listOfPayouts, 'delete');
    $('<br/>',{}).appendTo('#listOfPayoutsDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#listOfPayoutsDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'payoutCancelButton', text : 'Cancel'}).appendTo('.btn-group');
}

function payoutGenerateDeleteHandlerForPayout(payoutMonth) {
    return function (event) {
        $('#modalTitle').text('Delete Payout');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to delete " + payoutMonth + '\'s payout?');
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelDeletePayout', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmDeletePayout', text: 'Delete'}).appendTo('#modalFooter');
    }
}

function payoutGenerateViewHandlerForPayout() {

}

function listPayouts(payoutList, mode) {
    $('<div/>',{class : 'container text-center', id : 'listOfPayoutsDiv'}).appendTo('.jumbotron');
    $('<br/>',{}).appendTo('#listOfPayoutsDiv');
    $('<div/>',{class : 'list-group'}).appendTo('#listOfPayoutsDiv');
    if (mode === 'delete'){
        payoutList.forEach((item, i) => {
            $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#payoutModal',  id: 'payout' + i, text: item.getMonth()}).appendTo('.list-group');
            $('#payout' + i).click(payoutGenerateDeleteHandlerForPayout(item.getMonth()));
        });
    } else if (mode === 'view'){
        payoutList.forEach((item, i) => {
            $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id: 'payout' + i, text: item.getMonth()}).appendTo('.list-group');
            $('#payout' + i).click(payoutGenerateViewHandlerForPayout(item));
        });
    }
}

function payoutListPromoters(promoterList) {
    $('<div/>',{class : 'container enterSalesDiv', id : 'enterSalesDiv'}).appendTo('.jumbotron');
    promoterList.forEach((item, i) => {
        $('<div/>',{class : 'input-group input-group-lg payoutInputGroup', id: 'promoter' + i}).appendTo('#enterSalesDiv');
        $('<div/>',{class : 'input-group-prepend', id: 'promoterPrepend' + i}).appendTo('#promoter' + i);
        $('<span/>',{text: item.getPromoterName(), class : 'input-group-text payoutSalesText', id: 'inputGroup-sizing-lg'}).appendTo('#promoterPrepend' + i);
        $('<input/>', {type: 'text', class: 'form-control', id: item.getPromoterName().replace(' ', '') + 'Sales', 'aria-label': 'Sizing example input', 'aria-describedby': 'inputGroup-sizing-lg'}).appendTo('#promoter' + i)
    });
}

function payoutGenerateHandlerForState(state) {
    return function (event) {
        currentState = state;
        $('#modalTitle').text('Create Payout');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to create a " + $('#payoutMonthInput').val() + " payout for " + state.getStateName() + "?");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelCreatePayout', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmCreatePayout', text: 'Create'}).appendTo('#modalFooter');
    };
}

function payoutListStates(statesList) {
    $('<div/>',{class : 'container text-center', id : 'listOfStatesDiv'}).appendTo('#createPayoutDiv');
    $('<br/>',{}).appendTo('#listOfStatesDiv');
    $('<div/>',{class : 'list-group'}).appendTo('#listOfStatesDiv');
    statesList.forEach((item, i) => {
        $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#payoutModal',  id: 'state' + i, text: item.getStateName()}).appendTo('.list-group');
        $('#state' + i).click(payoutGenerateHandlerForState(item));
    });
}
