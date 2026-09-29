# 🚚 Prototipo: Optimización de Rutas Logísticas Urbanas

**Actividad 6: Navegando mareas - Estrategias de navegación en la arquitectura de software**

Este repositorio contiene el código fuente del prototipo funcional desarrollado para evaluar y optimizar estrategias de navegación en sistemas logísticos. El aplicativo simula un entorno de toma de decisiones donde el usuario puede alternar dinámicamente entre diferentes algoritmos de cálculo de rutas para entornos urbanos complejos, demostrando la aplicación práctica de patrones de diseño arquitectónico.

## 🏗️ Arquitectura y Patrones de Diseño

El núcleo lógico del sistema está construido implementando el **Patrón de Diseño Strategy** (Patrón de Comportamiento). Esta decisión arquitectónica permite:

*   **Desacoplamiento:** Separar completamente la interfaz gráfica (React) del motor de reglas de enrutamiento.
*   **Intercambiabilidad Dinámica:** Cambiar el algoritmo de ruteo en tiempo de ejecución (Run-time) mediante el contexto `RouteNavigator`, soportando las siguientes estrategias:
    *   `FastestRouteStrategy`: Prioriza vías principales (menor tiempo estimado).
    *   `ShortestRouteStrategy`: Prioriza la menor distancia física en kilómetros.
    *   `EconomicRouteStrategy`: Minimiza costos operativos evitando zonas de alta congestión.
*   **Escalabilidad:** Cumplir con el Principio Abierto/Cerrado (SOLID), garantizando que se puedan añadir nuevas estrategias en el futuro sin alterar el código existente.

## 🛠️ Tecnologías Utilizadas

*   **Librería UI:** React
*   **Lenguaje:** TypeScript (Asegura el cumplimiento de los contratos/interfaces del patrón Strategy)
*   **Empaquetador:** Vite (Optimizado con SWC/Oxc para compilación rápida)

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para desplegar el simulador en un entorno de desarrollo local:

1. **Clonar el repositorio:**
   ```bash
   git clone <https://github.com/fernandoMorillo/estrategia-navegacion>
