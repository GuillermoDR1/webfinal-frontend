# TechFix & Ventas - Documentación del Sistema

## Descripción del Sistema
TechFix & Ventas es un sistema web integral diseñado para la gestión eficiente de un taller de computación. 
Su objetivo principal es automatizar y administrar el control de inventario de hardware (componentes) y realizar un seguimiento detallado del estado de los equipos ingresados al taller para reparación. 
Cuenta con un sistema de autenticación para asegurar que solo el personal autorizado pueda modificar las existencias y los registros.

## Tecnologías Usadas
**Frontend:**
* Vue 3
* Vite
* Pinia (Gestión de estados globales)
* HTML5 / CSS3 / JavaScript

**Backend:**
* Python 3
* Flask (Framework para la API REST)

**Base de Datos:**
* MySQL / MariaDB

## Endpoints Principales (API REST)
El backend expone las siguientes rutas para la comunicación con la interfaz:

**Componentes (Inventario):**
* `GET /componentes` - Obtiene la lista de todos los componentes.
* `POST /componentes` - Registra un nuevo componente.
* `PUT /componentes/<id>` - Actualiza los datos de un componente existente.
* `DELETE /componentes/<id>` - Elimina un componente del inventario.

**Reparaciones (Taller):**
* `GET /reparaciones` - Obtiene el registro de equipos en el taller.
* `POST /reparaciones` - Ingresa un nuevo equipo a reparación.
* `PUT /reparaciones/<id>` - Actualiza el estado o costo de la reparación.
* `DELETE /reparaciones/<id>` - Elimina un registro del taller.

## Arquitectura
El proyecto utiliza una arquitectura **Cliente-Servidor (Desacoplada)**:
1. **Cliente (Frontend):** Se encarga exclusivamente de la interfaz de usuario, la navegación y la recolección de datos, consumiendo servicios a través de peticiones HTTP (Fetch API).
2. **Servidor (Backend API):** Procesa la lógica de negocio, gestiona las conexiones y ejecuta las consultas SQL.
3. **Base de Datos:** Capa de persistencia remota para el almacenamiento de la información.

## Capturas del Sistema
*(Instrucciones: Arrastra aquí tus imágenes en GitHub para que se generen los enlaces automáticamente)*

* **Pantalla de Inicio / Dashboard:** <img width="1882" height="894" alt="INICIO" src="https://github.com/user-attachments/assets/9bf64fb3-62a9-47c3-a88f-75329d184f07" />
* **Módulo de Inventario:** <img width="1897" height="917" alt="INVENTARIO" src="https://github.com/user-attachments/assets/09bed814-ce24-4116-beff-d8de291f57bc" />
* **Módulo de Taller / Reparaciones:** <img width="1895" height="908" alt="TALLEReparaciones" src="https://github.com/user-attachments/assets/5c1c087f-8055-4f44-bdb3-2a76ef03dbf1" />

## URLs del Sistema (Producción)
* **Frontend (Aplicación Web):** https://webfinal-frontend.vercel.app/
* **Backend (API REST):** https://api-techfix-backend.onrender.com

## Explicación de Seguridad
El sistema implementa las siguientes medidas de seguridad para proteger la integridad de los datos y la infraestructura:
* **Variables de Entorno (`.env`):** Las credenciales críticas (usuarios, contraseñas de base de datos, correos de administrador y claves secretas) están aisladas del código fuente.
* **Protección de Repositorios (`.gitignore`):** Los archivos sensibles y los entornos virtuales (`venv`) no se exponen en el control de versiones público.
* **CORS:** Configuración de intercambio de recursos de origen cruzado para asegurar que solo el frontend autorizado pueda consumir la API.

## Plataformas Utilizadas
Para el despliegue del sistema en la nube se utilizaron los siguientes servicios:
* **Vercel:** Hosting para el despliegue continuo del Frontend (Vue 3).
* **Render:** Hosting en la nube para ejecutar el servidor Backend (Flask/Python) 24/7.
* **FreeSQLDatabase:** Alojamiento remoto para la base de datos MySQL, permitiendo su acceso desde cualquier entorno.
* **GitHub:** Plataforma para el control de versiones y almacenamiento del código fuente de ambos repositorios.
