# electivaIV-sismedico

Este proyecto es un sistema medico basico desarrollado en Node.js. A continuación, se describen los pasos necesarios para configurar y ejecutar el proyecto.

## Integrantes

    - Vivían Rocio Núñez Álvarez
    - Ruth Dahiana Rivas Duarte
    - Sebastian Vidal López

## Requisitos previos

- [Node.js](https://nodejs.org) (v14 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

---

## Configuración

Antes de ejecutar el sistema, es necesario configurar los datos de conexión a la base de datos. Para ello, sigue estos pasos:

1. Abre el archivo `config/db.config.js`.
2. Modifica los siguientes valores según la configuración de tu base de datos:

   ```javascript
       HOST: "tu_host",
       USER: "tu_usuario",
       PASSWORD: "tu_contraseña",
       DB: "tu_nombre_de_base_de_datos"
3. Instala dependencias:

   ```cmd
       npm install
4. Levanta servidor:

   ```cmd
       npm run server

5. Levanta react:

   ```cmd
       npm run front

6. Levanta servidor y react:

   ```cmd
       npm run dev

Despues e ejecutar se puede agregar las espacialidades de los medicos en el endpoint `/especialidades` metodo http POST con el body:

   ```cmd
       {
        "nombre": "NOMBRE_ESPECIALIDAD"
       }
