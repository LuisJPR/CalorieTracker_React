# 🔥 Calorie Tracker

Aplicación web desarrollada con **React y TypeScript** que permite registrar y administrar actividades relacionadas con el consumo y gasto de calorías.

La aplicación permite agregar comidas y ejercicios, registrar sus calorías, editar actividades existentes, eliminarlas y visualizar el balance de calorías. Los datos se almacenan en `localStorage`, permitiendo conservar las actividades al recargar la aplicación.

## ✨ Características

* Registro de actividades relacionadas con comidas y ejercicios.
* Selección de categoría para cada actividad.
* Registro de nombre y cantidad de calorías.
* Edición de actividades existentes.
* Eliminación de actividades.
* Reinicio completo de las actividades registradas.
* Persistencia de datos mediante `localStorage`.
* Generación de identificadores únicos para cada actividad.
* Validación del formulario antes de guardar una actividad.
* Gestión del estado global mediante `useReducer`.
* Componentes reutilizables desarrollados con React.
* Tipado estático mediante TypeScript.
* Interfaz responsive utilizando Tailwind CSS.

## 🛠️ Tecnologías utilizadas

* **React** — Desarrollo de la interfaz de usuario.
* **TypeScript** — Tipado estático y definición de estructuras de datos.
* **Vite** — Herramienta de desarrollo y construcción del proyecto.
* **Tailwind CSS** — Diseño y estilos de la interfaz.
* **useReducer** — Gestión del estado de las actividades.
* **useState** — Gestión del estado local del formulario.
* **useEffect** — Sincronización del formulario al seleccionar una actividad para editar.
* **LocalStorage** — Persistencia de las actividades registradas.
* **UUID** — Generación de identificadores únicos para las actividades.

## 📁 Estructura del proyecto

```text id="r8k4mz"
src/
├── components/
│   ├── ActivityList.tsx
│   ├── CalorieDisplay.tsx
│   ├── CalorieTracker.tsx
│   └── Form.tsx
│
├── data/
│   └── categories.ts
│
├── reducers/
│   └── activity-reducer.ts
│
└── types/
    └── index.ts
```

### Components

Contiene los componentes principales de la interfaz:

* `ActivityList.tsx` — Muestra las actividades registradas y permite interactuar con ellas.
* `CalorieDisplay.tsx` — Muestra el resumen y balance de las calorías registradas.
* `CalorieTracker.tsx` — Componente principal encargado de integrar la aplicación y administrar el estado.
* `Form.tsx` — Formulario utilizado para registrar y editar actividades.

### Data

* `categories.ts` — Contiene las categorías disponibles para clasificar las actividades.

### Reducers

* `activity-reducer.ts` — Contiene la lógica encargada de administrar las actividades y las acciones disponibles sobre ellas.

### Types

* `index.ts` — Contiene las definiciones de tipos utilizadas en la aplicación, incluyendo el tipo `Activity`.

## ⚙️ Funcionamiento

La aplicación utiliza un `reducer` para centralizar la gestión de las actividades.

Cada actividad contiene información como:

```text id="v4x8lq"
id        → Identificador único
category  → Categoría de la actividad
name      → Nombre de la actividad
calories  → Cantidad de calorías
```

### Registrar una actividad

El usuario selecciona una categoría, introduce el nombre de la actividad y especifica la cantidad de calorías.

Antes de guardar, el formulario valida que:

* El nombre de la actividad no esté vacío.
* La cantidad de calorías sea mayor que `0`.

Una vez validada la información, la actividad se envía al `activityReducer` mediante la acción `save-activity`.

### Editar una actividad

Cuando el usuario selecciona una actividad existente para editarla, se establece su identificador mediante la acción `set-activeId`.

El formulario detecta el `activeId` y carga la información de la actividad seleccionada, permitiendo modificar sus datos.

Al guardar los cambios, el reducer reemplaza la actividad existente por la nueva información.

### Eliminar una actividad

La acción `delete-activity` elimina una actividad utilizando su identificador.

Esto permite mantener actualizada la lista de actividades sin modificar las demás registradas.

### Reiniciar la aplicación

La acción `restart-app` permite eliminar todas las actividades almacenadas y restablecer el estado inicial de la aplicación.

## 💾 Persistencia de datos

Las actividades se almacenan utilizando `localStorage`.

Al iniciar la aplicación, el reducer intenta recuperar las actividades previamente almacenadas:

```text id="m3v7qa"
localStorage
     ↓
activities
     ↓
activityReducer
     ↓
Estado de la aplicación
```

Esto permite conservar la información registrada incluso después de recargar la página.

## 🔄 Gestión del estado

El reducer utiliza el siguiente estado:

```text id="x2q9pf"
activities → Lista de actividades registradas
activeId   → Identificador de la actividad seleccionada para editar
```

Las acciones disponibles son:

| Acción            | Función                                              |
| ----------------- | ---------------------------------------------------- |
| `save-activity`   | Agrega una nueva actividad o actualiza una existente |
| `set-activeId`    | Selecciona una actividad para editar                 |
| `delete-activity` | Elimina una actividad                                |
| `restart-app`     | Elimina todas las actividades y reinicia el estado   |

Este enfoque permite mantener la lógica de negocio separada de los componentes visuales y facilita el mantenimiento de la aplicación.

## 🚀 Instalación

Clona este repositorio:

```bash id="p6z3kd"
git clone URL_DEL_REPOSITORIO
```

Ingresa al directorio del proyecto:

```bash id="t5w8cz"
cd NOMBRE_DEL_PROYECTO
```

Instala las dependencias:

```bash id="z2k6mf"
npm install
```

Inicia el servidor de desarrollo:

```bash id="n8x1rv"
npm run dev
```

La aplicación estará disponible en la URL indicada por Vite en la terminal.

## 👨‍💻 Autor

**Luis**