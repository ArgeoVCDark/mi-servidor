/* ==========================================================================
   BLOQUE 1: MENÚ RESPONSIVO, EFECTO REVEAL Y VALIDACIÓN DE CONTACTO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // 1. MANEJADOR INTERACTIVO DEL MENÚ HAMBURGUESA
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            const active = navbar.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', active);
        });
    }

    // Cerrar menú móvil al dar clic a un enlace de sección (Mejora UX)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar) navbar.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 2. SENSOR DE VISIBILIDAD INTELIGENTE (IntersectionObserver para UX Premium)
    const curtainSection = document.querySelector('.curtain-reveal');

    if (curtainSection) {
        // Configuramos el sensor: queremos que actúe cuando al menos el 20% de la sección sea visible
        const observerOptions = {
            root: null, // Usa la pantalla del navegador como marco de referencia
            threshold: 0.2 // 0.2 significa 20% del elemento visible en pantalla
        };

        const curtainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // ¡El elemento entró a la pantalla! Añadimos la clase para que corra la cortina [5]
                    curtainSection.classList.add('reveal');
                } else {
                    // ¡El elemento salió de la pantalla! Quitamos la clase de golpe
                    // Así, cuando el usuario vuelva a hacer scroll (subir o bajar), la animación se repetirá [5]
                    curtainSection.classList.remove('reveal');
                }
            });
        }, observerOptions);

        // Activamos el sensor para que vigile nuestra sección de historia
        curtainObserver.observe(curtainSection);
    }


    // 3. RESPUESTA Y FEEDBACK DEL FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('mainForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Detiene la recarga de página por defecto
            const name = document.getElementById('name').value;
            alert(`¡Espectacular, ${name}! Tu solicitud de proyecto ha sido simulada de manera exitosa. Iniciemos este viaje visual.`);
            contactForm.reset(); // Limpia los campos
        });
    }
});
// 4. INTERRUPTOR DE MODO DÍA / NOCHE INTELIGENTE
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-btn__icon');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Revisa qué tema tiene la etiqueta <html> actualmente
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            // Si está en noche, lo pasamos a modo día (removiendo el atributo)
            document.documentElement.removeAttribute('data-theme');
            themeIcon.textContent = '🌙'; // Cambia el icono a luna
        } else {
            // Si está en día, le inyectamos el atributo dark
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️'; // Cambia el icono a sol
        }
    });
}

/* ==========================================================================
   BLOQUE 2: MOTOR COMPLETO DEL CARRUSEL CON AUTOMATIZACIÓN Y PAUSA (UX)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('#portfolioCarousel');
    const track = document.querySelector('.carousel-inner-track');
    const arrowNext = document.querySelector('.carousel-arrow.next');
    const arrowPrev = document.querySelector('.carousel-arrow.prev');
    const dotsContainer = document.querySelector('.carousel-dots-container');

    if (carousel && track && arrowNext && arrowPrev && dotsContainer) {
        const items = Array.from(track.children);
        let currentIndex = 0;
        let autoplayTimer = null;
        const intervalTime = 4000; // 4 segundos óptimos de lectura

        // Determina columnas por vista según tamaño de pantalla real
        const getItemsPerView = () => {
            if (window.innerWidth >= 992) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };

        const getMaxIndex = () => {
            return Math.max(0, items.length - getItemsPerView());
        };

        // Construcción geométrica de los puntitos guías (Dots)
        const createDots = () => {
            dotsContainer.innerHTML = '';
            const totalSteps = getMaxIndex() + 1;
            for (let i = 0; i < totalSteps; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Ir a diapositiva ${i + 1}`);
                dotsContainer.appendChild(dot);
            }
        };

        const updateDotsState = () => {
            const dots = Array.from(dotsContainer.children);
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        };

        // Realiza el desplazamiento físico calculando gaps intermedios de CSS
        const moveCarousel = () => {
            const gapWidth = 24;
            if (items.length > 0) {
                const itemWidth = items[0].getBoundingClientRect().width;
                const transformValue = currentIndex * (itemWidth + gapWidth);
                track.style.transform = `translateX(-${transformValue}px)`;
            }
            updateDotsState();
        };

        // Funciones del Motor de Ciclo continuo (Autoplay)
        const startAutoplay = () => {
            carousel.classList.remove('paused'); // Permite movimiento libre
            autoplayTimer = setInterval(() => {
                const maxIndex = getMaxIndex();
                currentIndex = (currentIndex >= maxIndex) ? 0 : currentIndex + 1;
                moveCarousel();
            }, intervalTime);
        };

        const stopAutoplay = () => {
            clearInterval(autoplayTimer);
            carousel.classList.add('paused'); // Activa el zoom de lectura estática en CSS
        };

        // Controles de navegación manuales
        arrowNext.addEventListener('click', () => {
            currentIndex = (currentIndex >= getMaxIndex()) ? 0 : currentIndex + 1;
            moveCarousel();
        });

        arrowPrev.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? getMaxIndex() : currentIndex - 1;
            moveCarousel();
        });

        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('carousel-dot')) {
                const dots = Array.from(dotsContainer.children);
                currentIndex = dots.indexOf(e.target);
                moveCarousel();
            }
        });

        // 💥 CONTROL DE EXPERIENCIA: Detener reproducción al pasar el cursor (Hover)
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        carousel.addEventListener('touchstart', stopAutoplay, { passive: true });

        // Inicializar el sistema del componente
        createDots();
        startAutoplay();

        // Recalcular posiciones si el dispositivo cambia de orientación (Responsive dinámico)
        window.addEventListener('resize', () => {
            createDots();
            if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
            moveCarousel();
        });
    }
});
