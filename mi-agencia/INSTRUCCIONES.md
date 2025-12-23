# INSTRUCCIONES PARA EJECUTAR EL PROYECTO OXIANDINA

## Requisitos Previos
- Python 3.17 o superior instalado
- Navegador web moderno (Chrome, Firefox, Edge, etc)

## Pasos para Iniciar el Proyecto

### 1. Abrir Terminal/CMD en la carpeta del proyecto
Navega hasta la carpeta mi-agencia:

cd C:\Users\Geisel\Documents\idweb\pacheco_geisel\proyecto_individual\mi-agencia\mi-agencia


### 2. Iniciar el Servidor Backend
Ejecuta el siguiente comando:

python server.py


Deberas ver un mensaje como este:


Servidor WSGI OxiAndina corriendo en http://localhost:8000

Rutas API disponibles:
  GET    /api/clientes          - Listar todos los clientes
  GET    /api/clientes/<id>     - Obtener cliente por ID
  POST   /api/clientes          - Crear nuevo cliente
  DELETE /api/clientes/<id>     - Eliminar cliente

  GET    /api/mensajes          - Listar mensajes de contacto
  POST   /api/mensajes          - Crear nuevo mensaje
  DELETE /api/mensajes/<id>     - Eliminar mensaje


### 3. Abrir el Sitio Web
Con el servidor corriendo, abre tu navegador y visita:

http://localhost:8000


IMPORTANTE: Por ahora el servidor solo maneja las rutas API. Para ver las paginas HTML, abre directamente los archivos .html en tu navegador o usa:

- index.html
- nosotros.html
- productos.html
- servicios.html
- contacto.html
- registro.html
- admin.html


### 4. Probar las Funcionalidades

#### Registro de Clientes:
1. Abre registro.html
2. Selecciona tipo de cliente (Persona Natural o Empresa)
3. Completa el formulario
4. Haz clic en "Registrarse"
5. Los datos se guardaran en data/clientes.json

#### Formulario de Contacto:
1. Abre contacto.html
2. Completa el formulario
3. Envia el mensaje
4. Los datos se guardaran en data/mensajes.json

#### Panel Administrativo:
1. Abre admin.html
2. Ingresa la contrasena: admin123
3. Veras:
   - Estadisticas de clientes y mensajes
   - Lista de todos los clientes registrados
   - Lista de todos los mensajes de contacto
   - Opciones para ver detalles y eliminar registros

## Estructura de Archivos JSON

### data/clientes.json
Almacena los clientes registrados con la siguiente estructura:
```json
{
    "id": 1,
    "tipo_cliente": "natural",
    "nombres": "Juan",
    "apellidos": "Perez",
    "dni": "12345678",
    "email": "juan@email.com",
    "telefono": "987654321",
    "direccion": "Av. Principal 123",
    "ciudad": "Arequipa",
    "motivo": "uso_personal",
    "fecha_registro": "2025-12-23T10:30:00.000Z"
}
```

### data/mensajes.json
Almacena los mensajes de contacto con la siguiente estructura:
```json
{
    "id": 1,
    "nombre": "Maria Lopez",
    "email": "maria@email.com",
    "telefono": "987654321",
    "asunto": "consulta",
    "mensaje": "Consulta sobre precios",
    "fecha": "2025-12-23T10:30:00.000Z"
}
```

## Endpoints API Disponibles

### Clientes
- `GET /api/clientes` - Obtener todos los clientes
- `GET /api/clientes/<id>` - Obtener un cliente especifico
- `POST /api/clientes` - Crear nuevo cliente
- `DELETE /api/clientes/<id>` - Eliminar cliente

### Mensajes
- `GET /api/mensajes` - Obtener todos los mensajes
- `POST /api/mensajes` - Crear nuevo mensaje
- `DELETE /api/mensajes/<id>` - Eliminar mensaje

## Solucion de Problemas

### El servidor no inicia
- Verifica que Python este instalado: `python --version`
- Asegurate de estar en la carpeta correcta
- Verifica que el puerto 8000 no este en uso

### Los datos no se guardan
- Verifica que la carpeta `data/` exista
- Asegurate de que los archivos `clientes.json` y `mensajes.json` existan
- Verifica los permisos de escritura en la carpeta

### Error al abrir archivos HTML
- Si abres los HTML directamente sin servidor, las peticiones fetch no funcionaran
- Usa `python -m http.server 3000` en la carpeta del proyecto
- Abre `http://localhost:3000/index.html`

## Detener el Servidor
Para detener el servidor Python, presiona `Ctrl+C` en la terminal donde esta corriendo.

## Notas Importantes
- Los datos se almacenan en archivos JSON localmente
- La contrasena del admin es: `admin123`
- El servidor debe estar corriendo para que funcionen los formularios
- CORS esta habilitado para desarrollo local
