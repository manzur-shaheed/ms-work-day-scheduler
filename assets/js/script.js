var dateTimeEl = $('#date-time');
var hrContainerEl = $('#hr-container');
// console.log(dateTimeEl);

// funtion to display time
function displayDate() {
    var now = moment().format('dddd MMM DD, YYYY');
    dateTimeEl.text(now);
}

// populate hours
function addHours() {
    var hr, hrText, rowDiv, rowID, hrDiv, txtArea, txtAreaID, btn;

    for (hr = 9; hr < 18; hr++) {
        hrText = moment(hr, "hh").format("hA");
        // <div id="hour-9" class="row time-block">
        // <div class="col-md-1 hour">
        //     9AM
        // </div>
        // <textarea class="col-md-10 description">
        // </textarea>
        // <button class="btn saveBtn col-md-1"><i class="fas fa-save"></i></button>
        // </div>

        // create tags per above and add to row
        rowID = "hour-" + hr.toString();
        rowDiv = $('<div>').addClass("row time-block");
        rowDiv = rowDiv.attr('id', rowID);
        hrDiv = $('<div>').addClass("col-md-1 hour").text(hrText);
        txtAreaID = "txt-" + hr.toString();
        txtArea = $('<textarea>').addClass("col-md-10");
        txtArea = txtArea.attr('id', txtAreaID);
        btn = $('<button>').addClass("btn saveBtn col-md-1 btn-outline-secondary").text('💾');
        rowDiv.append(hrDiv, txtArea, btn);

        // console.log(rowDiv);
        // add row to container
        hrContainerEl.append(rowDiv);
    }    
}

// load saved data
function loadSavedSchedule() {
    var hr, txtAreaID;

    for (hr = 9; hr < 18; hr++) {
        txtAreaID = "txt-" + hr.toString();
        $(txtAreaID).val(localStorage.getItem(txtAreaID));
    }
}

// update hour's color
function updateHourColor() {


}

// save schedule
function saveSchedule() {
    var schedTxt, txtAreaID;

    // get the ID and text of the textarea
    txtAreaID = $(this).siblings()[1].id;  
    schedTxt = $(txtAreaID).val();
    console.log(txtAreaID, schedTxt); 
}

// function docHandler
function docHandler() {
    displayDate();
    loadSavedSchedule();
    updateHourColor();
    $('.saveBtn').on('click', saveSchedule);
}

// invoke addHours on window load
$(window).on('load', addHours);

// once document is ready, update page and add event handler
$(document).ready(docHandler);
