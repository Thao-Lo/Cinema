let watchBtn = document.getElementById("watch-trailer-btn");
let modal = document.querySelector('.trailer-modal');
let closebtn = modal.querySelector('.close-trailer');
let iFrame = document.getElementById("trailer-iframe");
let navButton = document.getElementById("nav-btn");
let navMenu = document.querySelector('.nav-menu')
let bookTicketBtn = document.getElementById('book-ticket-btn');

watchBtn.addEventListener("click", function () {
    modal.style.display = "block";

})
closebtn.addEventListener("click", function () {
    event.stopPropagation();
    modal.style.display = "none";
    iFrame.src = "";
    iFrame.src = "https://www.youtube.com/embed/6ZfuNTqbHE8?si=fVxwB-pEp6rbFv4G";

})
navButton.addEventListener('click', () => {
    navMenu.classList.toggle('d-block')
})
bookTicketBtn.addEventListener('click', ()=>{
    window.location.href = "index.html";
})