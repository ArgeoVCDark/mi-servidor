const btnToggle=document.querySelector(".btn_toggle");
const menuNav=document.querySelector(".navbar");
const menuLiks=document.querySelectorAll(".navbar_link");
const header=document.querySelector(".header");

btnToggle.addEventListener("click", ()=>{
    menuNav.classList.toggle("active");
    btnToggle.classList.toggle("active");
});


menuLiks.forEach(link =>{
    link.addEventListener("click",()=>{
        menuNav.classList.toggle("active");
        btnToggle.classList.toggle("active");
    });
});
btnToggle.addEventListener("mouseenter",()=>{
    menuNav.classList.add("active");
    btnToggle.classList.add("active");
});
header.addEventListener("mouseleave", ()=>{
    menuNav.classList.remove("active");
    btnToggle.classList.remove("active");
});