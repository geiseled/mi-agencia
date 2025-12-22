import json
import os
from urllib.parse import parse_qs

# Rutas de archivos JSON
CLIENTES_FILE = 'data/clientes.json'
MENSAJES_FILE = 'data/mensajes.json'

# Funciones auxiliares para leer/escribir JSON
def leer_json(archivo):
    if os.path.exists(archivo):
        with open(archivo, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def escribir_json(archivo, datos):
    with open(archivo, 'w', encoding='utf-8') as f:
        json.dump(datos, f, indent=4, ensure_ascii=False)

def generar_id(lista):
    if not lista:
        return 1
    return max(item['id'] for item in lista) + 1

# Headers CORS para permitir peticiones desde el frontend
def headers_cors():
    return [
        ('Content-Type', 'application/json; charset=utf-8'),
        ('Access-Control-Allow-Origin', '*'),
        ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
        ('Access-Control-Allow-Headers', 'Content-Type')
    ]

# Funcion WSGI principal
def app(environ, start_response):
    metodo = environ['REQUEST_METHOD']
    ruta = environ['PATH_INFO']

    # Manejar preflight CORS
    if metodo == 'OPTIONS':
        start_response('200 OK', headers_cors())
        return [b'']

    # GET /api/clientes - Listar todos los clientes
    if metodo == 'GET' and ruta == '/api/clientes':
        clientes = leer_json(CLIENTES_FILE)
        start_response('200 OK', headers_cors())
        return [json.dumps(clientes, ensure_ascii=False).encode('utf-8')]

    # GET /api/clientes/<id> - Obtener cliente por ID
    if metodo == 'GET' and ruta.startswith('/api/clientes/'):
        try:
            id_cliente = int(ruta.split('/')[-1])
            clientes = leer_json(CLIENTES_FILE)
            cliente = next((c for c in clientes if c['id'] == id_cliente), None)
            
            if cliente:
                start_response('200 OK', headers_cors())
                return [json.dumps(cliente, ensure_ascii=False).encode('utf-8')]
            else:
                start_response('404 Not Found', headers_cors())
                return [json.dumps({'error': 'Cliente no encontrado'}).encode('utf-8')]
        except ValueError:
            start_response('400 Bad Request', headers_cors())
            return [json.dumps({'error': 'ID invalido'}).encode('utf-8')]

    # POST /api/clientes - Crear nuevo cliente
    if metodo == 'POST' and ruta == '/api/clientes':
        try:
            length = int(environ.get('CONTENT_LENGTH', 0))
            body = environ['wsgi.input'].read(length)
            datos = json.loads(body.decode('utf-8'))

            clientes = leer_json(CLIENTES_FILE)
            nuevo_cliente = {
                'id': generar_id(clientes),
                **datos
            }
            
            clientes.append(nuevo_cliente)
            escribir_json(CLIENTES_FILE, clientes)

            start_response('201 Created', headers_cors())
            return [json.dumps(nuevo_cliente, ensure_ascii=False).encode('utf-8')]
        except (KeyError, json.JSONDecodeError) as e:
            start_response('400 Bad Request', headers_cors())
            return [json.dumps({'error': 'Datos invalidos'}).encode('utf-8')]

    # DELETE /api/clientes/<id> - Eliminar cliente
    if metodo == 'DELETE' and ruta.startswith('/api/clientes/'):
        try:
            id_cliente = int(ruta.split('/')[-1])
            clientes = leer_json(CLIENTES_FILE)
            clientes_filtrados = [c for c in clientes if c['id'] != id_cliente]
            
            if len(clientes) == len(clientes_filtrados):
                start_response('404 Not Found', headers_cors())
                return [json.dumps({'error': 'Cliente no encontrado'}).encode('utf-8')]
            
            escribir_json(CLIENTES_FILE, clientes_filtrados)
            start_response('200 OK', headers_cors())
            return [json.dumps({'mensaje': 'Cliente eliminado'}).encode('utf-8')]
        except ValueError:
            start_response('400 Bad Request', headers_cors())
            return [json.dumps({'error': 'ID invalido'}).encode('utf-8')]

    # GET /api/mensajes - Listar todos los mensajes
    if metodo == 'GET' and ruta == '/api/mensajes':
        mensajes = leer_json(MENSAJES_FILE)
        start_response('200 OK', headers_cors())
        return [json.dumps(mensajes, ensure_ascii=False).encode('utf-8')]

    # POST /api/mensajes - Crear nuevo mensaje de contacto
    if metodo == 'POST' and ruta == '/api/mensajes':
        try:
            length = int(environ.get('CONTENT_LENGTH', 0))
            body = environ['wsgi.input'].read(length)
            datos = json.loads(body.decode('utf-8'))

            mensajes = leer_json(MENSAJES_FILE)
            nuevo_mensaje = {
                'id': generar_id(mensajes),
                **datos
            }
            
            mensajes.append(nuevo_mensaje)
            escribir_json(MENSAJES_FILE, mensajes)

            start_response('201 Created', headers_cors())
            return [json.dumps(nuevo_mensaje, ensure_ascii=False).encode('utf-8')]
        except (KeyError, json.JSONDecodeError):
            start_response('400 Bad Request', headers_cors())
            return [json.dumps({'error': 'Datos invalidos'}).encode('utf-8')]

    # DELETE /api/mensajes/<id> - Eliminar mensaje
    if metodo == 'DELETE' and ruta.startswith('/api/mensajes/'):
        try:
            id_mensaje = int(ruta.split('/')[-1])
            mensajes = leer_json(MENSAJES_FILE)
            mensajes_filtrados = [m for m in mensajes if m['id'] != id_mensaje]
            
            if len(mensajes) == len(mensajes_filtrados):
                start_response('404 Not Found', headers_cors())
                return [json.dumps({'error': 'Mensaje no encontrado'}).encode('utf-8')]
            
            escribir_json(MENSAJES_FILE, mensajes_filtrados)
            start_response('200 OK', headers_cors())
            return [json.dumps({'mensaje': 'Mensaje eliminado'}).encode('utf-8')]
        except ValueError:
            start_response('400 Bad Request', headers_cors())
            return [json.dumps({'error': 'ID invalido'}).encode('utf-8')]

    # Ruta no encontrada
    start_response('404 Not Found', headers_cors())
    return [json.dumps({'error': 'Ruta no encontrada'}).encode('utf-8')]
