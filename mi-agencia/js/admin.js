// admin.js - Panel administrativo

const PASSWORD_ADMIN = 'admin123';

document.addEventListener('DOMContentLoaded', function() {
    const formLogin = document.getElementById('form-login');
    const loginScreen = document.getElementById('login-screen');
    const adminPanel = document.getElementById('admin-panel');

    // Login
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;

        if (password === PASSWORD_ADMIN) {
            loginScreen.style.display = 'none';
            adminPanel.style.display = 'block';
            cargarDatos();
            inicializarTabs();
        } else {
            alert('Contrasena incorrecta');
        }
    });
});

function cerrarSesion() {
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('password').value = '';
}

function inicializarTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('activo'));
            tabContents.forEach(c => c.classList.remove('activo'));

            this.classList.add('activo');
            document.getElementById('tab-' + tabId).classList.add('activo');
        });
    });
}

function cargarDatos() {
    cargarClientes();
    cargarMensajes();
}

function cargarClientes() {
    fetch('http://localhost:8000/api/clientes')
        .then(response => response.json())
        .then(clientes => {
            mostrarClientes(clientes);
            actualizarEstadisticas(clientes);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('tabla-clientes').innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 40px; color: #e74c3c;">
                        Error al cargar clientes. Asegurate de que el servidor este corriendo.
                    </td>
                </tr>
            `;
        });
}

function mostrarClientes(clientes) {
    const tbody = document.getElementById('tabla-clientes');

    if (clientes.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 40px;">
                    No hay clientes registrados aun
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = '';
    clientes.forEach(cliente => {
        const fecha = new Date(cliente.fecha_registro).toLocaleDateString('es-PE');
        const nombre = cliente.tipo_cliente === 'natural' 
            ? `${cliente.nombres} ${cliente.apellidos}`
            : cliente.razon_social;
        const documento = cliente.tipo_cliente === 'natural' 
            ? cliente.dni 
            : cliente.ruc;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cliente.id}</td>
            <td>
                <span class="badge badge-${cliente.tipo_cliente}">
                    ${cliente.tipo_cliente === 'natural' ? 'Persona' : 'Empresa'}
                </span>
            </td>
            <td>${nombre}</td>
            <td>${documento}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefono}</td>
            <td>${cliente.ciudad}</td>
            <td>${fecha}</td>
            <td>
                <button class="btn-action btn-view" onclick='verCliente(${JSON.stringify(cliente)})'>Ver</button>
                <button class="btn-action btn-delete" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function cargarMensajes() {
    fetch('http://localhost:8000/api/mensajes')
        .then(response => response.json())
        .then(mensajes => {
            mostrarMensajes(mensajes);
            document.getElementById('stat-mensajes').textContent = mensajes.length;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('tabla-mensajes').innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 40px; color: #e74c3c;">
                        Error al cargar mensajes
                    </td>
                </tr>
            `;
        });
}

function mostrarMensajes(mensajes) {
    const tbody = document.getElementById('tabla-mensajes');

    if (mensajes.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px;">
                    No hay mensajes aun
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = '';
    mensajes.forEach(mensaje => {
        const fecha = new Date(mensaje.fecha).toLocaleDateString('es-PE');
        const mensajeCorto = mensaje.mensaje.length > 50 
            ? mensaje.mensaje.substring(0, 50) + '...'
            : mensaje.mensaje;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${mensaje.id}</td>
            <td>${mensaje.nombre}</td>
            <td>${mensaje.email}</td>
            <td>${mensaje.telefono}</td>
            <td>${mensaje.asunto}</td>
            <td>${mensajeCorto}</td>
            <td>${fecha}</td>
            <td>
                <button class="btn-action btn-view" onclick='verMensaje(${JSON.stringify(mensaje)})'>Ver</button>
                <button class="btn-action btn-delete" onclick="eliminarMensaje(${mensaje.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function actualizarEstadisticas(clientes) {
    const totalClientes = clientes.length;
    const personas = clientes.filter(c => c.tipo_cliente === 'natural').length;
    const empresas = clientes.filter(c => c.tipo_cliente === 'empresa').length;

    document.getElementById('stat-clientes').textContent = totalClientes;
    document.getElementById('stat-personas').textContent = personas;
    document.getElementById('stat-empresas').textContent = empresas;
}

function verCliente(cliente) {
    let detalles = `DATOS DEL CLIENTE\n\n`;
    detalles += `ID: ${cliente.id}\n`;
    detalles += `Tipo: ${cliente.tipo_cliente === 'natural' ? 'Persona Natural' : 'Empresa'}\n\n`;

    if (cliente.tipo_cliente === 'natural') {
        detalles += `Nombres: ${cliente.nombres}\n`;
        detalles += `Apellidos: ${cliente.apellidos}\n`;
        detalles += `DNI: ${cliente.dni}\n`;
    } else {
        detalles += `Razon Social: ${cliente.razon_social}\n`;
        detalles += `RUC: ${cliente.ruc}\n`;
        detalles += `Representante: ${cliente.representante}\n`;
    }

    detalles += `\nEmail: ${cliente.email}\n`;
    detalles += `Telefono: ${cliente.telefono}\n`;
    detalles += `Direccion: ${cliente.direccion}\n`;
    detalles += `Ciudad: ${cliente.ciudad}\n`;
    detalles += `Motivo: ${cliente.motivo}\n`;

    if (cliente.observaciones) {
        detalles += `\nObservaciones: ${cliente.observaciones}\n`;
    }

    detalles += `\nFecha de registro: ${new Date(cliente.fecha_registro).toLocaleString('es-PE')}`;

    alert(detalles);
}

function verMensaje(mensaje) {
    let detalles = `MENSAJE DE CONTACTO\n\n`;
    detalles += `ID: ${mensaje.id}\n`;
    detalles += `Nombre: ${mensaje.nombre}\n`;
    detalles += `Email: ${mensaje.email}\n`;
    detalles += `Telefono: ${mensaje.telefono}\n`;
    detalles += `Asunto: ${mensaje.asunto}\n\n`;
    detalles += `Mensaje:\n${mensaje.mensaje}\n\n`;
    detalles += `Fecha: ${new Date(mensaje.fecha).toLocaleString('es-PE')}`;

    alert(detalles);
}

function eliminarCliente(id) {
    if (!confirm('¿Estas seguro de eliminar este cliente?')) {
        return;
    }

    fetch(`http://localhost:8000/api/clientes/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Cliente eliminado exitosamente');
        cargarClientes();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al eliminar cliente');
    });
}

function eliminarMensaje(id) {
    if (!confirm('¿Estas seguro de eliminar este mensaje?')) {
        return;
    }

    fetch(`http://localhost:8000/api/mensajes/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Mensaje eliminado exitosamente');
        cargarMensajes();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al eliminar mensaje');
    });
}
