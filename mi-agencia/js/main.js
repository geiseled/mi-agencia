// MAIN.JS - OxiAndina
// Funcionalidades principales del sitio web

document.addEventListener('DOMContentLoaded', function() {
    console.log('OxiAndina - Sistema cargado correctamente');
    
    initAnimations();
    highlightActiveNavLink();
    initSmoothScroll();
});

// Animaciones al hacer scroll
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

// Destacar enlace de navegacion activo
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        link.classList.remove('activo');
        
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('activo');
        }
    });
}

// Smooth scroll para enlaces internos
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

// Mostrar mensaje de exito o error
function mostrarMensaje(mensaje, tipo = 'exito') {
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje mensaje-${tipo}`;
    mensajeDiv.textContent = mensaje;
    
    const container = document.querySelector('.formulario-container') || document.body;
    container.insertBefore(mensajeDiv, container.firstChild);
    
    setTimeout(() => {
        mensajeDiv.remove();
    }, 5000);
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar telefono peruano
function validarTelefono(telefono) {
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
