// registro.js - Logica del formulario de registro

document.addEventListener('DOMContentLoaded', function() {
    const btnNatural = document.getElementById('btn-natural');
    const btnEmpresa = document.getElementById('btn-empresa');
    const camposNatural = document.getElementById('campos-natural');
    const camposEmpresa = document.getElementById('campos-empresa');
    const tipoClienteInput = document.getElementById('tipo_cliente');
    const formRegistro = document.getElementById('form-registro');

    // Toggle entre Persona Natural y Empresa
    btnNatural.addEventListener('click', function() {
        activarTipo('natural');
    });

    btnEmpresa.addEventListener('click', function() {
        activarTipo('empresa');
    });

    function activarTipo(tipo) {
        if (tipo === 'natural') {
            btnNatural.classList.add('activo');
            btnEmpresa.classList.remove('activo');
            camposNatural.style.display = 'block';
            camposEmpresa.style.display = 'none';
            tipoClienteInput.value = 'natural';
            
            // Hacer requeridos los campos de persona natural
            document.getElementById('nombres').required = true;
            document.getElementById('apellidos').required = true;
            document.getElementById('dni').required = true;
            
            // Quitar requeridos de empresa
            document.getElementById('razon_social').required = false;
            document.getElementById('ruc').required = false;
            document.getElementById('representante').required = false;
        } else {
            btnEmpresa.classList.add('activo');
            btnNatural.classList.remove('activo');
            camposEmpresa.style.display = 'block';
            camposNatural.style.display = 'none';
            tipoClienteInput.value = 'empresa';
            
            // Hacer requeridos los campos de empresa
            document.getElementById('razon_social').required = true;
            document.getElementById('ruc').required = true;
            document.getElementById('representante').required = true;
            
            // Quitar requeridos de persona natural
            document.getElementById('nombres').required = false;
            document.getElementById('apellidos').required = false;
            document.getElementById('dni').required = false;
        }
    }

    // Validacion y envio del formulario
    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validarFormularioRegistro()) {
            return;
        }

        // Recopilar datos del formulario
        const formData = new FormData(formRegistro);
        const datos = {};
        
        formData.forEach((value, key) => {
            datos[key] = value;
        });

        // Agregar timestamp
        datos.fecha_registro = new Date().toISOString();
        datos.id = Date.now();

        // Enviar al servidor
        enviarRegistro(datos);
    });

    function validarFormularioRegistro() {
        const tipo = tipoClienteInput.value;
        let esValido = true;

        // Limpiar errores previos
        if (window.OxiAndina && window.OxiAndina.limpiarErrores) {
            window.OxiAndina.limpiarErrores();
        }

        // Validar segun tipo de cliente
        if (tipo === 'natural') {
            const nombres = document.getElementById('nombres').value.trim();
            const apellidos = document.getElementById('apellidos').value.trim();
            const dni = document.getElementById('dni').value.trim();

            if (nombres.length < 2) {
                mostrarError('nombres', 'Los nombres deben tener al menos 2 caracteres');
                esValido = false;
            }

            if (apellidos.length < 2) {
                mostrarError('apellidos', 'Los apellidos deben tener al menos 2 caracteres');
                esValido = false;
            }

            if (!window.OxiAndina.validarDNI(dni)) {
                mostrarError('dni', 'El DNI debe tener 8 digitos numericos');
                esValido = false;
            }
        } else {
            const razonSocial = document.getElementById('razon_social').value.trim();
            const ruc = document.getElementById('ruc').value.trim();
            const representante = document.getElementById('representante').value.trim();

            if (razonSocial.length < 3) {
                mostrarError('razon_social', 'La razon social debe tener al menos 3 caracteres');
                esValido = false;
            }

            if (!window.OxiAndina.validarRUC(ruc)) {
                mostrarError('ruc', 'El RUC debe tener 11 digitos numericos');
                esValido = false;
            }

            if (representante.length < 3) {
                mostrarError('representante', 'El nombre del representante debe tener al menos 3 caracteres');
                esValido = false;
            }
        }

        // Validar campos comunes
        const email = document.getElementById('email_registro').value.trim();
        const telefono = document.getElementById('telefono_registro').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const terminos = document.getElementById('terminos').checked;

        if (!window.OxiAndina.validarEmail(email)) {
            mostrarError('email_registro', 'Ingresa un email valido');
            esValido = false;
        }

        if (!window.OxiAndina.validarTelefono(telefono)) {
            mostrarError('telefono_registro', 'Ingresa un telefono valido (9 digitos)');
            esValido = false;
        }

        if (direccion.length < 10) {
            mostrarError('direccion', 'La direccion debe tener al menos 10 caracteres');
            esValido = false;
        }

        if (!terminos) {
            alert('Debes aceptar los terminos y condiciones');
            esValido = false;
        }

        return esValido;
    }

    function mostrarError(campoId, mensaje) {
        if (window.OxiAndina && window.OxiAndina.mostrarError) {
            window.OxiAndina.mostrarError(campoId, mensaje);
        } else {
            alert(mensaje);
        }
    }

    function enviarRegistro(datos) {
        fetch('http://localhost:8000/api/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
            } else {
                alert('Registro exitoso! Bienvenido a OxiAndina.\n\nTu ID de cliente es: ' + data.id);
                formRegistro.reset();
                activarTipo('natural');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al procesar el registro. Por favor intenta nuevamente.');
        });
    }

    // Formateo automatico de DNI
    document.getElementById('dni').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });

    // Formateo automatico de RUC
    document.getElementById('ruc').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });

    // Formateo automatico de telefono
    document.getElementById('telefono_registro').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
    });
});
