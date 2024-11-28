# electivaIV-sismedico

Este proyecto es un sistema básico desarrollado en Node.js. A continuación, se describen los pasos necesarios para configurar y ejecutar el proyecto.

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
       npm i
4. Levanta servidor:

   ```cmd
       npm run start

5. Levanta servidor en modo desarrollo:

   ```cmd
       npm run dev
