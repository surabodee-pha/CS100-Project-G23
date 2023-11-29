const navEl = document.querySelector('.nav');
const menuEl = document.querySelector('.menu');

menuEl.addEventListener('click',() => {
    navEl.classList.toggle('nav--open');
    menuEl.classList.toggle('menu--open');
})