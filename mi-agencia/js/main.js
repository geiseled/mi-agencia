// ===== MAIN.JS - OxiAndina =====
// Funcionalidades principales del sitio web

// Ejecutar cuando el DOM estE completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('OxiAndina - Sistema cargado correctamente');
    
    // Inicializar animaciones
    initAnimations();
    
    // Inicializar navegacion activa
    highlightActiveNavLink();
    
    // Agregar smooth scroll a los enlaces
    initSmoothScroll();
});

//ANIMACIONES AL HACER SCROLL
function initAnimations() {
    const elements = document.querySelectorAll('.feature, .producto-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// DESTACAR ENLACE DE NAVEGACION ACTIVO
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        // Remover clase activo de todos
        link.classList.remove('activo');
        
        // Agregar clase activo al enlace correspondiente
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('activo');
        }
    });
}

//SMOOTH SCROLL PARA ENLACES INTERNOS 
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// FUNCIONES UTILITARIAS 

// Mostrar mensaje de éxito o error
function mostrarMensaje(mensaje, tipo = 'exito') {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje mensaje-${tipo}`;
    mensajeDiv.textContent = mensaje;
    
    // Insertar al inicio del body o en un contenedor específico
    const container = document.querySelector('.formulario-container') || document.body;
    container.insertBefore(mensajeDiv, container.firstChild);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        mensajeDiv.remove();
    }, 5000);
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar teléfono peruano
function validarTelefono(telefono) {
    // Acepta formatos: 987654321, +51987654321, 054123456
    const regex = /^(\+51)?[9][0-9]{8}$|^[0-9]{6,9}$/;
    return regex.test(telefono.replace(/\s/g, ''));
}

// Formatear precio en soles peruanos
function formatearPrecio(precio) {
    return `S/ ${parseFloat(precio).toFixed(2)}`;
}

// Exportar funciones para uso en otros scripts
window.OxiAndina = {
    mostrarMensaje,
    validarEmail,
    validarTelefono,
    formatearPrecio
};
