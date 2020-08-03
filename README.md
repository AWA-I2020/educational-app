# Educational App - AWA

## Requerimientos
- Git
- NodeJs v12.18.2 o superior
- Ionic CLI v6.11.0 o superior - Comando de instalacion: "npm install -g @ionic/cli"
- http-server - Comando de instalacion: "npm install -g http-server"

## Instalacion
- Descargar la rama "develop" de "https://github.com/AWA-I2020/educational-app.git".
- Dentro de la ruta del proyecto ejecutar el comando: "npm install"
- Luego ejecutar el comando: "ionic build --prod"
- Entrar a la carpeta "www" y ejecutar el comando: "http-server -o"
- Desde el navegador al ejecutar el comando anterior, entrar al link que se indica: "127.0.0.1:8080"

## Caracteristicas disponibles
### PWA
-  Fase de instalacion desde navegador Google Chrome.
-  Cache de los archivos para el funcionamiento de la aplicacion.
-  Almacenamiento de datos obtenidos de firebase gracias a la opcion de disponibilidad offline propia de firebase.
-  Almacenamiento de archivos de recursos descargados en indexedDB.
-  Push notifications para el estudiante.

### Profesor
-  Registro de Usuario con su respectivo rol.
-  Registro y obtencion de una nueva clase.
-  Registro y obtencion de recursos de clases (con respectivos archivos).
-  Registro y obtencion de actividad de clase (tipo tarea).
-  Obtencion de estudiantes inscritos en la clase.
-  Obtencion de tareas entregadas por los estudiantes en respectivas actividades.
-  Obtencion de datos de perfil.
-  Obtencion de codigo de clase.
-  Alertas en caso de subir archivos pesados.
-  Descarga y vista de archivos de recursos y de actividades.

### Estudiante
-  Registro de Usuario con su respectivo rol.
-  Registro y obtencion a una clase segun codigo de clase.
-  Obtencion de recursos de clase (con respectivos archivos).
-  Registro de actividad personal en actividades de clase (tipo tarea).
-  Obtencion de datos de perfil.
-  Obtencion de codigo de respectivo estudiante.
-  Obtencion de notificaciones.

### Padre de Familia
-  Registro de Usuario con su respectivo rol.

## Caracteristicas no disponibles
-  Recuperacion de contrasena no disponible.
-  Ediciones de una clase, actividad, recurso.
-  Recurso sin estado de edicion, publicado o visto.
-  Actividad sin control de fecha limite de entrega.
-  Actividad sin campo para registrar feedback del profesor.
-  Registro de actividad de cuestionario no disponible.
-  Funcion general de rol (Padre de Familia). Solo vista al iniciar sesion.

## Dificultades
- Creacion de propios cuestionarios dinamicos (actividad cuestionario).
- Expansion del indexedDB.
- Implementacion de Service Worker personalizado dentro del framework Angular.
- Backgroud sync no implementado por el service worker que maneja Angular.
- Poco ejemplo de PWA con framework Angular.
- Poco conocimiento de javascript para la creacion de la aplicacion, por eso el uso del framework.


## Tecnologias en uso
- Ionic con Angular - "https://ionicframework.com/docs/angular/your-first-app"
- Firebase Firestore - "https://firebase.google.com/docs/firestore"
- Firebase Storage - "https://firebase.google.com/docs/storage"
- Firebase Cloud Messaging (Push Notifications) - "https://firebase.google.com/docs/cloud-messaging" 
- IndexedDB - "https://www.npmjs.com/package/ngx-indexed-db"
- Angular PWA - "https://angular.io/guide/service-worker-getting-started"
- Ionic PWA - "https://ionicframework.com/docs/angular/pwa"
- crypto-js - "https://www.npmjs.com/package/crypto-js"
