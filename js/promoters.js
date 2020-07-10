var currentPromoter = l1;

$('.jumbotron').on("click", '#createLeaderButton', function(){
    $('#title').html('Create a New Leader');
    cleanup();
    createPromoterModal();
    createLeaderDiv();
})

$('.jumbotron').on("click", '#createNormalPromoterButton', function(){
    $('#title').html('Create a New Promoter');
    cleanup();
    createNormalPromoterDiv();
})

$('.jumbotron').on("click", '#deletePromoterButton', function(){
    $('#title').html('Delete Promoter');
    cleanup();
    createPromoterModal();
    deletePromoterDiv();
})

$('.jumbotron').on("click", '#editExistingPromoterButton', function(){
    $('#title').html('Select Promoter to Edit');
    cleanup();
    promoterListPromoters(listOfPromoters, '.jumbotron', 'edit');
    $('<br/>',{}).appendTo('#listOfPromotersDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#listOfPromotersDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'promoterCancelButton', text : 'Cancel'}).appendTo('.btn-group');})

$('.jumbotron').on("click", '#assignParentsButton', function(){
    $('#title').html('Select Promoter for Assignment');
    cleanup();
    promoterListPromoters(listOfPromoters, '.jumbotron', 'assign');
    $('<br/>',{}).appendTo('#listOfPromotersDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#listOfPromotersDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'promoterCancelButton', text : 'Cancel'}).appendTo('.btn-group');})

$(".jumbotron").on("click", '#promoterCancelButton', function(){
    $('#title').text('Promoters Settings');
    cleanup();
    promoterMenu();
});

function createPromoterModal() {
    $('<div/>',{class : 'modal fade', id : 'promoterModal', tabindex : '-1', role : 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true'}).prependTo('body');
    $('<div/>',{class : 'modal-dialog'}).appendTo('#promoterModal');
    $('<div/>',{class : 'modal-content'}).appendTo('.modal-dialog');
    $('<div/>',{class : 'modal-header'}).appendTo('.modal-content');
    $('<h5/>',{class : 'modal-title', id: 'modalTitle', text: "Set State Leader"}).appendTo('.modal-header');
    $('<button/>',{type: 'button', class : 'close', 'data-dismiss': 'modal', 'aria-label': 'Close'}).appendTo('.modal-header');
    $('<span/>',{'aria-hidden': 'true', text: "x"}).appendTo('.close');
    $('<div/>',{class : 'modal-body', text: "Set as State Leader?"}).appendTo('.modal-content');
}

function promoterMenu() {
    $('<div/>',{class : 'container text-center list-container', id : 'promoterMenuDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'list-group', id: 'tier1'}).appendTo('#promoterMenuDiv');
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

function createLeaderDiv() {
    $('<div/>',{class : 'container', id : 'createLeaderDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#createLeaderDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Leader Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id: 'newLeaderName'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#createLeaderDiv');
    promoterListStates(listOfStates);
    $('<br/>',{}).appendTo('#createLeaderDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#createLeaderDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'promoterCancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'confirmCreateButton', text: 'Confirm'}).appendTo('.btn-group');
}

function createNormalPromoterDiv() {
    $('<div/>',{class : 'container', id : 'createNormalPromoterDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#createNormalPromoterDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'Leader Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id: 'newPromoterName'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#createNormalPromoterDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#createNormalPromoterDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'promoterCancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'confirmCreateButton', text: 'Confirm'}).appendTo('.btn-group');
}

function deletePromoterDiv() {
    $('<div/>',{class : 'container', id : 'deletePromoterDiv'}).appendTo('.jumbotron');
    promoterListPromoters(listOfPromoters, '#deletePromoterDiv', 'delete');
    $('<br/>',{}).appendTo('#deletePromoterDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#deletePromoterDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'promoterCancelButton', text : 'Cancel'}).appendTo('.btn-group');
}

function editExistingPromoterDiv() {
    $('<div/>',{class : 'container', id : 'editExistingPromoterDiv'}).appendTo('.jumbotron');
    $('<div/>',{class : 'input-group input-group-lg'}).appendTo('#editExistingPromoterDiv');
    $('<div/>',{class : 'input-group-prepend'}).appendTo('.input-group');
    $('<span/>',{class : 'input-group-text', id : 'inputGroup-sizing-lg', text : 'New Promoter Name:'}).appendTo('.input-group-prepend');
    $('<input/>',{type : 'text', class : 'form-control', id: 'newExistingPromoterName'}).appendTo('.input-group');
    $('<br/>',{}).appendTo('#editExistingPromoterDiv');
    promoterListPromoters(currentPromoter.getChildList(), '#editExistingPromoterDiv', 'delete');
    $('<br/>',{}).appendTo('#editExistingPromoterDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#editExistingPromoterDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'promoterCancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'confirmEditButton', text: 'Confirm'}).appendTo('.btn-group');
}

function assignParentsDiv() {
    promoterListPromoters(listOfPromoters, '.jumbotron', 'parent');
    $('<br/>',{}).appendTo('#assignParentsDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#assignParentsDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'promoterCancelButton', text : 'Cancel'}).appendTo('.btn-group');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', id : 'confirmAssignButton', text: 'Confirm'}).appendTo('.btn-group');
}

function promoterGenerateHandlerForState(stateName) {
    return function (event) {
        $('#modalTitle').text('Assign Leader of State');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to assign " + $('#newLeaderName').val() + ' as ' + stateName + "\'s leader?");
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelAssign', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmAssign', text: 'Assign'}).appendTo('#modalFooter');
    };
}

function promoterGenerateDeleteHandlerForPromoter(name) {
    return function (event) {
        $('#modalTitle').text('Delete Promoter');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to delete " + name + ' ?');
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelDelete', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmDelete', text: 'Remove'}).appendTo('#modalFooter');
    };
}

function promoterGenerateEditHandlerForPromoter(promoter) {
    return function (event) {
        $('#title').text('Edit Promoter (' + promoter.getPromoterName() + ')');
        cleanup();
        createPromoterModal();
        currentPromoter = promoter;
        editExistingPromoterDiv();
    }
}

function promoterGenerateAssignHandlerForPromoter(promoter) {
    return function (event) {
        $('#title').text('Choose Parent for ' + promoter.getPromoterName() + '');
        cleanup();
        createPromoterModal();
        currentPromoter = promoter;
        assignParentsDiv();
    }
}

function promoterGenerateParentHandlerForPromoter(item) {
    return function () {
        $('#modalTitle').text('Assign Parent');
        exists('modalFooter') ? $('#modalFooter').remove() : {};
        $('.modal-body').text("Are you sure you want to assign " + item.getPromoterName() + ' as ' + currentPromoter.getPromoterName() + '\' parent ?');
        $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
        $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelAssignParent', text: 'Cancel'}).appendTo('#modalFooter');
        $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmAssignParent', text: 'Yes'}).appendTo('#modalFooter');
    }
}

function promoterListPromoters(promoterList, div, mode, exclude) {
    $('<div/>',{class : 'container text-center', id : 'listOfPromotersDiv'}).appendTo(div);
    $('<div/>',{class : 'list-group'}).appendTo('#listOfPromotersDiv');
    if (mode === 'delete') {
        promoterList.forEach((item, i) => {
            if (item.getChildList().length === 0) {
                $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#promoterModal', id: 'promoter' + i, text: item.getPromoterName()}).appendTo('.list-group');
                $('#promoter' + i).click(promoterGenerateDeleteHandlerForPromoter(item.getPromoterName()));
            }
        });
    } else if (mode === 'edit') {
        promoterList.forEach((item, i) => {
            $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id: 'promoter' + i, text: item.getPromoterName()}).appendTo('.list-group');
            $('#promoter' + i).click(promoterGenerateEditHandlerForPromoter(item));
        });
    } else if (mode === 'assign') {// && item.getParent === 0
        promoterList.forEach((item, i) => {
            if (item.constructor.name !== "Leader" && item.getParent === 0) {
                $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id: 'promoter' + i, text: item.getPromoterName()}).appendTo('.list-group');
                $('#promoter' + i).click(promoterGenerateAssignHandlerForPromoter(item));
            }
        });
    } else if (mode === 'parent') {
        var exclude = [];
        State.getBranchFromParent(exclude, currentPromoter);
        promoterList.forEach((item, i) => {
            if (!exclude.includes(item)) {
                $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#promoterModal', id: 'promoter' + i, text: item.getPromoterName()}).appendTo('.list-group');
                $('#promoter' + i).click(promoterGenerateParentHandlerForPromoter(item));
            }
        });
    }
}

function promoterListStates(statesList) {
    $('<div/>',{class : 'container text-center', id : 'listOfStatesDiv'}).appendTo('#createLeaderDiv');
    $('<br/>',{}).appendTo('#listOfStatesDiv');
    $('<div/>',{class : 'list-group'}).appendTo('#listOfStatesDiv');
    statesList.forEach((item, i) => {
        $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', 'data-toggle' : 'modal', 'data-target' : '#promoterModal',  id: 'state' + i, text: item.getStateName()}).appendTo('.list-group');
        $('#state' + i).click(promoterGenerateHandlerForState(item.getStateName()));
    });
}
