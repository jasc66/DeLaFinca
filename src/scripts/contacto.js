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