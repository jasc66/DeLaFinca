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
        var mensaje = `*Reserva en De La Finca*\n` +
                      `*Nombre:* ${nombre}\n` +
                      `*Teléfono:* ${telefono}\n` +
                      `*Número de Personas:* ${personas}\n` +
                      `*Hora:* ${hora}\n` +
                      `*Fecha:* ${fecha}\n` +
                      `*Tipo de Reserva:* ${tipo}\n` +
                      `*Platos Seleccionados:*\n${mensajeCarrito}` +
                      `*Notas:* ${notas}`;

        // Codificar el mensaje correctamente para URL
        var mensajeCodificado = encodeURIComponent(mensaje);

        // Número de teléfono del restaurante
        var telefonoRestaurante = '87109971';  // Cambia este número por el del restaurante

        // Redirigir a WhatsApp usando el formato correcto
        var url = `https://wa.me/${telefonoRestaurante}?text=${mensajeCodificado}`;
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
