const btnToggle = document.querySelector(".toggle");
const menuNav = document.querySelector(".navbar");

btnToggle.addEventListener("click", () => {
    menuNav.classList.toggle("active");
    btnToggle.classList.toggle("active");
});
