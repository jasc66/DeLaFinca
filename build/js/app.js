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

let carrito = [];
let platoActual = ''; // Almacenar temporalmente el plato que se selecciona

// Función para abrir el modal y seleccionar cantidad
document.querySelectorAll('.agregar-carrito').forEach(boton => {
    boton.addEventListener('click', function() {
        platoActual = this.dataset.plato;
        document.getElementById('platoSeleccionado').textContent = platoActual;
        document.getElementById('modalCarrito').style.display = 'block';
    });
});

// Cerrar modal de carrito
const cerrarModalCarrito = document.getElementById('cerrarModalCarrito');
if (cerrarModalCarrito) {
    cerrarModalCarrito.addEventListener('click', function() {
        document.getElementById('modalCarrito').style.display = 'none';
    });
}

// Confirmar agregar al carrito
const confirmarAgregar = document.getElementById('confirmarAgregar');
if (confirmarAgregar) {
    confirmarAgregar.addEventListener('click', function() {
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

// Función para mostrar los platos seleccionados en el carrito sin precio
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

// Función para eliminar un plato del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    guardarCarritoEnLocalStorage(); // Actualizar localStorage después de eliminar
    actualizarContadorCarrito(); // Actualizar el contador del carrito después de eliminar
}

// Guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar y mostrar el carrito desde localStorage
function cargarCarrito() {
    const carritoSeleccionados = document.getElementById('carritoSeleccionados');
    carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Obtener el carrito desde localStorage

    if (carritoSeleccionados) {
        carritoSeleccionados.innerHTML = ''; // Limpiar el contenido previo
        carrito.forEach((item, index) => {  
            const p = document.createElement('div');
            p.innerHTML = `
                ${item.cantidad} x ${item.plato}
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
            carritoSeleccionados.appendChild(p);
        });
    }
    actualizarContadorCarrito(); // Actualizar el contador del carrito al cargar
}

// Función para actualizar el número de ítems en el carrito
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('contadorCarrito');
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }
}

// Cargar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);

// ----------------- NUEVAS FUNCIONALIDADES PARA ÍCONO Y MODAL DE CARRITO -------------------

// Referencias al icono y al modal de carrito
const iconoCarrito = document.getElementById('iconoCarrito');
const modalVerCarrito = document.getElementById('modalVerCarrito');
const cerrarModalVerCarrito = document.getElementById('cerrarModalVerCarrito');
const listaCarrito = document.getElementById('listaCarrito');

// Verificamos si el icono del carrito existe antes de agregar el evento
if (iconoCarrito) {
    // Evento para abrir el modal al hacer clic en el icono del carrito
    iconoCarrito.addEventListener('click', function (event) {
        event.preventDefault(); // Evita que el enlace navegue
        mostrarCarritoEnModal(); // Mostrar el contenido del carrito en el modal
        modalVerCarrito.style.display = 'block'; // Mostrar el modal
    });
}

// Evento para cerrar el modal
if (cerrarModalVerCarrito) {
    cerrarModalVerCarrito.addEventListener('click', function () {
        modalVerCarrito.style.display = 'none'; // Ocultar el modal
    });
}

// Mostrar el contenido del carrito en el modal sin precio
function mostrarCarritoEnModal() {
    listaCarrito.innerHTML = ''; // Limpiar antes de mostrar
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                ${item.cantidad} x ${item.plato}
                <button onclick="eliminarDelCarrito(${index}); mostrarCarritoEnModal();">Eliminar</button>`;
            listaCarrito.appendChild(div);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Asegúrate de que el botón existe antes de agregar el event listener
    document.addEventListener('click', function() {
        const confirmarCompra = document.getElementById('confirmarCompra');
        
        if (confirmarCompra) {
            confirmarCompra.addEventListener('click', function() {
                console.log("Botón Confirmar Compra presionado");
                // Redirigir a la página de contacto
                window.location.href = 'contacto.html';
            });
        } else {
            console.error("El botón confirmarCompra no fue encontrado");
        }
    });
});

// Verificar si el formulario de reserva está presente
const formularioReserva = document.getElementById('formularioReserva');
if (formularioReserva) {
    formularioReserva.addEventListener('submit', function(event) {
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

        // Crear el mensaje del carrito sin precio
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let mensajeCarrito = '';
        carrito.forEach(item => {
            mensajeCarrito += `- ${item.cantidad} x ${item.plato}\n`;  // Eliminamos el precio aquí y usamos salto de línea "\n"
        });

        // Crear el mensaje completo para WhatsApp
        var mensaje = `Reserva en De La Finca\n` +
                      `Nombre: ${nombre}\n` +
                      `Teléfono: ${telefono}\n` +
                      `Número de Personas: ${personas}\n` +
                      `Hora: ${hora}\n` +
                      `Fecha: ${fecha}\n` +
                      `Tipo de Reserva: ${tipo}\n` +
                      `Platos Seleccionados:\n${mensajeCarrito}` +
                      `Notas: ${notas}`;

        // Codificar el mensaje correctamente para URL
        var mensajeCodificado = encodeURIComponent(mensaje);

        // Número de teléfono del restaurante sin espacios ni signos
        var telefonoRestaurante = '87109971';  // Cambia este número por el del restaurante

        // Formato correcto para WhatsApp con wa.me (sin signos "+" ni otros caracteres)
        var url = `https://wa.me/506${telefonoRestaurante}?text=${mensajeCodificado}`;
        window.open(url, '_blank');

        // Limpiar el carrito después de enviar el mensaje
        localStorage.removeItem('carrito');  // Limpiar el carrito del localStorage
        mostrarCarrito();  // Actualizar la interfaz (vaciar el carrito)

        // Mostrar el modal de confirmación
        document.getElementById('modalConfirmacion').style.display = 'block';
    });
}

// Cerrar el modal de confirmación
const cerrarModalConfirmacion = document.getElementById('cerrarModalConfirmacion');
if (cerrarModalConfirmacion) {
    cerrarModalConfirmacion.addEventListener('click', function() {
        document.getElementById('modalConfirmacion').style.display = 'none';
    });
}

// Cerrar el modal de horario
const cerrarModalHorario = document.getElementById('cerrarModal');
if (cerrarModalHorario) {
    cerrarModalHorario.addEventListener('click', function() {
        document.getElementById('modalHorario').style.display = 'none';
    });
}

const menuData = [
    {
      category: "Platos Fuertes / Main Dishes / Plats Principaux",
      items: [
        {
          name: "Atún Thai / Thai Tuna",
          price: 10900,
          description: "El más fresco atún aleta amarilla, en una salsa thai de la casa.",
          descriptionEn: "Freshly caught yellowfin tuna topped with our house special Thai sauce.",
          descriptionFr: "Thon Thaï: thon frais dans une sauce Thai de la maison."
        },
        {
          name: "Pasta con Camarones / Shrimp Pasta",
          price: 9900,
          description: "200 gramos de camarón en una salsa de tomate fresco, ajo y crema dulce.",
          descriptionEn: "200 grams of shrimp in a fresh tomato, garlic, and sweet cream sauce.",
          descriptionFr: "Pates aux crevettes: 200gr de crevettes avec une sauce de tomates fraiches, ail et créme fraiche."
        },
        {
          name: "Costilla de Cerdo / Pork Ribs",
          price: 13500,
          description: "500 gramos de costilla tierna de lechón en salsa BBQ de piña.",
          descriptionEn: "500 grams of tender baby back pork ribs topped with our delicious BBQ pineapple sauce."
        },
        {
          name: "Lomito Gorgonzola / Gorgonzola Beef Tenderloin",
          price: 12800,
          description: "200 gramos(7.055 oz) del más suave lomito de res en una salsa de queso gorgonzola.",
          descriptionEn: "200 grams of the most tender beef loin topped with Gorgonzola cheese sauce.",
          descriptionFr: "Longe de boeuf ou Gorgonzola: 200 gr de longe de boeuf très tendre avec une sauce au fromage Gorgonzola."
        },
        {
          name: "Rib-eye",
          price: 16200,
          description: "400 gramos (14.11 oz) del mejor y más jugoso Rib Eye de res, con el mejor chimichurri argentino del mundo.",
          descriptionEn: "The best, the juiciest! Topped with the authentic Argentinian chimichurri sauce.",
          descriptionFr: "400 gr de délicieux faux filet de boeuf, avec le meilleur chimichurri Argentin du monde."
        },
        {
          name: "Churrasco",
          price: 16200,
          description: "400 gramos (14.11 oz) del mejor y más suave churrasco de res con el mejor chimichurri argentino del mundo.",
          descriptionEn: "The juiciest and softest churrasco there is! Topped with authentic Argentinian chimichurri sauce.",
          descriptionFr: "400 gr de churrasco tendre accompagné du meilleur chimichurri Argentin."
        },
        {
          name: "Filet Mignon",
          price: 13500,
          description: "200 gramos (7.055 oz) del más delicioso lomito de res con el mejor chimichurri argentino y tocineta ahumada.",
          descriptionEn: "Beef tenderloin topped with authentic Argentinian chimichurri and smoked bacon.",
          descriptionFr: "200 gr de délicieux filet mignon, chimichurri Argentin et bacon fumé."
        },
        {
          name: "Lomito con camarones / Beef tender loin with shrimp",
          price: 16200,
          description: "200 gramos del más delicioso lomito y camarones en una salsa de Demi-glase.",
          descriptionEn: "200 grams Tender beef loin topped with shrimp in demi-glace sauce.",
          descriptionFr: "Longe de boeuf avec crevettes: 200gr de longe de boeuf et crevettes dans une sauce demi-glace."
        },
        {
          name: "Filet de dorado / Mahi Mahi",
          price: 10900,
          description: "En una salsa tropical de mango y aguacate. Pescado local fresco.",
          descriptionEn: "Fresh local mahi mahi topped with our tropical sauce, made with mango and avocado.",
          descriptionFr: "Filet de dorade avec sauce à la mangue; poisson frais dans une sauce tropicale de mangue et avocat."
        },
        {
          name: "Filet de pollo / Chicken Filet",
          price: 10900,
          description: "Filete de pollo con salsa de hongos frescos.",
          descriptionEn: "Chicken filet topped with delicious fresh mushroom sauce.",
          descriptionFr: "Filet de poulet couvert d'une sauce aux champignons frais."
        }
      ]
    },
    {
      category: "Entradas / Appetizers",
      items: [
        {
          name: "Poke Bowl",
          price: 6900,
          description: "Un bowl relleno de arroz de sushi, mango, aguacate y deliciosos dados de atún fresco marinado con salsa Thai.",
          descriptionEn: "A bowl filled with sushi rice, mango, avocado, and delicious diced fresh tuna marinated in Thai sauce.",
          descriptionFr: "Un bowl rempli de riz à sushi, mangue."
        },
        {
          name: "Tartar de Atún / Tuna Tartare",
          price: 5900,
          description: "Dados de atún fresco, mango y aguacate, marinado con limón y salsa Thai.",
          descriptionEn: "Diced fresh tuna, mango, and avocado marinated in lime juice and Thai sauce.",
          descriptionFr: "Tartare de Thon: dés de thon frais."
        }
      ]
    },
    {
      category: "Wraps / Burritos",
      items: [
        {
          name: "Pollo / Chicken",
          price: 6500,
          description: "Wrap de pollo con lechuga, mango, aguacate y papas salteadas.",
          descriptionEn: "Chicken wrap with lettuce, mango, avocado, and sautéed potatoes."
        },
        {
          name: "Carne / Beef",
          price: 6500,
          description: "Wrap de carne con lechuga, mango, aguacate y papas salteadas.",
          descriptionEn: "Beef wrap with lettuce, mango, avocado, and sautéed potatoes."
        },
        {
          name: "Dorado / Mahi Mahi",
          price: 6500,
          description: "Wrap de dorado a la parrilla con salsa especial y papas salteadas.",
          descriptionEn: "Grilled mahi mahi wrap with special sauce and sautéed potatoes."
        },
        {
          name: "Atún / Tuna",
          price: 6500,
          description: "Wrap de atún fresco con aguacate y papas salteadas.",
          descriptionEn: "Fresh tuna wrap with avocado and sautéed potatoes."
        }
      ]
    },
    {
      category: "Hamburguesas / Hamburgers",
      items: [
        {
          name: "Pollo / Chicken",
          price: 6900,
          description: "Hamburguesa de pollo con lechuga, tomate, aguacate, mango y tocineta, acompañado de papas salteadas.",
          descriptionEn: "Chicken burger with lettuce, tomato, avocado, mango, and bacon, served with sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Carne / Beef",
          price: 6900,
          description: "Hamburguesa de carne con lechuga, tomate, aguacate, mango y tocineta, acompañado de papas salteadas.",
          descriptionEn: "Beef burger with lettuce, tomato, avocado, mango, and bacon, served with sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Dorado / Mahi Mahi",
          price: 6900,
          description: "Hamburguesa de dorado a la parrilla con lechuga, tomate, aguacate y papas salteadas.",
          descriptionEn: "Grilled mahi mahi burger with lettuce, tomato, avocado, and sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Atún / Tuna",
          price: 6900,
          description: "Hamburguesa de atún fresco con lechuga, aguacate, cebolla morada y papas salteadas.",
          descriptionEn: "Fresh tuna burger with lettuce, avocado, red onion, and sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, avocat, oignon rouge, accompagné de pommes de terre sautées."
        }
      ]
    },
    {
      category: "Bebidas Naturales / Natural Drinks",
      items: [
        {
          name: "Piña",
          price: 1500
        },
        {
          name: "Guanábana",
          price: 1500
        },
        {
          name: "Limonada con Hierbabuena",
          price: 1500
        },
        {
          name: "Maracuyá",
          price: 1500
        }
      ]
    },
    {
      category: "Bebidas Gaseosas / Soft Drinks",
      items: [
        {
          name: "Coca-Cola",
          price: 1300
        },
        {
          name: "Fanta",
          price: 1300
        },
        {
          name: "Fresca",
          price: 1300
        }
      ]
    }
  ];
document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');
    const modal = document.getElementById('modalCarrito');
    const closeModal = document.getElementById('cerrarModalCarrito');
    const confirmarAgregar = document.getElementById('confirmarAgregar');
    const cantidadPlato = document.getElementById('cantidadPlato');
    const platoSeleccionado = document.getElementById('platoSeleccionado');
    const carritoLista = document.getElementById('carrito-lista');
    const carritoTotal = document.getElementById('carrito-total');
    let itemSeleccionado = null;
    const carrito = {};

    function renderMenu() {
        const smallCategories = [];
        const largeCategories = [];

        menuData.forEach(category => {
            if (category.items.length <= 3) {
                smallCategories.push(category);
            } else if (category.category === 'Platos Fuertes') {
                const subCategories = splitLargeCategory(category);
                largeCategories.push(...subCategories);
            } else {
                largeCategories.push(category);
            }
        });

        if (smallCategories.length > 0) {
            const combinedSection = document.createElement('section');
            combinedSection.className = 'menu combined-small-categories';
            
            const combinedTitle = document.createElement('h3');
            combinedTitle.textContent = 'Otras Categorías';
            combinedSection.appendChild(combinedTitle);

            const combinedList = document.createElement('ul');
            smallCategories.forEach(category => {
                category.items.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <div class="nombre-precio">
                            <p class="nombre">${item.name}</p>
                            <p class="precio">₡${item.price.toLocaleString()}</p>
                        </div>
                        ${item.description ? `<p class="descripcion">${item.description}</p>` : ''}
                        ${item.descriptionEn ? `<p class="language-en">${item.descriptionEn}</p>` : ''}
                        ${item.descriptionFr ? `<p class="language-fr">${item.descriptionFr}</p>` : ''}
                        <button class="agregar-carrito" data-plato="${item.name}" data-precio="${item.price}">Agregar al Carrito</button>
                    `;
                    combinedList.appendChild(listItem);
                });
            });
            combinedSection.appendChild(combinedList);
            menuContainer.appendChild(combinedSection);
        }

        largeCategories.forEach(category => {
            const categorySection = document.createElement('section');
            categorySection.className = 'menu ' + category.category.toLowerCase().replace(/ /g, '-');
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category.category;
            categorySection.appendChild(categoryTitle);

            const itemList = document.createElement('ul');
            category.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="nombre-precio">
                        <p class="nombre">${item.name}</p>
                        <p class="precio">₡${item.price.toLocaleString()}</p>
                    </div>
                    ${item.description ? `<p class="descripcion">${item.description}</p>` : ''}
                    ${item.descriptionEn ? `<p class="language-en">${item.descriptionEn}</p>` : ''}
                    ${item.descriptionFr ? `<p class="language-fr">${item.descriptionFr}</p>` : ''}
                    <button class="agregar-carrito" data-plato="${item.name}" data-precio="${item.price}">Agregar al Carrito</button>
                `;
                itemList.appendChild(listItem);
            });
            categorySection.appendChild(itemList);
            menuContainer.appendChild(categorySection);
        });
    }

    function splitLargeCategory(category) {
        const subCategories = [];
        const itemsPerSubCategory = 5;
        for (let i = 0; i < category.items.length; i += itemsPerSubCategory) {
            const subCategory = {
                category: `${category.category} ${Math.floor(i / itemsPerSubCategory) + 1}`,
                items: category.items.slice(i, i + itemsPerSubCategory)
            };
            subCategories.push(subCategory);
        }
        return subCategories;
    }

    function openModal(item) {
        itemSeleccionado = item;
        platoSeleccionado.textContent = item.name;
        cantidadPlato.value = '1';
        modal.style.display = 'block';
    }

    function closeModalHandler() {
        modal.style.display = 'none';
    }

    function agregarAlCarrito() {
        const cantidad = parseInt(cantidadPlato.value);
        if (itemSeleccionado && cantidad > 0) {
            if (carrito[itemSeleccionado.name]) {
                carrito[itemSeleccionado.name].cantidad += cantidad;
            } else {
                carrito[itemSeleccionado.name] = {
                    precio: itemSeleccionado.price,
                    cantidad: cantidad
                };
            }
            closeModalHandler();
            actualizarCarritoUI();
        }
    }

    function actualizarCarritoUI() {
        carritoLista.innerHTML = '';
        let total = 0;
        for (const [nombre, item] of Object.entries(carrito)) {
            const li = document.createElement('li');
            li.textContent = `${nombre} x${item.cantidad} - ₡${(item.precio * item.cantidad).toLocaleString()}`;
            carritoLista.appendChild(li);
            total += item.precio * item.cantidad;
        }
        carritoTotal.textContent = `₡${total.toLocaleString()}`;
    }

    menuContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('agregar-carrito')) {
            const plato = e.target.getAttribute('data-plato');
            const precio = parseInt(e.target.getAttribute('data-precio'));
            openModal({name: plato, price: precio});
        }
    });

    closeModal.addEventListener('click', closeModalHandler);
    confirmarAgregar.addEventListener('click', agregarAlCarrito);

    renderMenu();
});

const menuData = [
    {
      category: "Platos Fuertes / Main Dishes / Plats Principaux",
      items: [
        {
          name: "Atún Thai / Thai Tuna",
          price: 10900,
          description: "El más fresco atún aleta amarilla, en una salsa thai de la casa.",
          descriptionEn: "Freshly caught yellowfin tuna topped with our house special Thai sauce.",
          descriptionFr: "Thon Thaï: thon frais dans une sauce Thai de la maison."
        },
        {
          name: "Pasta con Camarones / Shrimp Pasta",
          price: 9900,
          description: "200 gramos de camarón en una salsa de tomate fresco, ajo y crema dulce.",
          descriptionEn: "200 grams of shrimp in a fresh tomato, garlic, and sweet cream sauce.",
          descriptionFr: "Pates aux crevettes: 200gr de crevettes avec une sauce de tomates fraiches, ail et créme fraiche."
        },
        {
          name: "Costilla de Cerdo / Pork Ribs",
          price: 13500,
          description: "500 gramos de costilla tierna de lechón en salsa BBQ de piña.",
          descriptionEn: "500 grams of tender baby back pork ribs topped with our delicious BBQ pineapple sauce."
        },
        {
          name: "Lomito Gorgonzola / Gorgonzola Beef Tenderloin",
          price: 12800,
          description: "200 gramos(7.055 oz) del más suave lomito de res en una salsa de queso gorgonzola.",
          descriptionEn: "200 grams of the most tender beef loin topped with Gorgonzola cheese sauce.",
          descriptionFr: "Longe de boeuf ou Gorgonzola: 200 gr de longe de boeuf très tendre avec une sauce au fromage Gorgonzola."
        },
        {
          name: "Rib-eye",
          price: 16200,
          description: "400 gramos (14.11 oz) del mejor y más jugoso Rib Eye de res, con el mejor chimichurri argentino del mundo.",
          descriptionEn: "The best, the juiciest! Topped with the authentic Argentinian chimichurri sauce.",
          descriptionFr: "400 gr de délicieux faux filet de boeuf, avec le meilleur chimichurri Argentin du monde."
        },
        {
          name: "Churrasco",
          price: 16200,
          description: "400 gramos (14.11 oz) del mejor y más suave churrasco de res con el mejor chimichurri argentino del mundo.",
          descriptionEn: "The juiciest and softest churrasco there is! Topped with authentic Argentinian chimichurri sauce.",
          descriptionFr: "400 gr de churrasco tendre accompagné du meilleur chimichurri Argentin."
        },
        {
          name: "Filet Mignon",
          price: 13500,
          description: "200 gramos (7.055 oz) del más delicioso lomito de res con el mejor chimichurri argentino y tocineta ahumada.",
          descriptionEn: "Beef tenderloin topped with authentic Argentinian chimichurri and smoked bacon.",
          descriptionFr: "200 gr de délicieux filet mignon, chimichurri Argentin et bacon fumé."
        },
        {
          name: "Lomito con camarones / Beef tender loin with shrimp",
          price: 16200,
          description: "200 gramos del más delicioso lomito y camarones en una salsa de Demi-glase.",
          descriptionEn: "200 grams Tender beef loin topped with shrimp in demi-glace sauce.",
          descriptionFr: "Longe de boeuf avec crevettes: 200gr de longe de boeuf et crevettes dans une sauce demi-glace."
        },
        {
          name: "Filet de dorado / Mahi Mahi",
          price: 10900,
          description: "En una salsa tropical de mango y aguacate. Pescado local fresco.",
          descriptionEn: "Fresh local mahi mahi topped with our tropical sauce, made with mango and avocado.",
          descriptionFr: "Filet de dorade avec sauce à la mangue; poisson frais dans une sauce tropicale de mangue et avocat."
        },
        {
          name: "Filet de pollo / Chicken Filet",
          price: 10900,
          description: "Filete de pollo con salsa de hongos frescos.",
          descriptionEn: "Chicken filet topped with delicious fresh mushroom sauce.",
          descriptionFr: "Filet de poulet couvert d'une sauce aux champignons frais."
        }
      ]
    },
    {
      category: "Entradas / Appetizers",
      items: [
        {
          name: "Poke Bowl",
          price: 6900,
          description: "Un bowl relleno de arroz de sushi, mango, aguacate y deliciosos dados de atún fresco marinado con salsa Thai.",
          descriptionEn: "A bowl filled with sushi rice, mango, avocado, and delicious diced fresh tuna marinated in Thai sauce.",
          descriptionFr: "Un bowl rempli de riz à sushi, mangue."
        },
        {
          name: "Tartar de Atún / Tuna Tartare",
          price: 5900,
          description: "Dados de atún fresco, mango y aguacate, marinado con limón y salsa Thai.",
          descriptionEn: "Diced fresh tuna, mango, and avocado marinated in lime juice and Thai sauce.",
          descriptionFr: "Tartare de Thon: dés de thon frais."
        }
      ]
    },
    {
      category: "Wraps / Burritos",
      items: [
        {
          name: "Pollo / Chicken",
          price: 6500,
          description: "Wrap de pollo con lechuga, mango, aguacate y papas salteadas.",
          descriptionEn: "Chicken wrap with lettuce, mango, avocado, and sautéed potatoes."
        },
        {
          name: "Carne / Beef",
          price: 6500,
          description: "Wrap de carne con lechuga, mango, aguacate y papas salteadas.",
          descriptionEn: "Beef wrap with lettuce, mango, avocado, and sautéed potatoes."
        },
        {
          name: "Dorado / Mahi Mahi",
          price: 6500,
          description: "Wrap de dorado a la parrilla con salsa especial y papas salteadas.",
          descriptionEn: "Grilled mahi mahi wrap with special sauce and sautéed potatoes."
        },
        {
          name: "Atún / Tuna",
          price: 6500,
          description: "Wrap de atún fresco con aguacate y papas salteadas.",
          descriptionEn: "Fresh tuna wrap with avocado and sautéed potatoes."
        }
      ]
    },
    {
      category: "Hamburguesas / Hamburgers",
      items: [
        {
          name: "Pollo / Chicken",
          price: 6900,
          description: "Hamburguesa de pollo con lechuga, tomate, aguacate, mango y tocineta, acompañado de papas salteadas.",
          descriptionEn: "Chicken burger with lettuce, tomato, avocado, mango, and bacon, served with sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Carne / Beef",
          price: 6900,
          description: "Hamburguesa de carne con lechuga, tomate, aguacate, mango y tocineta, acompañado de papas salteadas.",
          descriptionEn: "Beef burger with lettuce, tomato, avocado, mango, and bacon, served with sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Dorado / Mahi Mahi",
          price: 6900,
          description: "Hamburguesa de dorado a la parrilla con lechuga, tomate, aguacate y papas salteadas.",
          descriptionEn: "Grilled mahi mahi burger with lettuce, tomato, avocado, and sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, tomate, avocat, mangue et bacon, accompagné de pommes de terre sautées."
        },
        {
          name: "Atún / Tuna",
          price: 6900,
          description: "Hamburguesa de atún fresco con lechuga, aguacate, cebolla morada y papas salteadas.",
          descriptionEn: "Fresh tuna burger with lettuce, avocado, red onion, and sautéed potatoes.",
          descriptionFr: "Tortilla de blé, laitue, avocat, oignon rouge, accompagné de pommes de terre sautées."
        }
      ]
    },
    {
      category: "Bebidas Naturales / Natural Drinks",
      items: [
        {
          name: "Piña",
          price: 1500
        },
        {
          name: "Guanábana",
          price: 1500
        },
        {
          name: "Limonada con Hierbabuena",
          price: 1500
        },
        {
          name: "Maracuyá",
          price: 1500
        }
      ]
    },
    {
      category: "Bebidas Gaseosas / Soft Drinks",
      items: [
        {
          name: "Coca-Cola",
          price: 1300
        },
        {
          name: "Fanta",
          price: 1300
        },
        {
          name: "Fresca",
          price: 1300
        }
      ]
    }
  ];
//# sourceMappingURL=app.js.map
