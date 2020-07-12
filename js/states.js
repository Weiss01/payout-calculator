$(".jumbotron").on("click", '#createStateButton', function(){
    $('#title').html('Create a New State');
    cleanup();
    createStateModal();
    createStateDiv();
})

$(".jumbotron").on("click", '#editStateButton', function(){
    $('#title').text('Select State to Edit');
    cleanup();
    createStateModal();
    stateListStates(listOfStates, 'edit');
    $('<br/>',{}).appendTo('#listOfStatesDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#listOfStatesDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'stateCancelButton', text : 'Cancel'}).appendTo('.btn-group');
})

$(".jumbotron").on("click", '#deleteStateButton', function(){
    $('#title').text('Select State to Delete');
    cleanup();
    createStateModal();
    stateListStates(listOfStates, 'delete');
    $('<br/>',{}).appendTo('#listOfStatesDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#listOfStatesDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'stateCancelButton', text : 'Cancel'}).appendTo('.btn-group');
})

$('body').on("click", '#stateCancelButton', function(){
    $('#title').text('States Settings');
    currentState = '';
    currentLeader = '';
    currentPromoter = '';
    currentParent = '';
    currentMonth = '';
    currentPayout = '';
    cleanup();
    stateMenu();
});

$('.jumbotron').on("click", '#stateConfirmCreateButton', function(){
    var newStateName = $('#newStateName').val();
    if (newStateName.length === 0) {
        $('#modalTitle').text('Enter a Name');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("State Name cannot be empty!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        $('#stateModal').modal('show');
    } else {
        var state = new State(newStateName);
        listOfStates.push(state);
        $('#modalTitle').text('Successful Creation');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Successfully created a new state, " + newStateName);
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'stateCancelButton', text: 'Okay'}).appendTo('#modalFooter');
        $('#stateModal').modal('show');
    }
});

$('.jumbotron').on("click", '#stateConfirmEditButton', function(){
    // $('#modalTitle').text('Edit State');
    var newStateName = $('#newStateName').val();
    if (newStateName.length === 0) {
        $('#modalTitle').text('Enter a Name');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("State Name cannot be empty!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        $('#stateModal').modal('show');
    } else {
        currentState.setStateName(newStateName);
        $('#modalTitle').text('Successful Edit');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Successfully changed state name to " + newStateName);
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'stateCancelButton', text: 'Okay'}).appendTo('#modalFooter');
        $('#stateModal').modal('show');
    }
});

$('body').on("click", '#confirmRemoveState', function(){
    if (currentLeader.getChildList().length == 0) {
        $('#stateModal').modal('dispose');
        $('.modal-backdrop').css('display', 'none');
        currentState.removeLeader(currentLeader);
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Successfully removed leader from state!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'stateCancelButton', text: 'Okay'}).appendTo('#modalFooter');
        $('#stateModal').modal('show');
    } else {
        $('#stateModal').modal('dispose');
        $('.modal-backdrop').css('display', 'none');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("This leader still have subordinates! Please remove the subordinates before removing this leader.");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        $('#stateModal').modal('show');
    }
});

$('body').on("click", '#confirmDeleteState', function(){
    if (currentState.getLeadersList().length == 0) {
        $('#stateModal').modal('dispose');
        $('.modal-backdrop').css('display', 'none');
        const index = listOfStates.indexOf(currentState);
        listOfStates.splice(index, 1);
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Successfully deleted state!");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'stateCancelButton', text: 'Okay'}).appendTo('#modalFooter');
        $('#stateModal').modal('show');
    } else {
        $('#stateModal').modal('dispose');
        $('.modal-backdrop').css('display', 'none');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("This state still have leaders! Please remove the leaders before deleting this state");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'okay', text: 'Okay'}).appendTo('#modalFooter');
        $('#stateModal').modal('show');
    }
});

function createStateDiv(){
    $('<div/>',{class : 'container', id : 'createStateDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#createStateDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'State Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id : 'newStateName'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#createStateDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#createStateDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'stateCancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'stateConfirmCreateButton', text: 'Confirm'}).appendTo('.btn-group');
}

function editStateDiv(promoterList) {
    $('<div/>',{class : 'container', id : 'editStateDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#editStateDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'New State Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id:'newStateName', placeholder : '<Leave blank if no change is required>'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#editStateDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#editStateDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'stateCancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'stateConfirmEditButton', text: 'Confirm'}).appendTo('.btn-group');
    $('<br/>',{}).appendTo('#editStateDiv');
    stateListPromoters(promoterList);
}

function stateMenu() {
    $('<div/>',{class : 'container text-center list-container', id : 'stateMenuDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'list-group'}).appendTo('#stateMenuDiv');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'createStateButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Create a New State'}).appendTo('#createStateButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'editStateButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Edit Existing State'}).appendTo('#editStateButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'deleteStateButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Delete State'}).appendTo('#deleteStateButton');
}

function createStateModal() {
    $('<div/>',{class : 'modal', id : 'stateModal', tabindex : '-1', role : 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true'}).prependTo('body');
    $('<div/>',{class : 'modal-dialog'}).appendTo('#stateModal');
    $('<div/>',{class : 'modal-content'}).appendTo('.modal-dialog');
    $('<div/>',{class : 'modal-header'}).appendTo('.modal-content');
    $('<h5/>',{class : 'modal-title', id: 'modalTitle', text: "State"}).appendTo('.modal-header');
    $('<button/>',{type: 'button', class : 'close', 'data-dismiss': 'modal', 'aria-label': 'Close'}).appendTo('.modal-header');
    $('<span/>',{'aria-hidden': 'true', text: "x"}).appendTo('.close');
    $('<div/>',{class : 'modal-body', text: "A"}).appendTo('.modal-content');
}

function stateGenerateHandlerForPromoter(leader) {
    return function (event) {
        currentLeader = leader;
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to remove " + leader.getPromoterName() + ' from ' + currentState.getStateName() + "?");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelRemove', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmRemoveState', text: 'Remove'}).appendTo('#modalFooter');
    };
}

function stateListPromoters(promoterList) {
    $('<div/>',{class : 'container text-center', id : 'listOfPromotersDiv'}).appendTo('.jumbotron');
    $('<br/>',{}).appendTo('#listOfPromotersDiv');
    $('<br/>',{}).appendTo('#listOfPromotersDiv');
    $('<div/>',{class : 'list-group'}).appendTo('#listOfPromotersDiv');
    promoterList.forEach((item, i) => {
        $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#stateModal',  id: 'promoter' + i, text: item.getPromoterName()}).appendTo('.list-group');
        $('#promoter' + i).click(stateGenerateHandlerForPromoter(item));
    });
}

function stateGenerateEditHandlerForStates(state) {
    return function (event) {
        $('#title').text('Edit State Name or Remove Leaders');
        cleanup();
        currentState = state;
        createStateModal();
        editStateDiv(currentState.getLeadersList());
    }
}

function stateGenerateDeleteHandlerForStates(state) {
    return function (event) {
        currentState = state;
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to delete " + state.getStateName() + "?");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelDelete', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmDeleteState', text: 'Delete'}).appendTo('#modalFooter');
    };
}

function stateListStates(stateList, mode) {
    $('<div/>',{class : 'container text-center', id : 'listOfStatesDiv'}).appendTo('.jumbotron');
    $('<br/>',{}).appendTo('#listOfStatesDiv');
    $('<div/>',{class : 'list-group'}).appendTo('#listOfStatesDiv');
    if (mode === 'edit') {
        stateList.forEach((item, i) => {
            $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id: 'state' + i, text: item.getStateName()}).appendTo('.list-group');
            $('#state' + i).click(stateGenerateEditHandlerForStates(item));
        });
    } else if (mode === 'delete') {
        stateList.forEach((item, i) => {
            $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#stateModal',  id: 'state' + i, text: item.getStateName()}).appendTo('.list-group');
            $('#state' + i).click(stateGenerateDeleteHandlerForStates(item));
        });
    }

}
