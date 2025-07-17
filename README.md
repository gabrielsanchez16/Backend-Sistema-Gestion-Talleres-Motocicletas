# ✅ Roadmap de desarrollo backend: Sistema de Taller de Motos

Este documento resume los **siguientes pasos a seguir** ahora que ya tienes configurado:

- ✅ Diagrama de base de datos (ERD)
- ✅ Modelos Sequelize
- ✅ Entorno de desarrollo (Express, JWT, Cloudinary, Multer)
- ✅ Registro de taller
- ✅ Inicio de sesión con token JWT

---
<img width="1087" height="1233" alt="sistema taller" src="https://github.com/user-attachments/assets/e61b55e7-39b2-4721-b1fc-1c64a929fb92" />


## 🔒 Seguridad global

- [x] Autenticación JWT funcionando
- [x] Middleware de autenticación (`authenticate.js`) aplicado a todas las rutas privadas

> 📌 Todas las rutas siguientes deben requerir token para acceder.

## 📝 Estado del trabajo en el proyecto

### 🚧 Progreso del proyecto

🟩🟩🟩🟩🟩⬜⬜⬜⬜⬜ 50%

- ✅ Auth
- ✅ Brand
- ✅ Motorcycle
- ✅ Owner
- ✅ Workshop
- ⛔ Type
- ⛔ Service
- ⛔ WorkOrder
- ⛔ Mechanic
- ⛔ Photo
- ⛔ ServiceByWork

## 🚀 Instalación y configuración

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

---

### 1. 📁 Clonar el repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/gabrielsanchez16/Backend-Sistema-Gestion-Talleres-Motocicletas.git
cd "Repo cloneado"
```

### 2. 📁 Instalar dependencias

Instala las dependencias:

```bash
npm install
```
### 3. 📁 Configura tu .env

Coloca las credenciales de tu maquina local:

### 4. 📁 Corre migraciones y Seeders

Instala las dependencias:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```


### 5. 📁 Corre el servidor

Ya puedes correr el servidor y probarlo:

```bash
npm run server
```