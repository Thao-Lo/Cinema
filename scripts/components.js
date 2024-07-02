
let pageLoading = document.querySelector('.page-loading');
let page = document.querySelector('.page');


function loadingPage(){
    pageLoading.style.display = 'none';
    page.style.display = 'block';
}
document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(loadingPage, 500)
})