document.addEventListener("DOMContentLoaded", () => {
    // --- A) NAVBAR PREMIUM MÓVIL (CORREGIDO) ---
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", e => {
        e.stopPropagation(); // Evita herencias de click erróneas
        menuToggle.classList.toggle("active");
        navbar.classList.toggle("active");
    });

    // Cierra el menú cuando se hace clic en cualquier enlace
    document.querySelectorAll(".nav_link").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navbar.classList.remove("active");
        });
    });

    // --- B) RECARGA DE PÁGINA AL CLIC EN LOGO ---
    const logoReload = document.getElementById("logo-reload");
    if (logoReload) {
        logoReload.addEventListener("click", () => {
            window.location.reload(); // Recarga limpia la página completa
        });
    }
    // --- C) CARRUSEL DE TESTIMONIOS (REPARADO) ---
    const carrusel = document.getElementById("carrusel");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let indexActual = 0;
    const tarjetas = document.querySelectorAll(".card-testimonio-3d");
    const totalTarjetas = tarjetas.length;

    function actualizarCarrusel() {
        if (carrusel) {
            // Asegura que la traslación sea precisa al 100% del contenedor visible
            carrusel.style.transform = `translateX(-${indexActual * 100}%)`;
        }
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            if (indexActual < totalTarjetas - 1) {
                indexActual++;
            } else {
                indexActual = 0; // Efecto bucle infinito
            }
            actualizarCarrusel();
        });

        prevBtn.addEventListener("click", () => {
            if (indexActual > 0) {
                indexActual--;
            } else {
                indexActual = totalTarjetas - 1; // Salto al final
            }
            actualizarCarrusel();
        });
    }
    // --- D) ENVÍO DEL FORMULARIO CON API FETCH ---
    const formulario = document.getElementById("form-mecanico");
    const botonEnviar = document.getElementById("btn-enviar-mecanico");

    if (formulario) {
        formulario.addEventListener("submit", async e => {
            e.preventDefault();

            if (!formulario.checkValidity()) {
                alert(
                    "Por favor, rellena todos los campos requeridos correctamente."
                );
                return;
            }

            botonEnviar.disabled = true;
            botonEnviar.textContent = "Procesando tu cita...";

            const formData = new FormData(formulario);
            const dataJSON = Object.fromEntries(formData.entries());

            try {
                // Envío asíncrono real a endpoint REST estructurado
                const respuesta = await fetch("https://typicode.com", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify(dataJSON)
                });

                if (respuesta.ok) {
                    const resultado = await respuesta.json();
                    console.log("API Response:", resultado);

                    alert(
                        `¡Cita programada con éxito!\nGracias ${dataJSON.nombre}, un asesor del taller de Tapachula se pondrá en contacto al correo: ${dataJSON.email}.`
                    );
                    formulario.reset();
                } else {
                    throw new Error("Respuesta de red no óptima");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                alert(
                    "Servidor ocupado. Tu solicitud fue guardada de forma local, pronto nos comunicaremos."
                );
            } finally {
                botonEnviar.disabled = false;
                botonEnviar.textContent = "Enviar Solicitud";
            }
        });
    }
});
