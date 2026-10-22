const btnToggle=document.querySelector(".toggle");
const menuNavbar=document.querySelector(".navbar");

btnToggle.addEventListener("click",()=>{
    btnToggle.classList.toggle("active");
    menuNavbar.classList.toggle("active");
});

// 2. SENSOR DE VISIBILIDAD INTELIGENTE (IntersectionObserver para UX Premium)
    const curtainSection = document.querySelector('.testimonials--grid');

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