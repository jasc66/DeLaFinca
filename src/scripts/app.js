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

                // Configurar el menú hamburguesa
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

                // Ahora que el header ha sido cargado, ejecutamos las funcionalidades del carrito
                iniciarCarrito();
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
});

function iniciarCarrito() {
    let carrito = [];
    let platoActual = ''; // Almacenar temporalmente el plato que se selecciona

    // Función para abrir el modal y seleccionar cantidad
    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', function () {
            platoActual = this.dataset.plato;
            document.getElementById('platoSeleccionado').textContent = platoActual;
            document.getElementById('modalCarrito').style.display = 'block';
        });
    });

    // Cerrar modal de carrito
    const cerrarModalCarrito = document.getElementById('cerrarModalCarrito');
    if (cerrarModalCarrito) {
        cerrarModalCarrito.addEventListener('click', function () {
            document.getElementById('modalCarrito').style.display = 'none';
        });
    }

    // Confirmar agregar al carrito
    const confirmarAgregar = document.getElementById('confirmarAgregar');
    if (confirmarAgregar) {
        confirmarAgregar.addEventListener('click', function () {
            const cantidad = document.getElementById('cantidadPlato').value;
            // Validar que la cantidad sea mayor a 0
            if (cantidad > 0) {
                carrito.push({ plato: platoActual, cantidad });
                document.getElementById('modalCarrito').style.display = 'none';
                mostrarCarrito();
                guardarCarritoEnLocalStorage(); // Guardar en localStorage después de agregar al carrito
                actualizarContadorCarrito(); // Actualizar el contador del carrito
            } else {
                alert('La cantidad debe ser mayor que 0');
            }
        });
    }

    // Mostrar los platos seleccionados en el carrito
    function mostrarCarrito() {
        const carritoSeleccionados = document.getElementById('carritoSeleccionados');
        if (carritoSeleccionados) {
            carritoSeleccionados.innerHTML = ''; // Limpiar el carrito antes de actualizar

            carrito.forEach((item, index) => {
                const div = document.createElement('div');
                div.innerHTML = `
                    ${item.cantidad} x ${item.plato} 
                    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
                carritoSeleccionados.appendChild(div);
            });
        }
    }

    // Eliminar plato del carrito
    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        mostrarCarrito();
        guardarCarritoEnLocalStorage();
        actualizarContadorCarrito();
    }

    // Guardar en localStorage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Cargar carrito desde localStorage
    function cargarCarrito() {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        mostrarCarrito();
        actualizarContadorCarrito();
    }

    // Actualizar el número de ítems en el carrito
    function actualizarContadorCarrito() {
        const contadorCarrito = document.getElementById('contadorCarrito');
        if (contadorCarrito) {
            contadorCarrito.textContent = carrito.length;
        }
    }

    // Evento para desplegar el menú del carrito
    const iconoCarrito = document.getElementById('iconoCarrito');
    const carritoDesplegable = document.getElementById('carritoDesplegable');

    // Verificar el estado del carrito en localStorage
    const estadoCarrito = localStorage.getItem('carritoAbierto') === 'true';

    // Establecer el estado inicial del carrito
    if (estadoCarrito) {
        carritoDesplegable.style.display = 'block';
    } else {
        carritoDesplegable.style.display = 'none';
    }

    if (iconoCarrito) {
        iconoCarrito.addEventListener('click', function (event) {
            event.preventDefault();
            const nuevoEstado = carritoDesplegable.style.display === 'none' ? 'block' : 'none';
            carritoDesplegable.style.display = nuevoEstado;

            // Guardar el estado del carrito en el localStorage
            localStorage.setItem('carritoAbierto', nuevoEstado === 'block');
        });
    }

    // Cerrar el menú desplegable si se hace clic fuera de él
    document.addEventListener('click', function (event) {
        if (iconoCarrito && carritoDesplegable && !iconoCarrito.contains(event.target) && !carritoDesplegable.contains(event.target)) {
            carritoDesplegable.style.display = 'none';
            // Guardar el estado cerrado del carrito
            localStorage.setItem('carritoAbierto', false);
        }
    });

    // Cargar el carrito cuando la página esté lista
    cargarCarrito();
}
