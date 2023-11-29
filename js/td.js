document.addEventListener("DOMContentLoaded", () => {
    var lastPos = 0, scrollToPos = document.body.scrollHeight;
    var scrollBtn = document.getElementById("scrollBtn");

    scrollBtn.addEventListener("click", () => scrollTo(0, scrollToPos));

    document.addEventListener("scroll", () => {
        scrollToPos = window.scrollY > lastPos ? 0 : document.body.scrollHeight;
        lastPos = Math.max(0, window.scrollY);
        scrollBtn.classList.toggle("scrollUp", scrollToPos === 0);
    });
});