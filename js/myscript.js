var listOfStates = [];
var listOfPayouts = [];
var listOfPromoters = [];
var currentState = '';
var currentLeader = '';
var currentPromoter = '';
var currentParent = '';
var currentMonth = '';
var currentPayout = '';
var currentFile = '';

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});

$("body").on("click", '#homeButton', function(){
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

$(".jumbotron").on("click", '#exportButton', function(){
    var stateRelation = new JsonStateRelation();
    var promoterRelation = new JsonPromoterRelation();
    var listOfJsonStates = [];
    var listOfJsonPromoters = [];
    var listOfJsonPayouts = [];
    var my_obj = {}
    listOfStates.forEach((item) => {
        var temp = new JsonState(item);
        listOfJsonStates.push(temp);
        stateRelation.expand(item);
    });
    listOfPromoters.forEach((item) => {
        var temp = new JsonPromoter(item);
        listOfJsonPromoters.push(temp);
        promoterRelation.expand(item);
    });
    listOfPayouts.forEach((item) => {
        var temp = new JsonPayout(item);
        listOfJsonPayouts.push(temp);
    });
    my_obj['states'] = listOfJsonStates;
    my_obj['promoters'] = listOfJsonPromoters;
    my_obj['payouts'] = listOfJsonPayouts;
    my_obj['stateRelation'] = stateRelation;
    my_obj['promoterRelation'] = promoterRelation;
    downloadObjectAsJson(my_obj, 'my_obj');
})

$(".jumbotron").on("click", '#importButton', function(){
    $('#title').html('Choose JSON file to import');
    cleanup();
    createMainModal();
    importDiv();
})

$(".jumbotron").on("change", '#inputFile', function(event){
    currentFile = event.target.files[0];
    $(".custom-file-label").text(currentFile.name);
    exists('alertDiv') ? $('#alertDiv').remove() : {};
    $('<div/>', {id: 'alertDiv'}).appendTo('#importDiv');
    $('<br/>', {}).appendTo('#alertDiv');
    $('<div/>', {id: 'alert-bar', class: 'alert alert-primary', role: 'alert', text: "File Name: " + currentFile.name + ", File Type: " + currentFile.type + ", File Size: " + currentFile.size + "kB"}).appendTo('#alertDiv');
    $('<br/>', {}).appendTo('#importDiv');
    $('<div/>',{class : 'btn-group btn-group-lg right', role : 'group'}).appendTo('#importDiv');
    $('<button/>',{type : 'button', class : 'btn btn-secondary', 'data-toggle' : 'modal', 'data-target' : '#mainModal', id : 'importButton', text : 'Import'}).appendTo('.btn-group');
})

$(".jumbotron").on("click", '#importButton', function(){
    $('#modalTitle').text('Import File');
    exists('modalFooter') ? $('#modalFooter').remove() : {};
    $('.modal-body').text("Are you sure you want to import " + currentFile.name + '?');
    $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
    $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'cancelImport', text: 'Cancel'}).appendTo('#modalFooter');
    $('<button/>',{type: 'button', class : 'btn btn-primary', 'data-dismiss': 'modal', id: 'confirmImport', text: 'Import'}).appendTo('#modalFooter');
})

$("body").on("click", '#confirmImport', function(){
    readFileAsString(currentFile);
    $('#modalTitle').text('Successful Import');
    exists('modalFooter') ? $('#modalFooter').remove() : {};
    $('.modal-body').text("Successfully imported " + currentFile.name);
    $('<div/>',{class : 'modal-footer', id: 'modalFooter'}).appendTo('.modal-content');
    $('<button/>',{type: 'button', class : 'btn btn-secondary', 'data-dismiss': 'modal', id: 'homeButton', text: 'Okay'}).appendTo('#modalFooter');
    $('#mainModal').modal('show');
})

function readFileAsString(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
        console.log("Finished Reading");
        var obj = JSON.parse(event.target.result);
        console.log(obj);
        obj['states'].forEach((item) => {
            var temp = new State();
            temp.build(item, obj['stateRelation'], obj['promoterRelation']);
            listOfStates.push(temp);
        });
        obj['promoters'].forEach((item) => {
            var temp;
            if (item.type === "Leader") {
                temp = new Leader();
                temp.build(item, obj['stateRelation'], obj['promoterRelation']);
            } else if (item.type === "CasualPromoter") {
                temp = new CasualPromoter();
                temp.build(item, obj['promoterRelation']);
            }
            listOfPromoters.push(temp);
        });
        obj['payouts'].forEach((item) => {
            var temp = new Payout('convertion');
            temp.build(item, obj['stateRelation'], obj['promoterRelation']);
            listOfPayouts.push(temp);
        });

    };
    reader.readAsText(file);
}

function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function exists(id) {if (document.getElementById(id) === null) {return false;} else {return true;}}

function isNum(val) { return /^\d+$/.test(val); }

function cleanup() {
    exists('payoutModal') ? $('#payoutModal').modal('dispose') : {};
    exists('mainModal') ? $('#mainModal').modal('dispose') : {};
    exists('stateModal') ? $('#stateModal').modal('dispose') : {};
    exists('promoterModal') ? $('#promoterModal').modal('dispose') : {};
    exists('viewButtons') ? $('#viewButtons').remove() : {};
    exists('importDiv') ? $('#importDiv').remove() : {};
    exists('tableDiv') ? $('#tableDiv').remove() : {};
    exists('alert-bar') ? $('#alert-bar').remove() : {};
    exists('listOfPayoutsDiv') ? $('#listOfPayoutsDiv').remove() : {};
    exists('createPayoutDiv') ? $('#createPayoutDiv').remove() : {};
    exists('enterSalesDiv') ? $('#enterSalesDiv').remove() : {};
    exists('payoutMenuDiv') ? $('#payoutMenuDiv').remove() : {};
    exists('mainMenuDiv') ? $('#mainMenuDiv').remove() : {};
    exists('listOfStatesDiv') ? $('#listOfStatesDiv').remove() : {};
    exists('stateModal') ? $('#stateModal').remove() : {};
    exists('mainModal') ? $('#mainModal').remove() : {};
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

function createMainModal() {
    $('<div/>',{class : 'modal', id : 'mainModal', tabindex : '-1', role : 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true'}).prependTo('body');
    $('<div/>',{class : 'modal-dialog'}).appendTo('#mainModal');
    $('<div/>',{class : 'modal-content'}).appendTo('.modal-dialog');
    $('<div/>',{class : 'modal-header'}).appendTo('.modal-content');
    $('<h5/>',{class : 'modal-title', id: 'modalTitle', text: "State"}).appendTo('.modal-header');
    $('<button/>',{type: 'button', class : 'close', 'data-dismiss': 'modal', 'aria-label': 'Close'}).appendTo('.modal-header');
    $('<span/>',{'aria-hidden': 'true', text: "x"}).appendTo('.close');
    $('<div/>',{class : 'modal-body', text: "A"}).appendTo('.modal-content');
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
    $('<br/>',{}).appendTo('.list-group');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'exportButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Export'}).appendTo('#exportButton');
    $('<button/>',{type : 'button', class : 'list-group-item list-group-item-action', id : 'importButton'}).appendTo('.list-group');
    $('<strong/>',{text : 'Import'}).appendTo('#importButton');
}

function importDiv() {
    $('<div/>', {id: 'importDiv'}).appendTo('.jumbotron');
    $('<div/>', {class: 'input-group', id: 'inputGroup'}).appendTo('#importDiv');
    $('<div/>', {class: 'custom-file',}).appendTo('#inputGroup');
    $('<input/>', {type: 'file', class: 'custom-file-input', id: 'inputFile', 'aria-describedby': 'inputFileAddon', accept:'.json'}).appendTo('.custom-file');
    $('<label/>', {class: 'custom-file-label', for:'inputFile', text: 'Choose file'}).appendTo('.custom-file');
}
