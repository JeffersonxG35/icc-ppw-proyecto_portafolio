![Proyecto Integrador](src/assets/01_LogoUps.png)

# Proyecto Integrador

- **Integrantes:** _Milton Chuqui_ _y Jefferson Guerrero_
- **Profesor:** _Ing. Pablo Torres_
- **Curso:** _Programacion de plataformas web_

## Portafolio de Desarrolladores

Aplicación web desarrollada con Angular y Firebase que permite visualizar perfiles profesionales de desarrolladores, explorar sus habilidades, proyectos y enviar solicitudes de contacto para posibles colaboraciones o desarrollos de software.

---

## Descripción

Este proyecto fue desarrollado con el objetivo de crear una plataforma donde distintos desarrolladores puedan mostrar su perfil profesional de forma organizada y moderna.

Los visitantes pueden revisar la información de cada desarrollador y, si están interesados en trabajar con alguno de ellos, pueden enviar una solicitud de contacto mediante un formulario.

Además, el sistema incorpora autenticación de usuarios y gestión de solicitudes utilizando Firebase.

---

## Tecnologías utilizadas

### Frontend

- Angular 21
- TypeScript
- HTML5
- CSS3
- Tailwind CSS
- DaisyUI

### Backend y servicios

- Firebase Authentication
- Cloud Firestore

### Herramientas de desarrollo

- Visual Studio Code
- Git
- GitHub

---

# Funcionalidades

## Página principal

- Visualización de desarrolladores.
- Tarjetas informativas con fotografía.
- Navegación mediante desplazamiento suave (scroll).
- Diseño responsive para dispositivos móviles y escritorio.

---

## Perfil del desarrollador

Cada desarrollador cuenta con una página personalizada que incluye:

- Información personal.
- Biografía.
- Formación académica.
- Habilidades técnicas.
- Proyectos realizados.
- Información de contacto.

---

## Sistema de autenticación

Se implementó Firebase Authentication para permitir:

### Registro

- Crear una cuenta con correo electrónico y contraseña.

### Inicio de sesión

- Acceder mediante correo electrónico y contraseña.
- Acceder utilizando cuenta de Google.

### Cierre de sesión

- Finalizar sesión de forma segura.

---

## Solicitudes de contacto

Los usuarios autenticados pueden enviar solicitudes a un desarrollador.

Cada solicitud almacena:

- Usuario que la envía.
- Correo electrónico.
- Desarrollador seleccionado.
- Descripción del proyecto.
- Estado de la solicitud.
- Fecha de creación.

---

## Gestión de solicitudes

### Usuario externo

Puede:

- Navegar por la aplicación.
- Si quieren contactar a un desarrollador, deben registrarse e iniciar sesión.

# Estructura de Firestore

Colección principal:

```text
requests
```

Ejemplo de documento:

```json
{
  "userId": "123456",
  "userEmail": "usuario@gmail.com",
  "developerSlug": "milton",
  "projectDescription": "Necesito una página web para mi negocio",
  "status": "Pendiente",
  "response": "",
  "createdAt": "2026-06-09"
}
```

---

# Roles del sistema

Se utilizan Custom Claims de Firebase Authentication.

## Usuario

Puede:

- Iniciar sesión.
- Enviar solicitudes.
- Consultar solicitudes realizadas.

## Administrador / Programador

Puede:

- Ver solicitudes dirigidas a él.
- Actualizar estados.
- Responder solicitudes.
- Gestionar información relacionada con los proyectos recibidos.

---

# Estructura general del proyecto

```text
src
│
├── app
│   ├── components
│   ├── core
│   │   ├── services
│   │   └── guards
│   ├── features
│   │   ├── auth
│   │   ├── developer
│   │   ├── home
│   │   └── requests
│   └── app.routes.ts
│
├── assets
│
└── styles.css
```

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/usuario/repositorio.git
```

Ingresar al proyecto:

```bash
cd proyecto
```

Instalar dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```

---

# Configuración Firebase

Crear un proyecto en Firebase y habilitar:

- Authentication
- Firestore Database

Agregar la configuración dentro de:

```ts
app.config.ts;
```

Ejemplo:

```ts
initializeApp({
  apiKey: 'API_KEY',
  authDomain: 'PROJECT.firebaseapp.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT.appspot.com',
  messagingSenderId: 'XXXXXXXX',
  appId: 'APP_ID',
});
```

---

# Diseño Responsive

La aplicación se adapta automáticamente a:

- Computadoras
- Tablets
- Teléfonos móviles

Se utilizó Tailwind CSS junto con DaisyUI para mantener una interfaz moderna y consistente.

---

# Posibles mejoras futuras

- Sistema de notificaciones.
- Chat entre cliente y desarrollador.
- Carga de archivos adjuntos.
- Panel administrativo completo.
- Sistema de valoración y comentarios.
- Integración con APIs externas.

---

# Licencia

Proyecto desarrollado con fines académicos para la asignatura de Programación Web.
