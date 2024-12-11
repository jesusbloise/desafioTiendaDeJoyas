# API RESTful de Inventario de Joyas

Esta es una API RESTful para gestionar un inventario de joyas. El proyecto utiliza Node.js, Express y PostgreSQL para ofrecer funcionalidades como consultas paginadas, ordenadas y filtradas sobre un inventario de joyas.

## Características Principales

- **Rutas principales con HATEOAS**: Permite navegar entre los recursos.
- **Filtrado de resultados**: Filtra joyas por precio, categoría o tipo de metal.
- **Paginación y ordenación**: Controla la cantidad de resultados y el orden en que se devuelven.
- **Arquitectura modular**: Separación de responsabilidades en rutas, controladores y modelos.



## Estructura del Proyecto


|-- src
|   |-- controllers
|   |   |-- inventarioController.js
|   |-- db
|   |   |-- database.js
|   |-- middleware
|   |   |-- logger.js
|   |-- models
|   |   |-- inventario.js
|   |-- routes
|       |-- joyasRoutes.js
|-- .env
|-- app.js
```



## Configuración Inicial

### **Requisitos Previos**

- Node.js y npm instalados
- PostgreSQL configurado

### **Instalación**

1. Clona el repositorio:

  
   git clone <URL-del-repositorio>
   cd project-root
 

2. Instala las dependencias:

  
   npm install
 

3. Crea un archivo `.env` en el directorio principal con la siguiente configuración:

   DB_HOST=localhost
   DB_USER=postgres
   DB_PASS=jesusbloise
   DB_NAME=farmacia
   PORT=3000


4. Configura la base de datos PostgreSQL:

   - Crea una base de datos llamada `farmacia`.
   - Importa el esquema y los datos iniciales si es necesario.

5. Inicia la aplicación:

   
   npm start
  

6. La API estará disponible en `http://localhost:3000/api`.

---

## Endpoints

### **1. Obtener Joyas con HATEOAS**

**GET** `/api/joyas`

#### Query Params
- `limits` (opcional): Número de resultados por página.
- `page` (opcional): Página actual.
- `order_by` (opcional): Campo y dirección de ordenación (e.g., `precio_desc`).

#### Respuesta
```json
{
  "total": 5,
  "joyas": [
    {
      "id": 1,
      "nombre": "Anillo de oro",
      "precio": 100,
      "categoria": "anillos",
      "metal": "oro",
      "links": {
        "self": "/joyas/1"
      }
    }
  ]
}
```

---

### **2. Filtrar Joyas**

**GET** `/api/joyas/filtros`

#### Query Params
- `precio_max` (opcional): Precio máximo.
- `precio_min` (opcional): Precio mínimo.
- `categoria` (opcional): Categoría de la joya.
- `metal` (opcional): Tipo de metal.

#### Respuesta
```json
[
  {
    "id": 1,
    "nombre": "Anillo de oro",
    "precio": 100,
    "categoria": "anillos",
    "metal": "oro"
  }
]
```

---

## Arquitectura

### **Modelos**
- Ubicados en `src/models`.
- Manejan la lógica de consulta a la base de datos usando PostgreSQL.

### **Controladores**
- Ubicados en `src/controllers`.
- Contienen la lógica de negocio para procesar las solicitudes.

### **Rutas**
- Ubicadas en `src/routes`.
- Definen los endpoints y delegan la ejecución a los controladores.

### **Middleware**
- `logger.js`: Registra las solicitudes con fecha y hora.


## Autor

- **Jesus Bloise**

