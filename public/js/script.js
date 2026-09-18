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

const track = document.querySelector('.testimonio_track');
const carousel = document.querySelector('.carousel');

let isDragging = false;
let startX;
let scrollLeft;
let currentTransform = 0;

// Función para extraer el valor actual de desplazamiento de la animación de CSS
function getTranslateX() {
    const style = window.getComputedStyle(carousel);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
}

track.addEventListener('mousedown', (e) => {
    isDragging = true;
    track.style.cursor = 'grabbing';
    
    // Capturamos la posición exacta donde la animación se pausó
    currentTransform = getTranslateX();
    carousel.style.animation = 'none'; // Apagamos la animación temporalmente
    carousel.style.transform = `translateX(${currentTransform}px)`;
    
    startX = e.pageX;
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX;
    const walk = (x - startX) * 1.5; // El multiplicador ajusta la velocidad del arrastre
    let targetX = currentTransform + walk;
    
    // Evitamos que arrastren infinitamente al vacío a la izquierda
    if (targetX > 0) targetX = 0; 
    
    carousel.style.transform = `translateX(${targetX}px)`;
});

window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';
    
    // Al soltar, reactivamos la animación de CSS fluidamente desde el punto actual
    carousel.style.animation = 'carruselInfinito 20s linear infinite';
    carousel.style.transform = '';
});

// Soporte idéntico para pantallas táctiles (Celulares)
track.addEventListener('touchstart', (e) => {
    isDragging = true;
    currentTransform = getTranslateX();
    carousel.style.animation = 'none';
    carousel.style.transform = `translateX(${currentTransform}px)`;
    startX = e.touches[0].pageX;
});

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.5;
    let targetX = currentTransform + walk;
    if (targetX > 0) targetX = 0;
    carousel.style.transform = `translateX(${targetX}px)`;
});

window.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    carousel.style.animation = 'carruselInfinito 20s linear infinite';
    carousel.style.transform = '';
});
