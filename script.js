//click reservation and back
var dateScreen = document.querySelector('.date');
var seatScreen = document.querySelector('.seat-container');

var reservationButton = document.getElementById('reserve-button');
var backButton = document.getElementById('back-button');

reservationButton.addEventListener('click', function () {
    dateScreen.classList.add('d-none');
    seatScreen.classList.remove('d-none');
})
backButton.addEventListener('click', function () {
    seatScreen.classList.add('d-none');
    dateScreen.classList.remove('d-none');
})

//Read less - read more 
var readMore = document.getElementById("read-more");
var readLess = document.getElementById("read-less");
var textMore = document.getElementById("text-more");
var textContent = document.querySelector(".content-container p");

readMore.onclick = function (event) {
    readMore.style.display = "none";
    readLess.style.display = "inline";
    textMore.style.display = "inline";
    // textContent.style.marginBottom = "1.125rem";
}
readLess.onclick = function (event) {
    readMore.style.display = "inline";
    readLess.style.display = "none";
    textMore.style.display = "none";
    // textContent.style.marginBottom = "3.125rem";
}

//date and time
var slots = [
    {
        id: "slot_1",
        weekday: "Thu",
        date: "21",
        time: "10:00"
    },
    {
        id: "slot_2",
        weekday: "Thu",
        date: "21",
        time: "12:00"
    },
    {
        id: "slot_3",
        weekday: "Thu",
        date: "21",
        time: "14:00"
    },
    {
        id: "slot_4",
        weekday: "Thu",
        date: "21",
        time: "16:00"
    },
    {
        id: "slot_5",
        weekday: "Thu",
        date: "21",
        time: "18:00"
    },
    {
        id: "slot_6",
        weekday: "Thu",
        date: "21",
        time: "20:00"
    },
]
var bookingSelection = document.querySelector('.booking-container')
for(var i = 0; i< slots.length; i++){
    var bookingItem = document.createElement('div');
    var dateContainer = document.createElement('div');
    bookingItem.classList.add('booking-item');
    dateContainer.classList.add('booking-date')
    var date = document.createElement('div');
    date.innerHTML = slots[i].weekday + "<br>" + `<b> ${slots[i].date} </b>`

    var timeContainer = document.createElement('div');
    timeContainer.classList.add('booking-time');
    var time = document.createElement('div');
    time.textContent = slots[i].time;
    if (i == 2){
        date.classList.add('booking-active')
    }
    bookingItem.appendChild(dateContainer);
    bookingItem.appendChild(timeContainer);
    dateContainer.appendChild(date);
    timeContainer.appendChild(time);

    bookingSelection.appendChild(bookingItem)
}

