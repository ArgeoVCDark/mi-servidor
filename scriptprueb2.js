const btnToggle=document.querySelector(".btn_toggle");
const menuNav=document.querySelector(".navbar");
const menuLiks=document.querySelectorAll(".navbar_link");
const header=document.querySelector(".header");



btnToggle.addEventListener("mouseenter",()=>{
    menuNav.classList.add("active");
    btnToggle.classList.add("active");
});
header.addEventListener("mouseleave", ()=>{
    menuNav.classList.remove("active");
    btnToggle.classList.remove("active");
});


/**
 * 
 
    btnToggle.addEventListener("click", ()=>{
    menuNav.classList.toggle("active");
    btnToggle.classList.toggle("active");
});
*/
// SOLUCCIÓN AL CLIC CONFUSO: Usamos mousedown + una validación tipo bandera
btnToggle.addEventListener("mousedown", (evento) => {
    // Si el usuario da clic pero el menú ya se abrió con el mouse,
    // detenemos la acción para que no se cierre en su cara.
    if (menuNav.classList.contains("active")) {
        evento.preventDefault(); // Evita el comportamiento confuso
    } else {
        // Si por alguna razón estaba cerrado (ej. en pantallas táctiles), lo abre
        menuNav.classList.add("active");
        btnToggle.classList.add("active");
    }
});


menuLiks.forEach(link =>{
    link.addEventListener("click",()=>{
        menuNav.classList.toggle("active");
        btnToggle.classList.toggle("active");
    });
});

