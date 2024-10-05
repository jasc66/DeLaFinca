document.addEventListener('DOMContentLoaded', function() {
    // Manejo del menú hamburguesa
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const navPrincipal = document.querySelector('.nav-principal');

    if (menuHamburguesa && navPrincipal) {
        menuHamburguesa.addEventListener('click', function() {
            navPrincipal.classList.toggle('activo');
            menuHamburguesa.classList.toggle('active');
        });
    }

    // Cargar el header dinámicamente
    fetch('src/partials/header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header');
            if (headerContainer) {
                headerContainer.innerHTML = data;

                // Verificar el tipo de página y asignar clase
                const pageType = headerContainer.getAttribute('data-header');
                if (pageType) {
                    const headerElement = document.querySelector('.header');
                    if (headerElement) {
                        headerElement.classList.add(`header-${pageType}`);
                    }
                } else {
                    console.error('No se encontró el atributo data-header en el contenedor.');
                }
            } else {
                console.error('No se encontró el elemento con id="header".');
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
});

//# sourceMappingURL=app.js.map
