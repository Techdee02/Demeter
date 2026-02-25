# Demeter Frontend Design System
## Modern African Agriculture-Inspired UI

---

## 1. Design Philosophy

### Core Principles
1. **Grounded, Not Generic** — Avoid sterile tech aesthetics. Use textures, organic shapes, and warm tones that feel connected to land and farming.
2. **Functional First** — Farmers and extension officers need clarity. Information hierarchy matters more than decoration.
3. **Confident & Bold** — African design is vibrant, not muted. Use strong colors with purpose.
4. **Data as Story** — The digital twin should feel alive, not like a static dashboard.

### What We're Avoiding
- Flat, generic SaaS dashboards (Stripe/Linear clones)
- Overly glossy 3D renders
- Stock photo aesthetics
- Gratuitous gradients and glassmorphism
- "Tech startup" blue/purple palettes

---

## 2. Color Palette

### Primary Colors (Earth & Growth)

```
TERRACOTTA (Primary Action)
#C65D3B — Rich, warm earth tone
Use: Primary buttons, key highlights, active states

DEEP SOIL
#2D1B0E — Almost black, warm undertone
Use: Text, headers, dark backgrounds

SAVANNA GOLD  
#D4A853 — Warm wheat/grain gold
Use: Accents, success states, highlights

FRESH LEAF
#4A7C59 — Muted forest green
Use: Positive indicators, growth metrics, healthy states
```

### Secondary Colors (Sky & Water)

```
HARMATTAN DUST
#E8DFD0 — Warm off-white/cream
Use: Backgrounds, cards, light surfaces

BAOBAB BARK
#8B7355 — Neutral warm brown  
Use: Borders, secondary text, dividers

RAIN CLOUD
#6B7B8C — Cool grey-blue
Use: Disabled states, metadata, subtle elements

WATER BLUE
#3D7EA6 — Clear water blue
Use: Links, irrigation indicators, water-related data
```

### Risk/Status Colors

```
CRITICAL — #B8352B (Deep red, not neon)
SEVERE   — #D97B3D (Burnt orange)
MODERATE — #D4A853 (Savanna gold)
LOW      — #7A9E7E (Sage green)
HEALTHY  — #4A7C59 (Fresh leaf)
```

### Color in Context
```
+------------------------------------------------------------------+
|  BACKGROUND: #F5F0E8 (warm cream)                                |
|                                                                  |
|  +---------------------------+  +----------------------------+   |
|  | CARD: #FFFFFF             |  | CARD: #FFFFFF              |   |
|  | Border: #E8DFD0           |  |                            |   |
|  |                           |  |   RISK GAUGE               |   |
|  |  Text: #2D1B0E            |  |   Fill: #D97B3D (SEVERE)   |   |
|  |  Subtext: #8B7355         |  |   Track: #E8DFD0           |   |
|  |                           |  |                            |   |
|  |  [BUTTON: #C65D3B]        |  |                            |   |
|  |  Button text: #FFFFFF     |  |                            |   |
|  +---------------------------+  +----------------------------+   |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 3. Typography

### Font Stack

```css
/* Headers - Strong, geometric, African-inspired */
--font-display: 'DM Sans', 'Inter', system-ui, sans-serif;

/* Body - Clear, readable */  
--font-body: 'Inter', 'DM Sans', system-ui, sans-serif;

/* Monospace - Data, numbers */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

```
Display   — 48px / 1.1 / -0.02em / Bold
H1        — 32px / 1.2 / -0.01em / Semibold  
H2        — 24px / 1.3 / -0.01em / Semibold
H3        — 18px / 1.4 / 0 / Medium
Body      — 16px / 1.5 / 0 / Regular
Small     — 14px / 1.5 / 0 / Regular
Caption   — 12px / 1.4 / 0.01em / Medium (uppercase for labels)

Numbers   — Tabular figures, medium weight
```

### Typography Examples
```
CURRENT RISK LEVEL          <- Caption (12px, uppercase, #8B7355)
72                          <- Display (48px, bold, #D97B3D)  
Severe Stress               <- H3 (18px, medium, #2D1B0E)
Irrigate within 3 days      <- Body (16px, regular, #8B7355)
```

---

## 4. Layout Grid

### Desktop (1440px design, fluid)
```
+------------------------------------------------------------------+
|  64px margin  |  12 columns @ 72px  |  24px gutter  |  64px      |
+------------------------------------------------------------------+

Content max-width: 1200px
Sidebar: 280px (fixed)
Main content: fluid
```

### Tablet (768px - 1024px)
```
+------------------------------------------+
|  32px  |  8 columns  |  16px gap  |  32px |
+------------------------------------------+

Sidebar collapses to top nav or hamburger
Cards stack 2-up or full width
```

### Mobile (< 768px)
```
+------------------------+
|  16px  |  4 col  | 16px |
+------------------------+

Full-width cards
Bottom navigation
Simplified 3D view
```

---

## 5. Component Design

### Cards
```
+------------------------------------------+
|                                          |
|  16px padding top                        |
|                                          |
|  +------------------------------------+  |
|  |  LABEL                        icon |  |  <- 12px uppercase
|  |                                    |  |
|  |  Main Value                        |  |  <- 32px bold
|  |  Supporting text here              |  |  <- 14px muted
|  |                                    |  |
|  +------------------------------------+  |
|                                          |
|  16px padding bottom                     |
|  2px border-bottom: #E8DFD0              |
+------------------------------------------+

- Background: #FFFFFF
- Border-radius: 12px
- Shadow: 0 1px 3px rgba(45, 27, 14, 0.08)
- Border: 1px solid #E8DFD0 (optional)
```

### Risk Gauge (Radial)
```
         _____
       /   72  \        <- Large number centered
      |  SEVERE  |      <- Status text below
       \_______/
      
      [===========----] <- Linear alternative below

- Arc stroke: 12px
- Track: #E8DFD0  
- Fill: Risk color (gradient optional)
- Endcap: round
- Animation: ease-out, 800ms on load
```

### Buttons
```
PRIMARY                    SECONDARY                 GHOST
+------------------+      +------------------+      +------------------+
| Run Simulation   |      | View History     |      | Cancel           |
+------------------+      +------------------+      +------------------+
BG: #C65D3B               BG: transparent           BG: transparent
Text: #FFFFFF             Border: #C65D3B           Text: #8B7355
                          Text: #C65D3B             

- Height: 44px (touch-friendly)
- Padding: 0 24px
- Border-radius: 8px
- Font: 14px medium
- Hover: darken 8%
- Active: darken 12%
```

### Input Fields
```
+------------------------------------------+
|  Label                                   |  <- 12px, #8B7355
|  +------------------------------------+  |
|  | Placeholder text                   |  |  <- 16px, #BAAE9E
|  +------------------------------------+  |
|  Helper text or error                    |  <- 12px
+------------------------------------------+

- Border: 1px solid #E8DFD0
- Focus border: 2px solid #C65D3B
- Border-radius: 8px
- Height: 48px
- Padding: 0 16px
```

### Data Pills / Tags
```
+-------------+  +---------------+  +----------+
| Vegetative  |  | 5 days ago    |  | +12%     |
+-------------+  +---------------+  +----------+
BG: #E8DFD0      BG: #F5F0E8        BG: #E8F2E8
Text: #2D1B0E    Text: #8B7355      Text: #4A7C59

- Padding: 4px 12px
- Border-radius: 100px (pill)
- Font: 12px medium
```

---

## 6. Page Layouts

### Dashboard (Main View)
```
+------------------------------------------------------------------+
|  NAVBAR                                                          |
|  [Logo]                    [Farm Selector v]    [Profile]        |
+------------------------------------------------------------------+
|        |                                                         |
|  S     |  MAIN CONTENT                                          |
|  I     |                                                         |
|  D     |  +----------------------+  +------------------------+   |
|  E     |  |                      |  |                        |   |
|  B     |  |   3D FARM VIEW       |  |    RISK PANEL          |   |
|  A     |  |   (Digital Twin)     |  |                        |   |
|  R     |  |                      |  |    [72] SEVERE         |   |
|        |  |   [Rotate] [Reset]   |  |    Days to critical: 4 |   |
|  Nav   |  +----------------------+  +------------------------+   |
|  Links |                                                         |
|        |  +----------------------+  +------------------------+   |
|        |  |   SENSOR DATA        |  |   SIMULATION           |   |
|        |  |                      |  |                        |   |
|        |  |   Soil: 32%          |  |   [Scenario v]         |   |
|        |  |   Temp: 34°C         |  |   [Duration: 14]       |   |
|        |  |   Humidity: 45%      |  |   [Run Simulation]     |   |
|        |  +----------------------+  +------------------------+   |
|        |                                                         |
|        |  +--------------------------------------------------+   |
|        |  |   FORECAST CHART (7-day stress trajectory)       |   |
|        |  +--------------------------------------------------+   |
|        |                                                         |
|        |  +--------------------------------------------------+   |
|        |  |   RECOMMENDATION BANNER                          |   |
|        |  |   ! Irrigate 25mm within 3 days...   [Send SMS]  |   |
|        |  +--------------------------------------------------+   |
+------------------------------------------------------------------+
```

### Sidebar Navigation
```
+------------------------+
|                        |
|  [DEMETER LOGO]        |
|                        |
|  ----------------------|
|                        |
|  > Dashboard           |  <- Active: #C65D3B bg tint
|    Farm Overview       |
|    Simulations         |
|    Alerts              |
|                        |
|  ----------------------|
|                        |
|  MY FARMS              |  <- Section label
|    + Amina's Farm      |
|      Kaduna Field 2    |
|                        |
|  ----------------------|
|                        |
|  [+ Add Farm]          |
|                        |
|  ----------------------|
|                        |
|  Settings              |
|  Help                  |
|                        |
+------------------------+
```

### Mobile Layout
```
+------------------------+
|  [=] DEMETER    [Farm] |  <- Hamburger + farm selector
+------------------------+
|                        |
|  +------------------+  |
|  |   3D FARM VIEW   |  |  <- Simplified, touch gestures
|  |   (Compact)      |  |
|  +------------------+  |
|                        |
|  +------------------+  |
|  | 72  SEVERE       |  |  <- Risk summary card
|  | Critical in 4d   |  |
|  +------------------+  |
|                        |
|  +------------------+  |
|  | QUICK ACTIONS    |  |
|  | [Simulate] [SMS] |  |
|  +------------------+  |
|                        |
|  +------------------+  |
|  | Soil    | Temp   |  |  <- 2-up sensor cards
|  | 32%     | 34°C   |  |
|  +------------------+  |
|                        |
+------------------------+
|  [Home] [Sim] [Alert]  |  <- Bottom nav
+------------------------+
```

---

## 7. 3D Digital Farm Visualization

### Approach
Use **Three.js + React Three Fiber** for the 3D farm view. Keep it stylized, not photorealistic — think low-poly with warm textures.

### Scene Components

```
3D FARM SCENE
|
+-- Ground Plane
|   - Terrain mesh (subtle undulation)
|   - Texture: Warm earth/soil texture
|   - Grid overlay showing farm zones (optional)
|
+-- Crop Field
|   - Instanced maize stalks (low-poly)
|   - Color varies by health: green -> yellow -> brown
|   - Sway animation (subtle wind effect)
|   - Growth stage affects height/density
|
+-- Sensor Node
|   - Small post with blinking indicator
|   - Click to see sensor details
|   - Pulse animation when transmitting
|
+-- Weather Elements
|   - Sun position (time of day)
|   - Cloud shadows (if forecast is cloudy)
|   - Rain particles (during simulation)
|
+-- Stress Overlay
|   - Heat map on ground showing moisture levels
|   - Red/yellow zones for stressed areas
|   - Animated during simulation
|
+-- Camera
|   - Isometric default view
|   - Orbit controls (drag to rotate)
|   - Zoom limits (don't go inside ground)
```

### Visual Style Reference
```
     \   |   /
      \  |  /       <- Stylized sun
       \ | /
  ___________________
 /                   \
|  ||||  ||||  ||||   |  <- Maize rows (simple shapes)
|  ||||  ||||  ||||   |
|  ||||  ||||  ||||   |
|___[S]_______________|  <- [S] = Sensor node
    
- Low-poly aesthetic
- Soft shadows
- Muted, earthy color palette
- No harsh lighting
```

### Interaction States

| State | Visual Change |
|-------|---------------|
| Healthy | Green crops, neutral lighting |
| Stressed | Yellow/brown crops, warmer lighting |
| Critical | Brown crops, red ground overlay, harsh lighting |
| Simulating | Animated transition, particles |
| Irrigating | Blue water effect, crops brighten |

### Performance Considerations
- Use instanced meshes for crops (1 draw call for hundreds of plants)
- LOD (Level of Detail) for mobile
- Baked lighting where possible
- Target 60fps on mid-range devices
- Fallback to 2D illustration for low-end devices

---

## 8. Iconography

### Icon Style
- **Stroke-based**, 1.5px weight
- Rounded caps and joins
- 24x24 base size
- Consistent with Lucide or Phosphor icon sets

### Custom Icons Needed
```
[Soil moisture]  - Water droplet in soil layers
[Crop health]    - Plant with health indicator  
[Stress level]   - Thermometer with warning
[Simulation]     - Play button with sparkles/grid
[Digital twin]   - Abstract farm/mirror concept
[Irrigation]     - Water drops over field
[Growth stage]   - Plant at different heights
[Weather]        - Sun/cloud/rain
```

### Icon Colors
- Default: #8B7355 (Baobab bark)
- Active: #C65D3B (Terracotta)
- On dark: #E8DFD0 (Harmattan dust)

---

## 9. Motion & Animation

### Principles
- **Purposeful** — Animation guides attention, doesn't distract
- **Quick** — 150-300ms for most transitions
- **Natural** — Ease-out for entering, ease-in for exiting

### Specific Animations

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page transition | Fade + slide up | 200ms | ease-out |
| Card hover | Lift + shadow | 150ms | ease-out |
| Risk gauge fill | Arc sweep | 800ms | ease-out |
| Chart line draw | Path animation | 600ms | ease-out |
| 3D crop sway | Continuous oscillation | 3s loop | sine |
| Simulation run | Progress + particles | 2s | linear |
| Alert banner | Slide down | 300ms | spring |
| Button press | Scale 0.97 | 100ms | ease-out |

### Loading States
```
Skeleton loading for cards:
+------------------------------------------+
|  [====                    ]              |  <- Shimmer animation
|  [===========             ]              |
|  [=======                 ]              |
+------------------------------------------+

3D scene loading:
- Show 2D silhouette first
- Fade in 3D scene when ready
- Progress indicator if >2s
```

---

## 10. Responsive Breakpoints

```css
/* Mobile first approach */

/* Small phones */
@media (min-width: 375px) { }

/* Large phones */
@media (min-width: 480px) { }

/* Tablets */
@media (min-width: 768px) {
  /* 2-column layouts */
  /* Show sidebar */
}

/* Small desktop */
@media (min-width: 1024px) {
  /* Full dashboard layout */
}

/* Large desktop */
@media (min-width: 1440px) {
  /* Max-width containers */
}
```

---

## 11. Dark Mode (Optional/Future)

```
DARK PALETTE
Background:    #1A1512 (warm dark brown)
Surface:       #2A2420 (elevated)
Border:        #3A3430
Text Primary:  #F5F0E8
Text Secondary:#A89A8A

- Keep terracotta accent
- Reduce saturation on status colors
- 3D scene: darker lighting, brighter highlights
```

---

## 12. Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #C65D3B;
  --color-primary-hover: #B5522F;
  --color-soil: #2D1B0E;
  --color-gold: #D4A853;
  --color-leaf: #4A7C59;
  --color-dust: #E8DFD0;
  --color-bark: #8B7355;
  --color-cloud: #6B7B8C;
  --color-water: #3D7EA6;
  
  /* Risk colors */
  --color-critical: #B8352B;
  --color-severe: #D97B3D;
  --color-moderate: #D4A853;
  --color-low: #7A9E7E;
  --color-healthy: #4A7C59;
  
  /* Backgrounds */
  --bg-page: #F5F0E8;
  --bg-card: #FFFFFF;
  --bg-elevated: #FFFFFF;
  
  /* Typography */
  --font-display: 'DM Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-8: 48px;
  --space-10: 64px;
  
  /* Radii */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(45, 27, 14, 0.05);
  --shadow-md: 0 2px 8px rgba(45, 27, 14, 0.08);
  --shadow-lg: 0 8px 24px rgba(45, 27, 14, 0.12);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;
  --transition-slow: 300ms ease-out;
}
```

---

## 13. Component Checklist

### Core Components
- [ ] Button (primary, secondary, ghost, icon)
- [ ] Input (text, number, select, textarea)
- [ ] Card (standard, metric, interactive)
- [ ] Badge / Pill
- [ ] Alert / Banner
- [ ] Modal / Dialog
- [ ] Tooltip
- [ ] Dropdown menu
- [ ] Tabs
- [ ] Loading skeleton

### Domain-Specific Components
- [ ] RiskGauge (radial + linear variants)
- [ ] SensorCard (moisture, temp, humidity)
- [ ] ForecastChart (area/line chart)
- [ ] SimulationPanel (scenario selector + params)
- [ ] RecommendationBanner
- [ ] FarmSelector dropdown
- [ ] GrowthStageIndicator
- [ ] WeatherForecastStrip

### 3D Components
- [ ] FarmScene (main canvas)
- [ ] CropField (instanced plants)
- [ ] SensorNode (3D marker)
- [ ] StressOverlay (heat map)
- [ ] WeatherEffects (sun, clouds, rain)
- [ ] CameraControls (orbit, reset)

---

## 14. Assets Needed

### Images
- [ ] Logo (SVG, multiple sizes)
- [ ] Favicon / App icon
- [ ] Empty states illustrations
- [ ] Onboarding illustrations (optional)

### 3D Models (Low-poly)
- [ ] Maize plant (3-4 growth stages)
- [ ] Ground/terrain base
- [ ] Sensor post
- [ ] Sun/cloud elements

### Textures
- [ ] Soil texture (tileable)
- [ ] Grass/crop color variations
- [ ] Subtle noise/grain overlay

---

## 15. Reference Inspiration

### Color & Texture
- African textiles (Kente, Ankara patterns) — for accent patterns
- Terracotta pottery
- Savanna landscapes at golden hour
- Traditional Nigerian architecture

### UI References
- Linear.app (clarity, not the color scheme)
- Notion (information density done right)
- Stripe Dashboard (data visualization)
- Vercel (dark mode elegance)

### 3D Style
- Polytoria / low-poly games
- Monument Valley (stylized, not realistic)
- Firewatch (color and atmosphere)

---

**Next Steps:**
1. Set up Figma/design file with tokens
2. Build component library in Storybook
3. Prototype 3D scene in R3F
4. Implement responsive dashboard shell
