# OxiAndina - Sistema Web de Gestion de Oxígeno

## Descripción
OxiAndina es una empresa con una pagina web completa para la gestion de ventas y distribución de oxígeno medicinal e industrial. El sistema permite a clientes individuales y empresas registrarse, consultar productos, solicitar servicios y contactar con la empresa.

## Tecnologías Utilizadas
- **Frontend:** HTML5, CSS3, JavaScript 
- **Backend:** Python (http.server/wsgiref)
- **Base de Datos:** JSON (inicial)
- **Control de Versiones:** Git/GitHub

## Estructura del Proyecto

mi-agencia/
├── index.html          # Página principal
├── nosotros.html       # Informacion de la empresa
├── productos.html      # Catálogo de productos
├── servicios.html      # Servicios ofrecidos
├── contacto.html       # Formulario de contacto
├── registro.html       # Registro de clientes
├── admin.html          # Panel administrativo
├── css/
│   └── estilos.css    # Estilos personalizados
├── js/
│   ├── main.js        # Funcionalidades principales
│   └── validaciones.js # Validaciones de formularios
├── images/            # Imagenes del sitio
├── data/              # Archivos JSON
│   ├── clientes.json
│   └── mensajes.json
├── server.py          # Servidor backend Python
└── README.md
```

## Funcionalidades Implementadas
- Diseño responsive con layouts modernos
- Navegación entre páginas
- Animaciones y efectos interactivos
- Validación de formularios (DNI/RUC)
- Sistema de registro de clientes
- Formulario de contacto con backend
- Panel administrativo protegido
- Servidor Python con manejo de rutas

## Instalación y Uso

### Requisitos
- Python 3
- Navegador web moderno
- Git

### Pasos para ejecutar
1. Clonar el repositorio
bash
git clone https://github.com/geiseled/mi-agencia.git
cd mi-agencia


2. Iniciar el servidor Python
bash
python server.py


3. Abrir en el navegador

http://localhost:8000


## Autor
**Pacheco Medina Geisel Reymar**
- Proyecto Final Individual - Programación Web

## Notas de Desarrollo
Este proyecto esta en desarrollo activo.

## Proximas Actualizaciones
- Migrar de JSON a MySQL

## Licencia
Uso educativo unicamente
