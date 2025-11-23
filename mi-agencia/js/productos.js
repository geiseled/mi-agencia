// Sistema de gestion de productos OxiAndina mediante una lista

const productosOxiAndina = [
    {
        id: 1,
        nombre: "Balon de Oxigeno 10m3",
        categoria: "medicinal",
        capacidad: "10m3",
        descripcion: "Balon de oxigeno medicinal de alta pureza (99.9%) para uso hospitalario y domiciliario. Ideal para tratamientos prolongados y terapias respiratorias continuas.",
        precio: 350,
        imagen: "images/balon-10m3.webp",
        caracteristicas: [
            "Pureza 99.9%",
            "Certificacion DIGEMID",
            "Incluye regulador y manometro",
            "Duracion aproximada: 50-70 horas"
        ],
        disponible: true
    },
    {
        id: 2,
        nombre: "Balon de Oxigeno 6m3",
        categoria: "medicinal",
        capacidad: "6m3",
        descripcion: "Balon compacto ideal para uso ocasional y terapias de corta duracion. Portable y facil de transportar, perfecto para uso domiciliario.",
        precio: 250,
        imagen: "images/balon-6m3.webp",
        caracteristicas: [
            "Pureza 99.9%",
            "Portable y liviano",
            "Incluye regulador",
            "Duracion aproximada: 30-40 horas"
        ],
        disponible: true
    },
    {
        id: 3,
        nombre: "Concentrador de Oxigeno Portatil",
        categoria: "equipos",
        capacidad: "5L/min",
        descripcion: "Equipo de ultima generacion que genera oxigeno de forma continua sin necesidad de recarga. Bajo consumo electrico y altamente confiable.",
        precio: 2500,
        imagen: "images/concentrador.webp",
        caracteristicas: [
            "Genera oxigeno continuo",
            "Flujo: 1-5 litros/minuto",
            "Bajo consumo electrico",
            "Garantia 2 anos"
        ],
        disponible: true
    },
    {
        id: 4,
        nombre: "Balon de Oxigeno Industrial 9m3",
        categoria: "industrial",
        capacidad: "9m3",
        descripcion: "Oxigeno de grado industrial para procesos de soldadura, corte con soplete y aplicaciones tecnicas especializadas en metalurgia.",
        precio: 280,
        imagen: "images/balon-industrial.webp",
        caracteristicas: [
            "Grado industrial",
            "Alta presion (200 bar)",
            "Ideal para soldadura",
            "Compatible con equipos estandar"
        ],
        disponible: true
    },
    {
        id: 5,
        nombre: "Kit de Oxigenoterapia Domiciliaria",
        categoria: "equipos",
        capacidad: "Completo",
        descripcion: "Kit completo que incluye balon de 6m3, regulador de flujo, humidificador, canula nasal y carrito de transporte. Todo lo necesario para oxigenoterapia en casa.",
        precio: 450,
        imagen: "images/kit-domiciliario.webp",
        caracteristicas: [
            "Balon 6m3 incluido",
            "Humidificador integrado",
            "Carrito de transporte",
            "Canula nasal desechable"
        ],
        disponible: true
    },
    {
        id: 6,
        nombre: "Balon de Oxigeno Medicinal 1m3",
        categoria: "medicinal",
        capacidad: "1m3",
        descripcion: "Balon ultra portatil para emergencias y uso ambulatorio. Ideal para tener en vehiculos o como respaldo en situaciones de emergencia.",
        precio: 120,
        imagen: "images/balon-1m3.webp",
        caracteristicas: [
            "Ultra portatil",
            "Peso: 3kg aproximadamente",
            "Ideal para emergencias",
            "Duracion: 5-8 horas"
        ],
        disponible: true
    }
];

// Filtrar productos por categoria
function filtrarPorCategoria(categoria) {
    if (categoria === 'todos') {
        return productosOxiAndina;
    }
    return productosOxiAndina.filter(producto => producto.categoria === categoria);
}

// Buscar producto por ID
function buscarProductoPorId(id) {
    return productosOxiAndina.find(producto => producto.id === id);
}

// Renderizar productos en la pagina con uso de DOM
function renderizarProductos(productos, contenedorId = 'productos-grid') {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const productoCard = `
            <div class="producto-card" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                <div class="producto-info">
                    <span class="producto-categoria">${producto.categoria.toUpperCase()}</span>
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p class="producto-precio">Desde S/ ${producto.precio.toFixed(2)}</p>
                    <button class="btn-producto" onclick="verDetalleProducto(${producto.id})">
                        Ver Detalles
                    </button>
                </div>
            </div>
        `;
        contenedor.innerHTML += productoCard;
    });
}

// Ver detalle de producto
function verDetalleProducto(id) {
    const producto = buscarProductoPorId(id);
    if (!producto) return;

    alert(`${producto.nombre}\n\nCaracteristicas:\n${producto.caracteristicas.join('\n')}\n\nPrecio: S/ ${producto.precio}`);
}

// Inicializar filtros de productos
function inicializarFiltros() {
    const botonesCategoria = document.querySelectorAll('.btn-categoria');
    
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', function() {
            botonesCategoria.forEach(btn => btn.classList.remove('activo'));
            this.classList.add('activo');
            
            const categoria = this.getAttribute('data-categoria');
            const productosFiltrados = filtrarPorCategoria(categoria);
            renderizarProductos(productosFiltrados);
        });
    });
}

// Exportar funciones y datos
if (typeof window !== 'undefined') {
    window.ProductosOxiAndina = {
        productos: productosOxiAndina,
        filtrarPorCategoria,
        buscarProductoPorId,
        renderizarProductos,
        inicializarFiltros
    };
}
