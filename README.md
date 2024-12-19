# api-retotec

## Documentación de Uso del API

Este API interactúa con una base de datos DynamoDB para almacenar y consultar personajes de Star Wars almacenados (utiliza el api SWAPI personajes no registrados anteriormente y lo consultado se almacena en  DynamoDB). Se maneja tres endpoints los cuales son los siguientes:

URL Base

https://lc2xugi5e0.execute-api.us-east-1.amazonaws.com/dev

### Endpoints:

#### 1. Obtener un Personaje por ID
    GET /personaje/{id}

    Este endpoint obtiene los detalles de un personaje por su ID. Primero busca en la base de datos local (DynamoDB), y si no lo encuentra, consulta la API de SWAPI para obtener los detalles del personaje y luego los guarda en la base de datos.

    URL:     /personaje/{id}
    Método HTTP:     GET
    Parámetro de ruta:  id (string, obligatorio): El ID del personaje a obtener.


    Ejemplo de Solicitud

        URL :
            GET https://lc2xugi5e0.execute-api.us-east-1.amazonaws.com/dev/personaje/1

        Respuesta Exitosa :
            {
            "id": "1",
            "nombre": "Luke Skywalker",
            "altura": "172",
            "peso": "77",
            "genero": "male"
            }
        
        Respuesta en caso de no encontrar el personaje :
            {
            "message": "Personaje no encontrado en la base de datos ni en SWAPI"
            }

#### 2. Crear o Actualizar un Personaje
    POST /personaje

    Este endpoint permite registrar un nuevo personaje en la base de datos DynamoDB. Si el personaje ya existe, se actualizan sus datos.

    URL:    /personaje
    Método HTTP:    POST
    Cuerpo de la solicitud: Debes enviar un objeto JSON con los detalles del personaje.


    Ejemplo de Solicitud

        URL :
            POST https://lc2xugi5e0.execute-api.us-east-1.amazonaws.com/dev/personaje

        JSON: 
            {
            "id": "1",
            "nombre": "Luke Skywalker",
            "altura": "172",
            "peso": "77",
            "genero": "male"
            }

        Respuesta Exitosa :
            {
            "message": "Personaje creado/actualizado correctamente",
            "personaje": {
                "id": "1",
                "nombre": "Luke Skywalker",
                "altura": "172",
                "peso": "77",
                "genero": "male"
                }
            }

        Respuesta en caso de Error :
            {
            "message": "Error al crear o actualizar el personaje"
            }

#### 3. Obtener Todos los Personajes
    GET /personajes

    Este endpoint recupera todos los personajes almacenados en la base de datos DynamoDB.

    URL:    /personajes
    Método HTTP:    GET


    Ejemplo de Solicitud

        URL:
            GET https://lc2xugi5e0.execute-api.us-east-1.amazonaws.com/dev/personajes

        Respuesta Exitosa (en caso de tener datos):
        [
            {
                "id": "1",
                "nombre": "Luke Skywalker",
                "altura": "172",
                "peso": "77",
                "genero": "male"
            },
            {
                "id": "2",
                "nombre": "Leia Organa",
                "altura": "150",
                "peso": "49",
                "genero": "female"
            }
        ]

        Respuesta Exitosa (en caso de no tener datos):
        []
