# **MarketFinder**

## **Instalación en Windows**

---
#### Instalación y ejecución del Servidor Frontend
### 1. Instalación de Node.js

1. Instala **NVM** (Node Version Manager) para manejar versiones de Node.js, ya que el instalador de npm tiene reportes de virus por **VirusTotal.com**. Podés seguir los pasos aquí:
   - [Guía de instalación de Node.js y npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2. Una vez instalado **NVM**, abre la terminal (cmd) y ejecuta:
   ```bash
   nvm install 23.2   # Instala la última versión de Node.js (Verificar versión actual en https://nodejs.org/en)
   nvm use 23.2
   ```

### 2. Instalación de Angular CLI e Ionic CLI
Ejecuta los siguientes comandos para instalar las herramientas necesarias de forma global:
   ```bash
   npm install -g @angular/cli
   npm install -g @ionic/cli
   ```

### 3. Clonar el repositorio
   Clona el repositorio de GitHub usando:
   ```bash
   git clone git@github.com:TITIR1X/marketFinder.git
   ```

### 4. Navegar al proyecto
   Dirígete a la carpeta del proyecto:
   ```bash
   cd marketFinder/ionic-angular
   ```

### 5. Instalar dependencias
   Instala todas las dependencias necesarias para el proyecto:
   ```bash
   npm install
   ```

### 6. Iniciar el proyecto
   Para iniciar el servidor de desarrollo de Ionic, ejecuta:
   ```bash
   ionic serve
   ```
---



---
#### Instalación y ejecución del Servidor Backend

### 1. Abrir una nueva terminal y navegar al directorio del backend
   Abre una nueva terminal, luego navega hasta la carpeta del proyecto Django:
   ```bash
   cd marketFinder/django
   ```

### 2. Crear un entorno virtual
   Crea un entorno virtual para aislar las dependencias del proyecto:
   ```bash
   python -m venv env
   ```

### 3. Activar el entorno virtual
   Activa el entorno virtual. Dependiendo de tu terminal, usa uno de los siguientes comandos:

   - **En Windows (CMD o PowerShell):**
     ```bash
     .\env\Scripts\activate
     ```
   
   - **En Git Bash o WSL (Windows Subsystem for Linux):**
     ```bash
     source env/Scripts/activate
     ```
   
   - **En Linux o MacOS:**
     ```bash
     source env/bin/activate
     ```

### 4. Instalar dependencias del backend
   Instala las dependencias necesarias utilizando el archivo `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```

### 5. Navegar al directorio `core`
   Dirígete al directorio `core` del proyecto:
   ```bash
   cd core
   ```

### 6. Iniciar el servidor de desarrollo de Django
   Ejecuta el siguiente comando para iniciar el servidor de desarrollo de Django:
   ```bash
   python manage.py runserver
   ```
---