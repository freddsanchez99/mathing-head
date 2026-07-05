# Plan General - Mathing Head (Versión Digital)

## 1. Descripción del Proyecto

Juego de escritorio educativo para fortalecer el razonamiento lógico-matemático en estudiantes de 5.° EGB hasta Bachillerato. Implementación digital del juego de mesa Mathing Head con tablero interactivo, multijugador local (2-4 jugadores), 3 niveles de dificultad progresiva y validación automática de respuestas numéricas.

---

## 2. Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Framework desktop | Electron |
| Frontend | HTML5 + CSS3 + JavaScript vanilla |
| Empaquetado | electron-builder (Windows .exe) |
| Plataforma objetivo | Windows 10/11 |

**Justificación**: Electron permite crear apps de escritorio con tecnologías web, facilitando el desarrollo. JS vanilla mantiene el proyecto accesible para nivel bachillerato.

---

## 3. Arquitectura del Proyecto

```
mathing-head/
├── src/
│   ├── main.js              # Proceso principal de Electron
│   ├── preload.js           # Bridge seguro
│   ├── renderer/            # Frontend
│   │   ├── index.html       # Pantalla principal
│   │   ├── game.html        # Vista de juego
│   │   ├── css/
│   │   │   ├── main.css     # Estilos globales
│   │   │   ├── board.css    # Tablero
│   │   │   ├── cards.css    # Cartas
│   │   │   └── timer.css    # Temporizador
│   │   ├── js/
│   │   │   ├── app.js       # Lógica principal y navegación
│   │   │   ├── board.js     # Tablero interactivo
│   │   │   ├── cards.js     # Gestión de cartas
│   │   │   ├── game.js      # Lógica de juego y turnos
│   │   │   ├── players.js   # Gestión de jugadores y puntuación
│   │   │   ├── timer.js     # Cronómetro (carta y partida)
│   │   │   ├── validator.js # Validación numérica de respuestas
│   │   │   └── levels.js    # Configuración de niveles
│   │   └── assets/
│   │       ├── images/      # Iconos, tableros, avatares
│   │       └── sounds/      # Efectos de sonido
│   └── data/
│       └── questions.json   # Banco de preguntas (90+)
├── package.json
└── README.md
```

---

## 4. Componentes del Juego

### 4.1 Pantalla de Inicio
- Selección de nivel: EGB / Básica Superior / Bachillerato
- Configuración de jugadores (2-4): nombres y colores de avatar
- Modo de juego:
  - **Normal**: se juega hasta agotar el mazo de cartas
  - **Concurso**: 3 minutos de tiempo total de partida
- Instrucciones del juego accesibles

### 4.2 Tablero Interactivo
- Tablero visual 4x4 con casillas de colores según nivel
- Operadores matemáticos (+, −, ×, ÷) en casillas
- Casillas especiales: ⭐ comodín, 😟 penalización, 🎯 meta
- Fichas/avatares de jugadores con posición visible
- Animaciones de movimiento
- Reloj/cronómetro visible en la parte superior
- Indicador del jugador actual y tiempo restante

### 4.3 Sistema de Cartas
- Visualización de carta con animación de volteo
- Input numérico para la respuesta (teclado físico o teclado en pantalla)
- Botón "Validar" disponible en cualquier momento
- Validación automática al presionar "Enter" o "Validar"
- Feedback visual inmediato (verde = correcto, rojo = incorrecto)
- Contador de cartas resueltas por jugador

### 4.4 Sistema de Validación de Respuestas

**Principio clave**: Todas las respuestas son **valores numéricos**. Las preguntas del nivel avanzado se reformulan para pedir resultados numéricos concretos:

| Tipo de problema | Pregunta original | Pregunta en el juego | Respuesta |
|------------------|-------------------|----------------------|-----------|
| Integral indefinida | Resuelve ∫ x² dx | Evalúa ∫₀² x² dx | 2.67 |
| Ecuación | Resuelve 2x + 5 = 15 | ¿Cuánto vale x? | 5 |
| Sistema de ecuaciones | Resuelve el sistema | ¿Cuánto vale x? | 1.8 |
| Derivada | Deriva f(x) = x³ | ¿Cuánto vale f'(2)? | 12 |
| Estadística | Calcula la media | ¿Cuál es la media? | 8.4 |

**Mecánica de validación**:
```
Comparación numérica con tolerancia de ±0.01
Ejemplo: respuesta correcta = 2.67, respuesta del jugador = 2.66 → válida
```

**Ventajas**:
- Validación automática sin ambigüedad
- Permite diferentes redondeos
- Sin necesidad de juez humano
- Rápida de ejecutar (encaja en el temporizador)

### 4.5 Banco de Preguntas (90+ cartas)

**Nivel 1 - EGB (30 cartas)**
- Blancas (10 pts): operaciones básicas → respuesta numérica
- Rojas (20 pts): multiplicación/división contextualizada → respuesta numérica

**Nivel 2 - Básica Superior (30 cartas)**
- Verdes (10 pts): sumas/restas aplicadas → respuesta numérica
- Amarillas (20 pts): multiplicación/división contextualizada → respuesta numérica
- Rojas (30 pts): retos de medición y razonamiento → respuesta numérica

**Nivel 3 - Bachillerato (30 cartas)**
- Azules (10 pts): ecuaciones, sistemas, funciones → respuesta numérica
- Amarillas (20 pts): matrices, estadística → respuesta numérica
- Naranjas (30 pts): derivadas, integrales definidas → respuesta numérica

**Estructura de datos de cada carta**:
```json
{
  "id": 330,
  "nivel": 3,
  "color": "naranja",
  "puntos": 30,
  "pregunta": "Evalúa la integral: ∫₀¹ x² dx",
  "respuesta": 0.333,
  "tolerancia": 0.01,
  "tiempo": 120
}
```

### 4.6 Sistema de Tiempo ⏱️

**Temporizador por carta**:
- 120 segundos para resolver cada carta
- Contador regresivo visible en pantalla
- Alertas visuales:
  - 🟢 Verde: >60 segundos restantes
  - 🟡 Amarillo: 30-60 segundos restantes
  - 🔴 Rojo parpadeante: <30 segundos restantes
- Alerta sonora a los 10 segundos finales
- Al agotarse: carta se marca como "no resuelta", pasa al siguiente jugador

**Temporizador de partida (modo concurso)**:
- 3 minutos de tiempo total por partida
- Al agotarse: finaliza la partida inmediatamente
- Se procede al conteo de puntos

**Registro de tiempos**:
- Tiempo empleado por cada carta resuelta
- Estadísticas finales: tiempo promedio, carta más rápida/lenta
- Criterio de desempate: menor tiempo acumulado

### 4.7 Mecánicas de Juego
- Turnos rotativos entre jugadores
- Sistema de puntuación automático (10/20/30 pts según dificultad)
- Comodines (estrellita): bonus especiales (ej. doble puntos, saltar penalización)
- Penalizaciones (carita triste): pérdida de puntos o reto extra
- Condiciones de victoria (en orden):
  1. Más puntos acumulados
  2. Mayor cantidad de cartas resueltas
  3. Más cartas de 30 puntos resueltas
  4. Menor tiempo acumulado
- Pantalla de resultados con ranking final y estadísticas

### 4.8 Interfaz Visual
- Diseño colorido y atractivo (tipo feria)
- Colores distintivos por nivel:
  - Nivel 1: Rojo/Blanco
  - Nivel 2: Verde/Amarillo/Rojo
  - Nivel 3: Azul/Amarillo/Naranja
- Animaciones CSS para transiciones y feedback
- Efectos de sonido para aciertos/errores

---

## 5. Fases de Desarrollo

### FASE A: DISEÑO VISUAL (Días 1-7)

#### Fase 1: Configuración Inicial (Días 1-2)
- [ ] Inicializar proyecto Electron
- [ ] Configurar estructura de carpetas
- [ ] Crear ventana principal básica
- [ ] Configurar electron-builder para Windows

#### Fase 2: Diseño Visual con Pencil MCP (Días 3-7)
**Herramienta**: Pencil MCP para diseño de interfaces

**2.1 Diseño de Pantalla de Inicio**
- [ ] Crear mockup de pantalla principal
- [ ] Diseñar selector de nivel (EGB / Básica Superior / Bachillerato)
- [ ] Diseñar formulario de configuración de jugadores (2-4 jugadores)
- [ ] Diseñar selector de modo (Normal / Concurso)
- [ ] Diseñar botón de instrucciones

**2.2 Diseño de Tableros por Nivel**
- [ ] Diseñar tablero Nivel 1 (4x4, colores rojo/blanco)
- [ ] Diseñar tablero Nivel 2 (4x4, colores verde/amarillo/rojo)
- [ ] Diseñar tablero Nivel 3 (4x4, colores azul/amarillo/naranja)
- [ ] Diseñar casillas especiales (⭐ comodín, 😟 penalización, 🎯 meta)
- [ ] Diseñar fichas/avatares de jugadores
- [ ] Diseñar área de temporizador y puntuación

**2.3 Diseño de Cartas de Desafío**
- [ ] Diseñar plantilla de carta (frente con pregunta)
- [ ] Diseñar reverso de carta
- [ ] Diseñar input numérico y botón "Validar"
- [ ] Diseñar feedback visual (verde = correcto, rojo = incorrecto)
- [ ] Diseñar variaciones de color por nivel y dificultad

**2.4 Diseño de Pantalla de Resultados**
- [ ] Diseñar pantalla de fin de juego
- [ ] Diseñar ranking de jugadores
- [ ] Diseñar estadísticas (tiempo, cartas resueltas, puntos)
- [ ] Diseñar botón "Jugar de nuevo" / "Volver al inicio"

**Entregables de Diseño**:
- Archivos .pen con todos los mockups
- Exportación de assets (imágenes, iconos)
- Paleta de colores definida por nivel
- Guía visual de componentes

---

### FASE B: IMPLEMENTACIÓN (Días 8-28)

#### Fase 3: Implementación de Pantallas Base (Días 8-11)
- [ ] Implementar pantalla de inicio según diseño de Pencil
- [ ] Implementar formulario de configuración de jugadores
- [ ] Implementar navegación entre pantallas
- [ ] Implementar pantalla de selección de nivel y modo
- [ ] Aplicar estilos CSS según paleta de colores definida

#### Fase 4: Implementación de Tablero Interactivo (Días 12-16)
- [ ] Crear componente de tablero 4x4 con CSS Grid
- [ ] Implementar casillas con operadores y especiales según diseño
- [ ] Añadir fichas/avatares de jugadores
- [ ] Implementar animaciones de movimiento
- [ ] Diferenciar tableros por nivel (colores del diseño)
- [ ] Integrar assets exportados desde Pencil

#### Fase 5: Implementación de Sistema de Cartas y Validación (Días 17-21)
- [ ] Crear estructura de datos para preguntas (JSON)
- [ ] Implementar carga aleatoria de cartas
- [ ] Implementar componente visual de carta según diseño de Pencil
- [ ] Añadir animación de volteo
- [ ] Implementar input numérico y botón de validación
- [ ] Crear módulo de validación numérica con tolerancia
- [ ] Implementar feedback visual (colores verde/rojo)

#### Fase 6: Implementación de Sistema de Tiempo y Lógica de Juego (Días 22-28)
- [ ] Implementar temporizador por carta (120s con alertas visuales/sonoras)
- [ ] Implementar temporizador de partida (3 min modo concurso)
- [ ] Implementar gestión de turnos
- [ ] Implementar sistema de puntuación
- [ ] Añadir mecánicas de comodines y penalizaciones
- [ ] Implementar condiciones de victoria y desempate
- [ ] Añadir estadísticas de tiempo por jugador
- [ ] Implementar pantalla de resultados según diseño

---

### FASE C: CONTENIDO Y FINALIZACIÓN (Días 29-35)

#### Fase 7: Banco de Preguntas (Días 29-31)
- [ ] Compilar 30 preguntas Nivel 1 (EGB) - respuestas numéricas
- [ ] Compilar 30 preguntas Nivel 2 (Básica Superior) - respuestas numéricas
- [ ] Compilar 30 preguntas Nivel 3 (Bachillerato) - reformuladas a respuestas numéricas
- [ ] Validar todas las respuestas

#### Fase 8: Pulido y Efectos (Días 32-33)
- [ ] Añadir animaciones CSS finales (transiciones, hover, feedback)
- [ ] Implementar efectos de sonido (aciertos/errores)
- [ ] Revisar coherencia visual general
- [ ] Optimizar performance

#### Fase 9: Pruebas y Empaquetado (Días 34-35)
- [ ] Pruebas funcionales de todas las mecánicas
- [ ] Pruebas con usuarios (compañeros de clase)
- [ ] Corrección de bugs
- [ ] Empaquetar como .exe con electron-builder
- [ ] Generar instalador para Windows

---

## 6. Cronograma Resumen

| Semana | Foco |
|--------|------|
| 1 | **DISEÑO**: Configuración inicial + Diseño visual con Pencil MCP |
| 2 | **IMPLEMENTACIÓN**: Pantallas base + Tablero interactivo |
| 3 | **IMPLEMENTACIÓN**: Sistema de cartas + Validación + Tiempo + Lógica de juego |
| 4 | **FINALIZACIÓN**: Banco de preguntas + Pulido + Pruebas + Empaquetado |

---

## 7. Entregables del Proyecto

| Entregable | Formato |
|------------|---------|
| Código fuente | Repositorio Git |
| Ejecutable Windows | .exe instalador |
| Manual de usuario | PDF (cómo jugar) |
| Informe técnico | PDF (desarrollo) |
| Presentación | Diapositivas (feria) |
| Video demo | MP4 (2-3 min) |

---

## 8. Criterios de Éxito (Nivel Feria Pedagógica)

- ✅ Funciona sin errores en Windows 10/11
- ✅ Los 3 niveles son jugables con sus subniveles
- ✅ Multijugador local (2-4 jugadores) funciona correctamente
- ✅ Tablero interactivo con animaciones fluidas
- ✅ Banco de 90+ preguntas con respuestas numéricas validadas
- ✅ Validación automática de respuestas con tolerancia
- ✅ Diseño visual atractivo y coherente
- ✅ Temporizador por carta (120s) con alertas visuales y sonoras
- ✅ Modo concurso con temporizador de partida (3 min)
- ✅ Sistema de puntuación y desempate funcional
- ✅ Instalador .exe funcional

---

## 9. Recursos Necesarios

- **Software**: Node.js, VS Code, Git
- **Hardware**: PC con Windows 10/11
- **Assets**: Iconos gratuitos (Flaticon), sonidos (Freesound)
- **Tiempo**: 5 semanas de desarrollo

---

## 10. Alineación con el Proyecto Pedagógico Original

Este desarrollo digital complementa la versión física descrita en los documentos:
- Mismas mecánicas y reglas del juego
- Mismos niveles y colores de dificultad
- Preguntas contextualizadas reformuladas para validación numérica automática
- Alineado con ODS 4 (Educación de calidad) y ODS 12 (Producción responsable - versión digital sin materiales físicos)
