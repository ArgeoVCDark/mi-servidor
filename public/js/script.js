// 1. Seleccionamos el botón y el menú
const btnToggle = document.querySelector(".btn_toggle");
const navbar = document.querySelector(".navbar");

// 2. Seleccionamos TODOS los enlaces que están dentro del menú de navegación
const navLinks = document.querySelectorAll(".nav_item a");

// 3. Evento para abrir/cerrar el menú con el botón toggle
btnToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    btnToggle.classList.toggle("active");
});

// 4. Recorremos cada enlace y le agregamos el evento de clic
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        // Removemos la clase 'active' para cerrar el menú y regresar el botón a sus 3 líneas
        navbar.classList.remove("active");
        btnToggle.classList.remove("active");
    });
});
