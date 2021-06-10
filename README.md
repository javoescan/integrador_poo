# Programación Orientada a Objetos
## Trabajo Práctico Integrador

<br/>

### Contenido
* [Lineamientos](./docs/tech_specs.md)
* [Endpoints](./docs/endpoints.md)
* [Diagrama de clases](./docs/classes.png)
* [Esquema DB](./docs/db.png)
* [Set up](./docs/set_up.md)

<br/>

### Setup
- Descargar repo
- Correr `docker-compose up --build`
- Crear DB en el contenedor `db` (ingresando al contenedor de DB o mediante el phpmyadmin en `localhost:8082`)
- Para el docker-compose y volver a levantarlo (ya no es necesario correrlo con el build)
- Ejecutar `docker exec -it app sh` y una vez dentro del contenedor ejecutar `npm run migrate`
- Crear un usuario admin a mano o comentar el decorator del guard en el endpoint de creación de usuarios para poder probarlo
- Utilizar endpoints en `localhost:8081`