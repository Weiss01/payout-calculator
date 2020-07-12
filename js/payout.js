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
    listPayouts(listOfPayouts, 'view');
});

$("body").on("click", '#payoutCancelButton', function(){
    $('#title').text('Payout Settings');
    currentState = '';
    currentLeader = '';
    currentPromoter = '';
    currentParent = '';
    currentMonth = '';
    currentPayout = '';
    cleanup();
    payoutMenu();
});

$("body").on("click", '#confirmCreatePayout', function(){
    currentMonth = $('#payoutMonthInput').val();
    $('#title').text('Enter Sales of ' + currentState.getStateName() + ' for ' + currentMonth);
    cleanup();
    createPayoutModal();
    enterSales();
});

$("body").on("click", '#confirmDeletePayout', function(){
    const index = listOfPayouts.indexOf(currentPayout);
    listOfPayouts.splice(index, 1);
    $('#modalTitle').text('Successful Deletion');
    exists('modalFooter') ? $('#modalFooter').remove() : {};
    $('.modal-body').text("Successfully deleted Payout");
    $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
    $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'payoutCancelButton', text: 'Okay'}).appendTo('#modalFooter');
    $('#payoutModal').modal('show');
});

$(".jumbotron").on("click", '#confirmSalesButton', function(){
    var list = [];
    var flag = true;
    currentState.getLeadersList().forEach((item, i) => {
        State.getBranchFromParent(list, item);
    });
    list.forEach((item, i) => {
        var temp = $('#' + item.getPromoterName().split(' ').join('') + 'Sales').val();
        if (temp === '') {
            $('#modalTitle').text('Empty Number of Sales');
            exists('modalFooter') ? $('#modalFooter').remove() : {};
            $('.modal-body').text("Number of Sales cannot be empty!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
            $('#payoutModal').modal('show');
            flag = false;
            return false;
        } else if (!isNum(temp)) {
            $('#modalTitle').text('Non-Numeric Number of Sales');
            exists('modalFooter') ? $('#modalFooter').remove() : {};
            $('.modal-body').text("Number of Sales must be numeric!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
            $('#payoutModal').modal('show');
            flag = false;
            return false;
        }
        item.setNumberOfSales(currentMonth, temp)
    });
    if (flag) {
        var payout = new Payout(currentState, currentMonth);
        listOfPayouts.push(payout);
        $('#modalTitle').text('Successful Creation');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Successfully created Payout of " + currentState.getStateName() + " for " + currentMonth);
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'payoutCancelButton', text: 'Okay'}).appendTo('#modalFooter');
        $('#payoutModal').modal('show');
    }
});

function payoutMenu() {
    $('<div/>',{class : 'container text-center list-container', id : 'payoutMenuDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'list-group'}).appendTo('#payoutMenuDiv');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'createPayoutButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Create a New Payout'}).appendTo('#createPayoutButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'deletePayoutButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Delete Payout'}).appendTo('#deletePayoutButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'viewPayoutButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'View Payout'}).appendTo('#viewPayoutButton');
}

function createPayoutModal() {
    $('<div/>',{class : 'modal', id : 'payoutModal', tabindex : '-1', role : 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true'}).prependTo('body');
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

function generateTableHtml(table) {
    $('<table/>', {class: 'table table-bordered table-dark', id: 'tableDiv'}).appendTo('.jumbotron');
    $('<thead/>', {class: 'thead-dark'}).appendTo('#tableDiv');
    $('<tr/>', {id: 'tableDivHeader'}).appendTo('thead');
    $('<tbody/>', {id: 'tableDivBody'}).appendTo('#tableDiv');
    for (var i = 0; i < table[0].length - 4; i++) { $('<th/>', {scope: 'col'}).appendTo('#tableDivHeader'); }
    $('<th/>', {scope: 'col', text: 'Sales'}).appendTo('#tableDivHeader');
    $('<th/>', {scope: 'col', text: 'Sales x4'}).appendTo('#tableDivHeader');
    $('<th/>', {scope: 'col', text: 'Commision'}).appendTo('#tableDivHeader');
    $('<th/>', {scope: 'col', text: 'Total'}).appendTo('#tableDivHeader');
    table.forEach((row, i) => {
        $('<tr/>', {id: 'bodyRow'+i}).appendTo('#tableDivBody');
        row.forEach((item, j) => {
            if (j >= row.length - 3){
                if (Number(item) === 0) {
                    $('<td/>', {text: '---'}).appendTo('#bodyRow'+i);
                } else {
                    $('<td/>', {text: 'RM'+Number(item).toFixed(2)}).appendTo('#bodyRow'+i);
                }
            } else {
                $('<td/>', {text: item}).appendTo('#bodyRow'+i);
            }
        });
    });
}

function payoutGenerateDeleteHandlerForPayout(payout) {
    return function (event) {
        currentPayout = payout;
        $('#modalTitle').text('Delete Payout');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to delete " + payout.getMonth() + '\'s payout?');
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelDeletePayout', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmDeletePayout', text: 'Delete'}).appendTo('#modalFooter');
    }
}

function payoutGenerateViewHandlerForPayout(payout) {
    return function (event) {
        currentPayout = payout;
        $('#title').text(payout.getMonth() + ' - ' + payout.getState().getStateName());
        cleanup();
        var table = new Table(payout);
        generateTableHtml(table.getTableData());
        $('<div/>', {class: 'container', id: 'viewButtons'}).appendTo('.jumbotron');
        $('<div/>', {class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#viewButtons');
        $('<button/>', {type : 'button', class : 'btn btn-secondary', id : 'payoutCancelButton', text : 'Cancel'}).appendTo('.btn-group');
    }
}

function listPayouts(payoutList, mode) {
    $('<div/>',{class : 'container text-center', id : 'listOfPayoutsDiv'}).appendTo('.jumbotron');
    $('<br/>',{}).appendTo('#listOfPayoutsDiv');
    $('<div/>',{class : 'list-group'}).appendTo('#listOfPayoutsDiv');
    if (mode === 'delete'){
        payoutList.forEach((item, i) => {
            $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#payoutModal',  id: 'payout' + i, text: item.getMonth() + ' - ' + item.getState().getStateName()}).appendTo('.list-group');
            $('#payout' + i).click(payoutGenerateDeleteHandlerForPayout(item));
        });
    } else if (mode === 'view'){
        payoutList.forEach((item, i) => {
            $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id: 'payout' + i, text: item.getMonth() + ' - ' + item.getState().getStateName()}).appendTo('.list-group');
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
        $('<input/>', {type: 'text', class: 'form-control', id: item.getPromoterName().split(' ').join('') + 'Sales', 'aria-label': 'Sizing example input', 'aria-describedby': 'inputGroup-sizing-lg'}).appendTo('#promoter' + i)
    });
}

function payoutGenerateHandlerForState(state) {
    return function (event) {
        if ($('#payoutMonthInput').val() === "") {
            $('#modalTitle').text('Empty Payout Title');
            exists('modalFooter') ? $('#modalFooter').remove() : {};
            $('.modal-body').text("Payout Title cannot be empty!");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        } else {
            currentState = state;
            $('#modalTitle').text('Create Payout');
            exists('modalFooter') ? $('#modalFooter').remove() : {};
            $('.modal-body').text("Are you sure you want to create a " + $('#payoutMonthInput').val() + " payout for " + state.getStateName() + "?");
            $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
            $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelCreatePayout', text: 'Cancel'}).appendTo('#modalFooter');
            $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmCreatePayout', text: 'Create'}).appendTo('#modalFooter');
        }
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
