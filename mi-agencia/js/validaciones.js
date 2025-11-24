// validaciones.js - Funciones de validacion para formularios

// Validar DNI peruano (8 digitos)
function validarDNI(dni) {
    const regex = /^[0-9]{8}$/;
    return regex.test(dni.replace(/\s/g, ''));
}

// Validar RUC peruano (11 digitos)
function validarRUC(ruc) {
    const regex = /^[0-9]{11}$/;
    return regex.test(ruc.replace(/\s/g, ''));
}

// Validar que el nombre tenga solo letras y espacios
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre) && nombre.trim().length >= 3;
}

// Validar formato de fecha (DD/MM/YYYY)
function validarFecha(fecha) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(fecha);
}

// Validar que sea mayor de edad
function esMayorDeEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        return edad - 1 >= 18;
    }
    return edad >= 18;
}

// Validar direccion (minimo 10 caracteres)
function validarDireccion(direccion) {
    return direccion.trim().length >= 10;
}

// Mostrar error en campo especifico
function mostrarError(campoId, mensaje) {
    const campo = document.getElementById(campoId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'mensaje mensaje-error';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = mensaje;
    
    // Remover error anterior si existe
    const errorAnterior = campo.parentElement.querySelector('.mensaje-error');
    if (errorAnterior) {
        errorAnterior.remove();
    }
    
    campo.parentElement.appendChild(errorDiv);
    campo.focus();
    
    // Remover error despues de 3 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Limpiar todos los errores
function limpiarErrores() {
    const errores = document.querySelectorAll('.mensaje-error');
    errores.forEach(error => error.remove());
}

// Validar formulario completo
function validarFormulario(formId) {
    limpiarErrores();
    const form = document.getElementById(formId);
    const campos = form.querySelectorAll('input[required], textarea[required], select[required]');
    let esValido = true;
    
    campos.forEach(campo => {
        if (!campo.value.trim()) {
            mostrarError(campo.id, 'Este campo es obligatorio');
            esValido = false;
        }
    });
    
    return esValido;
}

// Formatear telefono peruano
function formatearTelefono(telefono) {
    telefono = telefono.replace(/\D/g, '');
    if (telefono.length === 9) {
        return `${telefono.slice(0, 3)} ${telefono.slice(3, 6)} ${telefono.slice(6)}`;
    }
    return telefono;
}

// Formatear DNI
function formatearDNI(dni) {
    dni = dni.replace(/\D/g, '');
    if (dni.length === 8) {
        return `${dni.slice(0, 4)} ${dni.slice(4)}`;
    }
    return dni;
}

// Formatear RUC
function formatearRUC(ruc) {
    ruc = ruc.replace(/\D/g, '');
    if (ruc.length === 11) {
        return `${ruc.slice(0, 2)}-${ruc.slice(2)}`;
    }
    return ruc;
}

// Agregar las funciones al objeto global OxiAndina si existe
if (typeof window.OxiAndina !== 'undefined') {
    Object.assign(window.OxiAndina, {
        validarDNI,
        validarRUC,
        validarNombre,
        validarFecha,
        esMayorDeEdad,
        validarDireccion,
        mostrarError,
        limpiarErrores,
        validarFormulario,
        formatearTelefono,
        formatearDNI,
        formatearRUC
    });
}
