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

//# sourceMappingURL=app.js.map
