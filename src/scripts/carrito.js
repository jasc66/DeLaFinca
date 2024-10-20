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
