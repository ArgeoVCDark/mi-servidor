/**
 * CAPA VISUAL - INTERACTIVIDAD Y ANIMACIONES DEL INTERFAZ
 * Centraliza el menú toggle, animaciones de secciones y el carrusel.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializamos cada módulo visual por separado
    inicializarMenuToggle();
    inicializarAnimacionSecciones();
    inicializarCarruselTestimonios();

});

/**
 * 1. MÓDULO: MENÚ DESPLEGABLE (BOTÓN TOGGLE)
 * Controla la apertura y cierre del menú de navegación en dispositivos móviles.
 */
function inicializarMenuToggle() {
    const botonToggle = document.querySelector('.boton-toggle');
    const menuNavegacion = document.querySelector('.menu-navegacion'); // Ajusta la clase a tu HTML

    // Guardián: si no existe el botón en este HTML, salimos pacíficamente
    if (!botonToggle || !menuNavegacion) return;

    botonToggle.addEventListener('click', () => {
        // Conmutamos la clase 'active' tanto en el botón como en el menú
        botonToggle.classList.toggle('active');
        menuNavegacion.classList.toggle('active');
        
        // Buena práctica de Accesibilidad (A11y): Cambiar el estado del atributo aria
        const estaExpandido = botonToggle.getAttribute('aria-expanded') === 'true';
        botonToggle.setAttribute('aria-expanded', !estaExpandido);
    });
}

/**
 * 2. MÓDULO: ANIMACIÓN DE SECCIONES AL HACER SCROLL
 * Hace que las secciones aparezcan suavemente (fade-in) a medida que el usuario baja la página.
 * Usamos Intersection Observer API, la forma más eficiente y moderna (60fps).
 */
function inicializarAnimacionSecciones() {
    // Seleccionamos todas las secciones principales de la página
    const secciones = document.querySelectorAll('section');

    if (secciones.length === 0) return;

    // Configuración del observador
    const opciones = {
        root: null,          // Usa el viewport del navegador
        rootMargin: '0px',   // Sin márgenes extra
        threshold: 0.15      // Se activa cuando el 15% de la sección es visible
    };

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            // Si la sección entra en la pantalla
            if (entrada.isIntersecting) {
                entrada.target.classList.add('seccion-visible'); // Clase que activará el CSS
                observador.unobserve(entrada.target); // Dejamos de observarla para mejorar rendimiento
            }
        });
    }, opciones);

    // Registramos todas las secciones en el observador
    secciones.forEach(seccion => {
        // Le añadimos una clase inicial para ocultarla (preparar la animación)
        seccion.classList.add('seccion-oculta'); 
        observador.observe(seccion);
    });
}

/**
 * 3. MÓDULO: CARRUSEL INTERACTIVO DE TESTIMONIOS
 * Maneja el comportamiento dinámico y arrastre del carrusel de testimonios.
 */
function inicializarCarruselTestimonios() {
    const track = document.querySelector('.testimonio_track');
    const carousel = document.querySelector('.carousel');

    if (!track || !carousel) return;

    let isDragging = false;
    let startX;
    let currentTransform = 0;

    function getTranslateX() {
        const style = window.getComputedStyle(carousel);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m41;
    }

    // Eventos Mouse (Escritorio)
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        track.style.cursor = 'grabbing';
        currentTransform = getTranslateX();
        carousel.style.animation = 'none';
        carousel.style.transform = `translateX(${currentTransform}px)`;
        startX = e.pageX;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 1.5;
        let targetX = currentTransform + walk;
        if (targetX > 0) targetX = 0;
        carousel.style.transform = `translateX(${targetX}px)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        carousel.style.animation = 'carruselInfinito 25s linear infinite';
        carousel.style.transform = '';
    });

    // Eventos Táctiles (Móviles)
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        currentTransform = getTranslateX();
        carousel.style.animation = 'none';
        carousel.style.transform = `translateX(${currentTransform}px)`;
        startX = e.touches.pageX;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches.pageX;
        const walk = (x - startX) * 1.5;
        let targetX = currentTransform + walk;
        if (targetX > 0) targetX = 0;
        carousel.style.transform = `translateX(${targetX}px)`;
    });

    window.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.animation = 'carruselInfinito 25s linear infinite';
        carousel.style.transform = '';
    });
}
