let currentFontSize = 16;

window.toggleContrast = function() {
    document.body.classList.toggle('high-contrast');
};

window.increaseFontSize = function() {
    currentFontSize += 2;
    document.body.style.fontSize = currentFontSize + 'px';
};

window.decreaseFontSize = function() {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.body.style.fontSize = currentFontSize + 'px';
    }
};

window.resetStyles = function() {
    document.body.style.fontSize = '16px';
    document.body.classList.remove('high-contrast', 'light-mode', 'dark-mode');
    currentFontSize = 16;
};

window.changeToLight = function() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
};

window.changeToDark = function() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
};

document.addEventListener('DOMContentLoaded', function () {
    // Cargar el header dinámicamente
    fetch('src/partials/header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header');
            if (headerContainer) {
                headerContainer.innerHTML = data;

                // Obtener el valor de data-header para cambiar la clase y el texto
                const headerElement = document.querySelector('#header');
                const pageType = headerElement ? headerElement.getAttribute('data-header') : null;

                if (pageType) {
                    // Asignar la clase específica al header
                    headerElement.classList.add(`header-${pageType}`);

                    // Cambiar el texto del h1 basado en la página
                    const textoHeader = document.querySelector('.texto-header h1');
                    if (textoHeader) {
                        switch (pageType) {
                            case 'inicio':
                                textoHeader.textContent = 'Descubre una experiencia culinaria inolvidable';
                                break;
                            case 'nosotros':
                                textoHeader.textContent = 'Conoce nuestra historia y pasión por la gastronomía';
                                break;
                            case 'proceso':
                                textoHeader.textContent = 'Nuestro proceso: del campo a tu mesa';
                                break;
                            case 'menu':
                                textoHeader.textContent = 'Explora nuestro delicioso menú';
                                break;
                            case 'galeria':
                                textoHeader.textContent = 'Una galería de sabores y experiencias';
                                break;
                            case 'contacto':
                                textoHeader.textContent = 'Contáctanos para una experiencia personalizada';
                                break;
                            default:
                                textoHeader.textContent = 'Bienvenido a De La Finca';
                        }
                    }
                } else {
                    console.error('No se encontró el atributo data-header en el header.');
                }

                // Después de cargar el header, configuramos el menú hamburguesa
                const menuHamburguesa = document.querySelector('.menu-hamburguesa');
                const navPrincipal = document.querySelector('.nav-principal');

                if (menuHamburguesa && navPrincipal) {
                    menuHamburguesa.addEventListener('click', function () {
                        navPrincipal.classList.toggle('activo');
                        menuHamburguesa.classList.toggle('active');
                    });
                } else {
                    console.error('No se encontró el menú hamburguesa o la navegación principal.');
                }

            } else {
                console.error('No se encontró el elemento con id="header"');
            }
        })
        .catch(error => console.error('Error cargando el header:', error));

    // Cargar el footer dinámicamente
    fetch('src/partials/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerElement = document.getElementById('footer');
            if (footerElement) {
                footerElement.innerHTML = data;
            } else {
                console.error('No se encontró el elemento con id="footer"');
            }
        })
        .catch(error => console.error('Error cargando el footer:', error));


        // Cargar la barra de accesibilidad dinámicamente
    
});

document.getElementById('formularioReserva').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita el envío normal del formulario
    
    // Capturar los datos del formulario
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var personas = document.getElementById('personas').value;
    var hora = document.getElementById('hora').value;
    var fecha = document.getElementById('fecha').value;
    var tipo = document.getElementById('tipo').value;
    var notas = document.getElementById('notas').value;

    // Validación del horario según el día de la semana
    var fechaSeleccionada = new Date(fecha);
    var diaSemana = fechaSeleccionada.getUTCDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    var horaSeleccionada = parseInt(hora.replace(":", ""), 10); // Convertir hora a entero para comparar
    
    // Definir horarios permitidos
    var horarioMinLunVie = 1200; // 12:00 PM
    var horarioMaxLunVie = 2200; // 10:00 PM
    var horarioMinSabado = 1700; // 5:00 PM
    var horarioMaxSabado = 2200; // 10:00 PM

    var mensajeError = '';

    if (diaSemana >= 1 && diaSemana <= 5) { // Lunes a Viernes
        if (horaSeleccionada < horarioMinLunVie || horaSeleccionada > horarioMaxLunVie) {
            mensajeError = "El horario de reserva de lunes a viernes es de 12:00 PM a 10:00 PM.";
        }
    } else if (diaSemana == 6) { // Sábado
        if (horaSeleccionada < horarioMinSabado || horaSeleccionada > horarioMaxSabado) {
            mensajeError = "El horario de reserva el sábado es de 5:00 PM a 10:00 PM.";
        }
    } else {
        mensajeError = "El restaurante no acepta reservas los domingos.";
    }

    // Mostrar error si existe
    if (mensajeError) {
        document.getElementById('mensajeHorario').innerText = mensajeError;
        document.getElementById('modalHorario').style.display = 'block';
        return;
    }

    // Crear el mensaje para WhatsApp
    var mensaje = `*Reserva en De La Finca*%0A` +
                  `*Nombre:* ${nombre}%0A` +
                  `*Teléfono:* ${telefono}%0A` +
                  `*Número de Personas:* ${personas}%0A` +
                  `*Hora:* ${hora}%0A` +
                  `*Fecha:* ${fecha}%0A` +
                  `*Tipo de Reserva:* ${tipo}%0A` +
                  `*Notas:* ${notas}`;
    
    // Número de teléfono del restaurante
    var telefonoRestaurante = '88260107';  // Cambia este número por el del restaurante

    // Redirigir a WhatsApp
    var url = `https://api.whatsapp.com/send?phone=${telefonoRestaurante}&text=${mensaje}`;
    window.open(url, '_blank');
});

// Cerrar el modal
document.getElementById('cerrarModal').addEventListener('click', function() {
    document.getElementById('modalHorario').style.display = 'none';
});
//# sourceMappingURL=app.js.map
