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
        // <textarea class="col-md-10" id="txt-9">
        // </textarea>
        // <button class="btn saveBtn col-md-1 btn-outline-secondary"></button>
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

    // load each hours data from local storage
    for (hr = 9; hr < 18; hr++) {
        txtAreaID = "txt-" + hr.toString();
        $('textarea#'+txtAreaID).val(localStorage.getItem(txtAreaID));
    }
}

// update hour's color
function updateHourColor() {
    // get current hour
    var currentHr = moment().hours();
    // console.log(currentHr);

    // check against each hour block for past, present, future
    for (hr = 9; hr < 18; hr++) {
        txtAreaID = "txt-" + hr.toString();
        // past 
        if (hr < currentHr) {
            $('textarea#'+txtAreaID).addClass("past");
        }
        // present
        else if (hr === currentHr) {
            $('textarea#'+txtAreaID).removeClass("past");
            $('textarea#'+txtAreaID).addClass("present");
        }
        // future
        else {
            $('textarea#'+txtAreaID).removeClass("past");
            $('textarea#'+txtAreaID).removeClass("present");
            $('textarea#'+txtAreaID).addClass("future");
        }        
    }
}

// save schedule
function saveSchedule() {
    var schedTxt, txtAreaID;

    // get the ID and text of the textarea
    txtAreaID = $(this).siblings()[1].id;  
    schedTxt = $('textarea#'+txtAreaID).val();
    console.log(txtAreaID, schedTxt); 

    // save data in localStorage
    localStorage.setItem(txtAreaID, schedTxt);

    // show in message area for 5sec
    $('.msg').addClass('show');
    setTimeout(function() {
        $('.msg').removeClass('show');
    }, 5000);
}

// function docHandler
function docHandler() {
    // display today's date
    displayDate();

    // load previously saved schedule
    loadSavedSchedule();

    // timeblocks are color coded
    updateHourColor();

    // event handler for save button
    $('.saveBtn').on('click', saveSchedule);

    // set timer to update timeblocks color in every 10sec
    var interval = setInterval(updateHourColor, 10000);
}

// invoke addHours on window load to create hours in hr-container
$(window).on('load', addHours);

// once document is ready, update page and add event handler
$(document).ready(docHandler);
