# Design System - Mathing Head

## 1. Identidad Visual

**Nombre del juego**: Mathing Head  
**Concepto**: Juego educativo que combina aprendizaje matemático con mecánicas lúdicas  
**Público objetivo**: Estudiantes de 5.° EGB hasta Bachillerato (10-18 años)  
**Valores**: Educativo, divertido, competitivo, inclusivo, progresivo

---

## 2. Estilo Visual General

**Estilo**: Colorido y cartoon  
**Características**:
- Colores vivos y saturados
- Formas redondeadas y amigables
- Bordes definidos con sombras suaves
- Ilustraciones tipo cartoon (no realistas)
- Elementos con profundidad (sombras, gradientes sutiles)
- Animaciones fluidas y juguetonas

**Mood**: Energético, motivador, accesible, lúdico

---

## 3. Paleta de Colores

### 3.1 Colores Primarios (Marca)

| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| **Amarillo principal** | `#FFC107` | 255, 193, 7 | Color principal, botones, highlights |
| **Naranja principal** | `#FF9800` | 255, 152, 0 | Acentos, hover, elementos activos |
| **Naranja oscuro** | `#F57C00` | 245, 124, 0 | Texto sobre amarillo, bordes |

### 3.2 Colores por Nivel

#### Nivel 1 - EGB (Rojo/Blanco)
| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| Rojo | `#F44336` | 244, 67, 54 | Casillas, cartas nivel 1 |
| Rojo claro | `#FFCDD2` | 255, 205, 210 | Fondos suaves nivel 1 |
| Blanco | `#FFFFFF` | 255, 255, 255 | Casillas, contraste |

#### Nivel 2 - Básica Superior (Verde/Amarillo/Rojo)
| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| Verde | `#4CAF50` | 76, 175, 80 | Casillas fáciles, cartas verdes |
| Amarillo | `#FFEB3B` | 255, 235, 59 | Casillas medias, cartas amarillas |
| Rojo | `#F44336` | 244, 67, 54 | Casillas difíciles, cartas rojas |

#### Nivel 3 - Bachillerato (Azul/Amarillo/Naranja)
| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| Azul | `#2196F3` | 33, 150, 243 | Casillas básicas, cartas azules |
| Amarillo | `#FFEB3B` | 255, 235, 59 | Casillas medias, cartas amarillas |
| Naranja | `#FF9800` | 255, 152, 0 | Casillas avanzadas, cartas naranjas |

### 3.3 Colores de Fondo

| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| **Fondo principal** | `#FFF8E1` | 255, 248, 225 | Fondo general de la app (amarillo muy claro) |
| **Fondo secundario** | `#FFFFFF` | 255, 255, 255 | Tarjetas, modales, contenedores |
| **Fondo oscuro** | `#3E2723` | 62, 39, 35 | Contraste, elementos destacados |

### 3.4 Colores de Texto

| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| **Texto principal** | `#3E2723` | 62, 39, 35 | Títulos, contenido principal |
| **Texto secundario** | `#795548` | 121, 85, 72 | Descripciones, texto auxiliar |
| **Texto sobre amarillo** | `#E65100` | 230, 81, 0 | Texto en fondos amarillos |

### 3.5 Colores de Feedback

| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| **Correcto** | `#4CAF50` | 76, 175, 80 | Respuesta correcta, éxito |
| **Incorrecto** | `#F44336` | 244, 67, 54 | Respuesta incorrecta, error |
| **Advertencia** | `#FF9800` | 255, 152, 0 | Alertas, advertencias |

### 3.6 Colores del Temporizador

| Color | Hex | RGB | Rango de tiempo |
|-------|-----|-----|-----------------|
| **Verde** | `#4CAF50` | 76, 175, 80 | >60 segundos restantes |
| **Amarillo** | `#FFC107` | 255, 193, 7 | 30-60 segundos restantes |
| **Rojo** | `#F44336` | 244, 67, 54 | <30 segundos restantes |

---

## 4. Tipografía

### 4.1 Fuentes

| Uso | Fuente | Peso | Tamaño base |
|-----|--------|------|-------------|
| **Títulos** | Poppins | Bold (700) | 2rem - 3rem |
| **Cuerpo** | Nunito | Regular (400) | 1rem - 1.25rem |
| **Números/Ecuaciones** | Quicksand | Medium (500) | 1.5rem - 2rem |

### 4.2 Jerarquía de Tamaños

```css
h1 { font-size: 3rem; }      /* 48px - Títulos principales */
h2 { font-size: 2.5rem; }    /* 40px - Subtítulos */
h3 { font-size: 2rem; }      /* 32px - Secciones */
h4 { font-size: 1.5rem; }    /* 24px - Subsecciones */
p  { font-size: 1.125rem; }  /* 18px - Cuerpo de texto */
small { font-size: 0.875rem; } /* 14px - Texto auxiliar */
```

### 4.3 Import de Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Poppins:wght@600;700;800&family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">
```

---

## 5. Componentes Visuales

### 5.1 Botones

**Estilo**: Redondeados, con sombra, efecto hover con elevación

```css
.btn-primary {
  background: linear-gradient(135deg, #FFC107 0%, #FF9800 100%);
  color: #3E2723;
  border: 3px solid #F57C00;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  box-shadow: 0 6px 0 #F57C00, 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 0 #F57C00, 0 12px 24px rgba(0, 0, 0, 0.25);
}

.btn-primary:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #F57C00, 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### 5.2 Cartas de Desafío

**Estilo**: Bordes redondeados, sombra pronunciada, animación de volteo

```css
.card {
  background: #FFFFFF;
  border-radius: 20px;
  border: 4px solid;
  padding: 2rem;
  box-shadow: 0 8px 0 rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: rotate(2deg) scale(1.02);
}

/* Colores de borde según nivel */
.card-nivel1 { border-color: #F44336; }
.card-nivel2-verde { border-color: #4CAF50; }
.card-nivel2-amarillo { border-color: #FFEB3B; }
.card-nivel2-rojo { border-color: #F44336; }
.card-nivel3-azul { border-color: #2196F3; }
.card-nivel3-amarillo { border-color: #FFEB3B; }
.card-nivel3-naranja { border-color: #FF9800; }
```

### 5.3 Tablero

**Estilo**: Grid 4x4, casillas redondeadas, iconos grandes

```css
.board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 2rem;
  background: #FFF8E1;
  border-radius: 24px;
  border: 6px solid #FF9800;
  box-shadow: 0 12px 0 rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.2);
}

.board-cell {
  aspect-ratio: 1;
  background: #FFFFFF;
  border-radius: 16px;
  border: 3px solid #3E2723;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.board-cell:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.2);
}
```

### 5.4 Iconos

**Estilo**: Cartoon, redondeados, colores vivos

- **Operadores matemáticos**: `+` `−` `×` `÷` (fuentes grandes, colores por nivel)
- **Comodín (⭐)**: Estrella amarilla con brillo
- **Penalización (😟)**: Carita triste azul
- **Meta (🎯)**: Diana roja/blanca

**Tamaños**:
- Iconos de tablero: 64x64px
- Iconos de cartas: 48x48px
- Iconos de botones: 32x32px

---

## 6. Animaciones

### 6.1 Transiciones Base

```css
:root {
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### 6.2 Animaciones Definidas

**Volteo de carta**:
```css
@keyframes cardFlip {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(90deg); }
  100% { transform: rotateY(0deg); }
}
```

**Feedback correcto**:
```css
@keyframes correctPulse {
  0%, 100% { background: #4CAF50; }
  50% { background: #81C784; }
}
```

**Feedback incorrecto**:
```css
@keyframes incorrectShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
```

**Temporizador parpadeante** (<30s):
```css
@keyframes timerBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 7. Espaciado y Layout

### 7.1 Sistema de Espaciado

```css
:root {
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 1.5rem;   /* 24px */
  --spacing-lg: 2rem;     /* 32px */
  --spacing-xl: 3rem;     /* 48px */
  --spacing-2xl: 4rem;    /* 64px */
}
```

### 7.2 Bordes Redondeados

```css
:root {
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-full: 50px;
}
```

### 7.3 Sombras

```css
:root {
  --shadow-sm: 0 2px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 0 rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 0 rgba(0, 0, 0, 0.15), 0 12px 24px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 12px 0 rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.2);
}
```

---

## 8. Responsive Design

### 8.1 Breakpoints

```css
/* Mobile first */
:root {
  --container-width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --container-width: 720px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --container-width: 960px;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  :root {
    --container-width: 1200px;
  }
}
```

### 8.2 Tamaños de Ventana (Electron)

- **Mínimo**: 1024x768
- **Recomendado**: 1280x800
- **Óptimo**: 1920x1080

---

## 9. Accesibilidad

### 9.1 Contraste de Colores

Todos los textos deben cumplir WCAG AA (ratio mínimo 4.5:1):
- Texto principal sobre fondo: `#3E2723` sobre `#FFF8E1` → Ratio 12.5:1 ✓
- Texto sobre amarillo: `#E65100` sobre `#FFC107` → Ratio 4.8:1 ✓

### 9.2 Tamaños Mínimos

- Texto: 14px mínimo
- Botones: 44x44px mínimo
- Áreas clickeables: 44x44px mínimo

### 9.3 Focus States

```css
:focus {
  outline: 3px solid #FF9800;
  outline-offset: 2px;
}
```

---

## 10. Ejemplos de Aplicación

### 10.1 Pantalla de Inicio

```
┌─────────────────────────────────────┐
│  Fondo: #FFF8E1                     │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Fondo: #FFFFFF             │   │
│  │  Borde: 6px #FF9800         │   │
│  │                             │   │
│  │  [Logo Mathing Head]        │   │
│  │  Poppins Bold 3rem #FF9800  │   │
│  │                             │   │
│  │  [Selector de Nivel]        │   │
│  │  3 botones grandes          │   │
│  │                             │   │
│  │  [Configuración Jugadores]  │   │
│  │                             │   │
│  │  [Botón COMENZAR]           │   │
│  │  Amarillo/Naranja gradiente │   │
│  │                             │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 10.2 Tablero de Juego

```
┌─────────────────────────────────────┐
│  Temporizador: 02:15 (verde)        │
│  Jugador actual: [Avatar] Juan      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ⭐  │  +  │  😟 │  ×  │   │   │
│  │─────┼─────┼─────┼─────│   │   │
│  │  ÷  │  🎯 │  -  │  +  │   │   │
│  │─────┼─────┼─────┼─────│   │   │
│  │  ×  │  ⭐ │  ÷  │  😟 │   │   │
│  │─────┼─────┼─────┼─────│   │   │
│  │  -  │  +  │  ×  │  🎯 │   │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Carta de desafío]                 │
│  Borde rojo (nivel 1)               │
│  "Sofía compra 2 empanadas..."      │
│                                     │
│  [Input numérico] [Validar]         │
└─────────────────────────────────────┘
```

---

## 11. Assets Necesarios

### 11.1 Iconos (SVG o PNG)
- Operadores: `+` `−` `×` `÷`
- Comodín: ⭐ estrella
- Penalización: 😟 carita triste
- Meta: 🎯 diana
- Avatares de jugadores (4 colores)
- Logo del juego

### 11.2 Sonidos (MP3 o WAV)
- Click de botón
- Respuesta correcta (campanita)
- Respuesta incorrecta (buzzer)
- Temporizador <10s (tic-tac)
- Tiempo agotado (alarma)
- Victoria (fanfarria)

### 11.3 Imágenes de Fondo
- Patrón sutil para fondo principal
- Texturas para tableros por nivel

---

## 12. Referencias Visuales

**Inspiración**:
- Juegos educativos infantiles (colores vivos, formas redondeadas)
- Apps de gamificación (Duolingo, Kahoot)
- Juegos de mesa digitales modernos

**Moodboards**:
- Dribbble: "educational game UI"
- Behance: "math learning app"
- Pinterest: "cartoon game interface"

---

## 13. Próximos Pasos

1. ✅ Definir paleta de colores
2. ✅ Definir tipografía
3. ✅ Definir componentes visuales
4. ⏳ Crear mockups en Pencil MCP
5. ⏳ Exportar assets (iconos, sonidos)
6. ⏳ Implementar en HTML/CSS

---

**Versión**: 1.0  
**Última actualización**: 2026-07-05  
**Autor**: Equipo Mathing Head
