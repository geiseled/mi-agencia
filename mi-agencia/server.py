from wsgiref.simple_server import make_server
from app import app

# Crear servidor WSGI
servidor = make_server('localhost', 8000, app)

print("="*60)
print("Servidor WSGI OxiAndina corriendo en http://localhost:8000")
print("="*60)
print("\nRutas API disponibles:")
print("  GET    /api/clientes          - Listar todos los clientes")
print("  GET    /api/clientes/<id>     - Obtener cliente por ID")
print("  POST   /api/clientes          - Crear nuevo cliente")
print("  DELETE /api/clientes/<id>     - Eliminar cliente")
print("\n  GET    /api/mensajes          - Listar mensajes de contacto")
print("  POST   /api/mensajes          - Crear nuevo mensaje")
print("  DELETE /api/mensajes/<id>     - Eliminar mensaje")
print("\n" + "="*60)
print("Presiona Ctrl+C para detener el servidor")
print("="*60 + "\n")

servidor.serve_forever()
