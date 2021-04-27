var dateTimeEl = $('#date-time');
var hrContainerEl = $('#hr-container');
// console.log(dateTimeEl);

// funtion to display time
function displayTime() {
    var now = moment().format('dddd MMM DD, YYYY');
    dateTimeEl.text(now);
}

// populate hours
function addHours() {
    var hr, hrText, rowDiv, rowID, hrDiv, txtArea, btn;

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
        txtArea = $('<textarea>').addClass("col-md-10 description");
        btn = $('<button>').addClass("btn saveBtn col-md-1").text('💾');
        rowDiv.append(hrDiv, txtArea, btn);

        // console.log(rowDiv);
        // add row to container
        hrContainerEl.append(rowDiv);
    }    
}

// load saved data
function loadSavedData() {

}

// update hour's color
function updateHourColor() {


}

// save schedule
function saveSchedule() {
    
}
// function docHandler
function docHandler() {
    displayTime();
    loadSavedData();
    updateHourColor();
    $('.saveBtn').on('click', saveSchedule());
}

// invoke addHours on window load
$(window).on('load', addHours);

// once document is ready, add event handlers
$(document).on('ready', docHandler());
