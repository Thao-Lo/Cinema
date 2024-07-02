//click reservation and back
var dateScreen = document.querySelector('.date');
var seatScreen = document.querySelector('.seat-container');

var reservationButton = document.getElementById('reserve-button');
var backButton = document.getElementById('back-button');
var buyButton = document.getElementById('buy-btn');
var modalHTML = document.querySelector('.modal');
var yesButton = document.querySelector('.modal #yes-btn');
var noButton = document.querySelector('.modal #no-btn');

var readMore = document.getElementById("read-more");
var readLess = document.getElementById("read-less");
var textMore = document.getElementById("text-more");
var textContent = document.querySelector(".content-container p");

var bookingSelection = document.querySelector('.booking-container')

reservationButton.addEventListener('click', function () {
    dateScreen.classList.add('d-none');
    seatScreen.classList.remove('d-none');
})

//click back from seat screen when seats are selected will display modal
backButton.addEventListener('click', function () {
    if (selectedSeats.length) {
        modalHTML.style.display = 'block';
    } else {
        handleBackToDateScreen();

    }
})
//click Yes -> back to Date Screen and turn off modal
yesButton.addEventListener('click', handleBackToDateScreen)
noButton.addEventListener('click', function () {
    modalHTML.style.display = 'none';
})

function handleBackToDateScreen() {
    seatScreen.classList.add('d-none');
    dateScreen.classList.remove('d-none');
    selectedSeats = [];
    selectedStandardSeatId = [];
    selectedVipSeatId = [];
    var selectedSeatsHTML = document.querySelectorAll('.selected');
    for (var i = 0; i < selectedSeatsHTML.length; i++) {
        selectedSeatsHTML[i].classList.remove('selected');
    }
    generateSeatNameAndPrice();
    modalHTML.style.display = 'none';
}

//Read less - read more 
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
        time: "8:00"
    },
    {
        id: "slot_2",
        weekday: "Thu",
        date: "21",
        time: "10:00"
    },
    {
        id: "slot_3",
        weekday: "Thu",
        date: "21",
        time: "12:00"
    },
    {
        id: "slot_4",
        weekday: "Thu",
        date: "21",
        time: "14:00"
    },
    {
        id: "slot_5",
        weekday: "Thu",
        date: "21",
        time: "16:00"
    },
    {
        id: "slot_6",
        weekday: "Thu",
        date: "21",
        time: "18:00"
    },
    {
        id: "slot_7",
        weekday: "Thu",
        date: "21",
        time: "20:00"
    },
    {
        id: "slot_8",
        weekday: "Thu",
        date: "21",
        time: "22:00"
    },
]

for (var i = 0; i < slots.length; i++) {
    var bookingItem = document.createElement('div');
    var dateContainer = document.createElement('div');
    bookingItem.classList.add('booking-item');
    bookingItem.setAttribute('draggable', 'false');
    dateContainer.classList.add('booking-date')
    var date = document.createElement('div');
    date.innerHTML = slots[i].weekday + "<br>" + `<b> ${slots[i].date} </b>`

    var timeContainer = document.createElement('div');
    timeContainer.classList.add('booking-time');
    var time = document.createElement('div');
    time.textContent = slots[i].time;
    if (i == 2) {
        date.classList.add('booking-active')
    }
    bookingItem.appendChild(dateContainer);
    bookingItem.appendChild(timeContainer);
    dateContainer.appendChild(date);
    timeContainer.appendChild(time);

    bookingSelection.appendChild(bookingItem)
}

//Touchable slider - Date Selection

let prev = document.getElementById('prev');
let next = document.getElementById('next');
const firstBookingItem = bookingSelection.querySelector('.booking-item').offsetWidth;
let isDragging = false;
var startX, startScrollLeft, clientX;

let itemWidth = 80;
let currentItem;
var bookingItems = document.querySelectorAll('.booking-item');

function sliderCurrentPosition() {
    bookingItems[1].classList.add('up-one');
    bookingItems[3].classList.add('up-one');
    bookingItems[2].classList.add('up-two');
}
sliderCurrentPosition();

function scrollLeft() {
    console.log('Scrolling left');
    console.log('Before scrollLeft:', bookingSelection.scrollLeft);
    bookingSelection.scrollLeft -= (itemWidth);
    console.log('After scrollLeft:', bookingSelection.scrollLeft);

    clearMargin()
    currentItem = Math.floor(bookingSelection.scrollLeft / itemWidth)
    upOne = currentItem + 1;
    upOneAnother = currentItem + 3;
    upTwo = currentItem + 2;

    bookingItems[upOne].classList.add('up-one');
    bookingItems[upOneAnother].classList.add('up-one');
    bookingItems[upTwo].classList.add('up-two');
    // var bookingDateActive = bookingItems[upTwo].querySelector('.booking-date');
    // bookingDateActive.classList.add('booking-active');  

}
function scrollRight() {
    console.log('Scrolling right');
    console.log('Before scrollRight:', bookingSelection.scrollLeft);
    bookingSelection.scrollLeft += (itemWidth);
    console.log('After scrollRight:', bookingSelection.scrollLeft);

    clearMargin()
    currentItem = Math.floor(bookingSelection.scrollLeft / itemWidth)
    upOne = currentItem + 1;
    upOneAnother = currentItem + 3;
    upTwo = currentItem + 2;

    bookingItems[upOne].classList.add('up-one');
    bookingItems[upOneAnother].classList.add('up-one');
    bookingItems[upTwo].classList.add('up-two');
}

prev.addEventListener('touchstart', scrollLeft)
prev.addEventListener('click', scrollLeft)

next.addEventListener('touchstart', scrollRight)
next.addEventListener('click', scrollRight)



const dragStart = (event) => {
    isDragging = true;
    bookingSelection.classList.add('dragging');
    //record the initial touch/cursor on the screen
    if (event.touches && event.touches.length > 0) {
        startX = event.touches[0].clientX;
    } else {
        startX = event.clientX;
    }
    console.log('StartX :' + startX);

    //record the amount of pixel the scroll the the left and out of the container
    startScrollLeft = bookingSelection.scrollLeft;
    console.log('startScrollLeft :' + startScrollLeft);
}

function clearMargin() {
    for (var i = 0; i < bookingItems.length; i++) {
        var bookingDateDiv = bookingItems[i].querySelector('.booking-date>div');
        bookingDateDiv.classList.remove('booking-active')
        bookingItems[i].classList.remove('up-one', 'up-two');
    }
}

const dragMove = (event) => {
    if (!isDragging) return
    //Update the scroll position of the slider based on the cursor movement

    if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
    } else {
        clientX = event.clientX;
    }

    bookingSelection.scrollLeft = startScrollLeft - (clientX - startX);
    updateMargin()
}


const updateMargin = () => {
    clearMargin()
    currentItem = Math.floor(bookingSelection.scrollLeft / itemWidth)
    upOne = currentItem + 1;
    upOneAnother = currentItem + 3;
    upTwo = currentItem + 2;

    bookingItems[upOne].classList.add('up-one');
    bookingItems[upOneAnother].classList.add('up-one');
    bookingItems[upTwo].classList.add('up-two');

    bookingItems[upTwo].querySelector('.booking-date>div').classList.add('booking-active');


}
const dragEnd = () => {
    isDragging = false;
    bookingSelection.classList.remove('dragging');
}
//mobile
bookingSelection.addEventListener('touchstart', dragStart)
bookingSelection.addEventListener('touchmove', dragMove);
document.addEventListener('touchend', dragEnd)

//window
bookingSelection.addEventListener('mousedown', dragStart)
bookingSelection.addEventListener('mousemove', dragMove);
document.addEventListener('mouseup', dragEnd)


// TEMPLATE STRING
// ------ SEAT ADD & REMOVE
var seatRowOneLeftHTML = document.querySelector('#seat-row-one>.seat-row:first-child')
var seatRowOneRightHTML = document.querySelector('#seat-row-one>.seat-row:last-child')

var seatRowTwoLeftHTML = document.querySelector('#seat-row-two>.seat-row:first-child')
var seatRowTwoRightHTML = document.querySelector('#seat-row-two>.seat-row:last-child')

var seatRowThreeHTML = document.querySelector("#seat-row-three");
var seatRowFourHTML = document.querySelector("#seat-row-four");
var seatRowFiveHTML = document.querySelector("#seat-row-five");
var seatRowSixHTML = document.querySelector("#seat-row-six");

var vipSection = document.querySelector('.vip-section');
var standardSection = document.querySelector('.standard-section')
var seatSelectedStandardHTML = document.getElementById('standard-seat');
var seatSelectedVIPHTML = document.getElementById('vip-seat');
console.log("type of span: ", seatSelectedVIPHTML);
var totalPriceHTML = document.getElementById('total-price');

var buyButtonMobile = document.getElementById('buy-btn-mobile');
var buyButtonDesktop = document.getElementById('buy-btn-desktop');

var selectedSeats = []
var totalPrice = 0;
var selectedStandardSeatId = [];
var selectedVipSeatId = [];

function generateSeatNameAndPrice() {
    //clear inner HTML to generate the seats again when loop through the array to avoid duplicate 'seat1/ seat 1 seat 3/ seat1 seat3 seat4'

    if (selectedSeats.length === 0) {
        seatSelectedStandardHTML.innerHTML = "Please select seats";
        seatSelectedVIPHTML.innerHTML = "Please select seats";
        vipSection.innerHTML = '';
        standardSection.innerHTML = '';
        totalPriceHTML.innerHTML = '0';
        return;
    }
    standardSection.innerHTML = 'Standard Seats: ';
    vipSection.innerHTML = 'Vip Seats: ';
    totalPriceHTML.innerHTML = '';
    for (var i = 0; i < selectedSeats.length; i++) {
        var currentSeat = selectedSeats[i];
        // seatSelectedStandardHTML.innerHTML = seatSelectedStandardHTML.innerHTML + " " + currentSeat.id.replace(/[^0-9]/g, '');
        totalPriceHTML.innerHTML = +totalPriceHTML.innerHTML + +currentSeat.price;
        console.log("selected seat" + currentSeat.id.replace(/[^0-9]/g, ''));
    }
    //sort array
    displaySeatNumber(selectedStandardSeatId, seatSelectedStandardHTML)
    displaySeatNumber(selectedVipSeatId, seatSelectedVIPHTML)
    console.log("slected standard seat id:", selectedStandardSeatId);
    console.log("slected VIP seat id:", selectedVipSeatId);
    console.log(selectedSeats);

}
//to display "please select seat" on screen by default => call the function.
generateSeatNameAndPrice();


//<button disabled> == true 
function updateBuyBtn() {
    if (selectedSeats.length !== 0) {
        buyButtonMobile.disabled = false;
        buyButtonDesktop.disabled = false;
        //redirect to another page
        buyButtonDesktop.addEventListener('click', () => {
            window.location.href = "ticket.html";
        })
    } else {
        buyButtonMobile.disabled = true;
        buyButtonDesktop.disabled = true;
    }
}

function handleSeatClick(event) {
    var available = event.target.dataset.available;
    var id = event.target.dataset.id;
    var price = event.target.dataset.price;
    var isVip = event.target.dataset.isVip;
    console.log("check is-vip: " + isVip);
    console.log(available);
    if (available === 'true') {
        if (event.target.classList.value.includes('selected')) {
            event.target.classList.remove('selected');
            var removeSeat = {
                id: id,
                price: price,
                isVip: isVip
            }
            for (var i = 0; i < selectedSeats.length; i++) {
                if (selectedSeats[i].id == removeSeat.id) {
                    console.log("removed seat id:" + removeSeat.id);
                    selectedSeats.splice(i, 1);
                }
            }

            //remove seat id in seat number array
            var removeSeatId = parseInt(removeSeat.id.replace(/[^0-9]/g, ''));
            if (selectedStandardSeatId.includes(removeSeatId)) {
                const index = selectedStandardSeatId.indexOf(removeSeatId);
                selectedStandardSeatId.splice(index, 1)
            }
            if (selectedVipSeatId.includes(removeSeatId)) {
                const indexVip = selectedVipSeatId.indexOf(removeSeatId);
                selectedVipSeatId.splice(indexVip, 1)
            }

        } else {
            event.target.classList.add('selected');
            //animation
            event.target.classList.add('scale-up');
            setTimeout(function () {
                event.target.classList.remove('scale-up');
            }, 1000)
            var newSeat = {
                id: id,
                price: price,
                isVip: isVip
            }
            selectedSeats.push(newSeat);
            console.log("new seat:", newSeat);
            console.log("is Vip: " + newSeat.isVip);

            //handle display seat number & isVip
            //add seat number into new array
            let newSeatId = parseInt(newSeat.id.replace(/[^0-9]/g, ''));
            if (newSeat.isVip == "false") {
                selectedStandardSeatId.push(newSeatId);
            }
            else {
                selectedVipSeatId.push(newSeatId);
            }
        }
        generateSeatNameAndPrice();
        updateBuyBtn()
    } else {
        //animation - seat booked already
        event.target.classList.add('vibration');
        setTimeout(function () {
            event.target.classList.remove('vibration')
        }, 1000)
    }
}
//function sort int array
function sortSeatArray(arr) {
    return arr.sort((a, b) => a - b);
}

//function display seat for standard and Vip with 1,2,3 => 1-3
function displaySeatNumber(array, seatHTML) {
    sortSeatArray(array);
    let nums = [];
    let result = '';
    seatHTML.innerHTML = '';
    for (var i = 0; i < array.length; i++) {
        if (nums.length === 0 || array[i] === (nums[nums.length - 1] + 1)) {
            nums.push(array[i]);
        } else {
            if (nums.length >= 3) {
                result += `${nums[0]} - ${nums[nums.length - 1]}, `;
                console.log(`${nums[0]} - ${nums[nums.length - 1]}`);
            } else {
                for (var j = 0; j < nums.length; j++) {
                    result += `${nums[j]}, `;
                    console.log(nums[j]);
                }
            }
            nums = [];
            nums.push(array[i]);
        }
        // seatSelectedStandardHTML.innerHTML = seatSelectedStandardHTML.innerHTML + " " + currentSeat.id.replace(/[^0-9]/g, '');
        if (i == array.length - 1) {
            if (nums.length >= 3) {
                result += `${nums[0]} - ${nums[nums.length - 1]}, `;
                console.log(`${nums[0]} - ${nums[nums.length - 1]}`);
            } else {
                for (var j = 0; j < nums.length; j++) {
                    result += `${nums[j]}, `;
                    console.log(nums[j]);
                }
            }
        }

    }
    //remove 2nd to last character, to remove comma and space at the end of seat display
    result = result.slice(0, -2);
    seatHTML.innerHTML = result;
}

function generateSeats(rowData, seatRowHTML) {
    for (var i = 0; i < rowData.length; i++) {
        var currentSeat = rowData[i]

        var seat = document.createElement('div');
        seat.classList.add('seat');
        seat.dataset.available = currentSeat.available;
        seat.dataset.id = currentSeat.id;
        seat.dataset.price = currentSeat.price;
        seat.dataset.isVip = currentSeat.isVip;

        if (!currentSeat.available) {
            seat.classList.add('unavailable');
        }

        seat.addEventListener('click', handleSeatClick)
        seat.innerHTML = ` <svg width="30" height="22" viewBox="0 0 30 22" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 4C0 2.89543 0.89543 2 2 2H4C5.10457 2 6 2.89543 6 4V14C6 15.1046 6.89543 16 8 16H22C23.1046 16 24 15.1046 24 14V4C24 2.89543 24.8954 2 26 2H28C29.1046 2 30 2.89543 30 4V17C30 19.7614 27.7614 22 25 22H5C2.23858 22 0 19.7614 0 17V4Z"
                    fill="#D9D9D9"></path>
                <path
                    d="M7 3C7 1.34315 8.34315 0 10 0H20C21.6569 0 23 1.34315 23 3V14C23 14.5523 22.5523 15 22 15H8C7.44772 15 7 14.5523 7 14V3Z"
                    fill="#D9D9D9"></path>
            </svg>`

        seatRowHTML.appendChild(seat)
    }
}

generateSeats(seat_row_one.slice(0, seat_row_one.length / 2), seatRowOneLeftHTML)
generateSeats(seat_row_one.slice(seat_row_one.length / 2), seatRowOneRightHTML)

generateSeats(seat_row_two.slice(0, seat_row_two.length / 2), seatRowTwoLeftHTML)
generateSeats(seat_row_two.slice(seat_row_two.length / 2), seatRowTwoRightHTML)

generateSeats(seat_row_three, seatRowThreeHTML)
generateSeats(seat_row_four, seatRowFourHTML)
generateSeats(seat_row_five, seatRowFiveHTML)
generateSeats(seat_row_six, seatRowSixHTML)

