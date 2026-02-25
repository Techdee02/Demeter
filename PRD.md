# Demeter - Product Requirements Document
## AI-Powered Digital Twin for Smallholder Maize Production

**Version:** 1.0  
**Date:** February 25, 2026  
**Team:** 3-4 members (Frontend, Backend/Java, AI Engineer, Hardware)

---

## 1. Executive Summary

**Demeter** is an AI-powered Digital Twin platform that helps smallholder maize farmers in Sub-Saharan Africa predict climate risks and simulate farming decisions before committing resources.

### One-Liner
> An AI farm co-pilot that lets farmers test "what-if" scenarios and receive SMS-based decision guidance.

### Key Value Proposition
- **Predict** drought stress 7-14 days ahead
- **Simulate** scenarios (dry spells, delayed planting, irrigation changes)
- **Alert** farmers via SMS with actionable recommendations

---

## 2. Problem Statement

- Sub-Saharan Africa loses **$4B+ annually** in maize production due to climate volatility
- Smallholder farmers (80% of food production) make decisions **blind to near-term risks**
- A single misjudged decision during dry spell = **30-50% yield loss**

### Target Persona
**Amina**, 38, Kaduna State, Nigeria
- Grows maize on 1.5 hectares
- Feature phone, uses mobile money
- Rain-fed agriculture
- Lost 45% of harvest last season to unexpected dry spell

---

## 3. Solution Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         DEMETER FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   SENSOR DATA          WEATHER API         SYNTHETIC DATA       │
│       │                    │                    │               │
│       └────────────────────┼────────────────────┘               │
│                            ▼                                    │
│                   ┌─────────────────┐                           │
│                   │   JAVA BACKEND  │                           │
│                   │   (Spring Boot) │                           │
│                   │   - REST API    │                           │
│                   │   - Data Store  │                           │
│                   └────────┬────────┘                           │
│                            │                                    │
│                            ▼                                    │
│                   ┌─────────────────┐                           │
│                   │   ML SERVICE    │                           │
│                   │   (Python)      │                           │
│                   │   - Ensemble    │                           │
│                   │   - Simulation  │                           │
│                   └────────┬────────┘                           │
│                            │                                    │
│            ┌───────────────┼───────────────┐                    │
│            ▼               ▼               ▼                    │
│       ┌─────────┐    ┌──────────┐    ┌──────────┐              │
│       │DASHBOARD│    │   SMS    │    │   API    │              │
│       │(Next.js)│    │(Africa's │    │ Response │              │
│       │         │    │ Talking) │    │          │              │
│       └─────────┘    └──────────┘    └──────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Core Features

| ID | Feature | Priority | Owner |
|----|---------|----------|-------|
| F1 | Sensor data ingestion (real + synthetic) | P0 | Backend + Hardware |
| F2 | Weather data integration (Open-Meteo) | P0 | Backend |
| F3 | ML Ensemble prediction engine | P0 | AI Engineer |
| F4 | Scenario simulation API | P0 | AI Engineer + Backend |
| F5 | Dashboard with risk visualization | P0 | Frontend |
| F6 | SMS alerts via Africa's Talking | P1 | Backend |
| F7 | Farm management (CRUD) | P1 | Backend + Frontend |

---

## 5. ML Ensemble Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      ML ENSEMBLE                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │  PHYSICS MODEL   │  │  RANDOM FOREST   │  │    LSTM       │ │
│  │  (Water Balance) │  │  (Classifier)    │  │  (Forecaster) │ │
│  │                  │  │                  │  │               │ │
│  │  Hargreaves ET₀  │  │  Stress classes: │  │  14-day       │ │
│  │  FAO-56 Kc       │  │  None/Low/Med/   │  │  rolling      │ │
│  │  Soil deficit    │  │  Severe/Critical │  │  prediction   │ │
│  │                  │  │                  │  │               │ │
│  │  Weight: 0.4     │  │  Weight: 0.35    │  │  Weight: 0.25 │ │
│  └────────┬─────────┘  └────────┬─────────┘  └───────┬───────┘ │
│           │                     │                     │         │
│           └─────────────────────┼─────────────────────┘         │
│                                 ▼                               │
│                    ┌────────────────────┐                       │
│                    │   META-LEARNER     │                       │
│                    │   Weighted Average │                       │
│                    └──────────┬─────────┘                       │
│                               ▼                                 │
│                    ┌────────────────────┐                       │
│                    │  OUTPUT            │                       │
│                    │  - Stress Index    │                       │
│                    │  - Risk Category   │                       │
│                    │  - Confidence      │                       │
│                    │  - Recommendation  │                       │
│                    └────────────────────┘                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Model Inputs
- Soil moisture (%)
- Temperature (°C)
- Humidity (%)
- Rainfall (mm) - actual + forecast
- Crop growth stage
- Days since last rain

### Model Outputs
- `stress_index`: 0-100
- `risk_category`: None | Low | Moderate | Severe | Critical
- `confidence`: 0-1
- `days_to_critical`: integer
- `recommendation`: string

---

## 6. Tech Stack

| Layer | Technology | Owner |
|-------|------------|-------|
| **Frontend** | Next.js 14 + TypeScript + Tailwind + Recharts | Frontend Dev |
| **Backend API** | Java 17 + Spring Boot 3 | Backend Dev |
| **ML Service** | Python 3.11 + FastAPI + scikit-learn + TensorFlow | AI Engineer |
| **Database** | PostgreSQL | Backend Dev |
| **Hardware** | ESP32 + DHT22 + Soil Moisture Sensor | Hardware Engineer |
| **Weather API** | Open-Meteo (free) | Backend Dev |
| **SMS** | Africa's Talking | Backend Dev |
| **Hosting** | Vercel (FE) + Railway (BE + ML) | All |

---

## 7. API Contracts

### 7.1 Sensor Data Ingestion
```
POST /api/v1/sensor-data
{
  "farm_id": "uuid",
  "soil_moisture": 45.2,
  "temperature": 32.5,
  "humidity": 65.0,
  "timestamp": "2026-02-25T10:30:00Z"
}
```

### 7.2 Get Prediction
```
GET /api/v1/farms/{farm_id}/prediction

Response:
{
  "farm_id": "uuid",
  "stress_index": 72,
  "risk_category": "SEVERE",
  "confidence": 0.85,
  "days_to_critical": 4,
  "recommendation": "Irrigate 25mm within 3 days",
  "forecast": [
    {"day": 1, "stress": 72},
    {"day": 2, "stress": 76},
    ...
  ]
}
```

### 7.3 Run Simulation
```
POST /api/v1/farms/{farm_id}/simulate
{
  "scenario": "DRY_WEEK",
  "parameters": {
    "duration_days": 14,
    "rainfall_mm": 0
  }
}

Response:
{
  "baseline": {"stress_index": 45, "yield_impact": 0},
  "simulated": {"stress_index": 82, "yield_impact": -35},
  "recommendation": "Irrigate 25mm before day 3 to avoid critical stress"
}
```

### 7.4 Send SMS Alert
```
POST /api/v1/alerts/sms
{
  "farm_id": "uuid",
  "phone": "+2348012345678",
  "language": "en"  // or "ha" for Hausa
}
```

---

## 8. Database Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE SCHEMA                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────┐         ┌────────────────┐                 │
│  │     FARMS      │         │  SENSOR_DATA   │                 │
│  ├────────────────┤         ├────────────────┤                 │
│  │ id (PK)        │───┐     │ id (PK)        │                 │
│  │ name           │   │     │ farm_id (FK)   │◄────┐           │
│  │ location       │   │     │ soil_moisture  │     │           │
│  │ size_hectares  │   │     │ temperature    │     │           │
│  │ crop_type      │   │     │ humidity       │     │           │
│  │ planting_date  │   │     │ timestamp      │     │           │
│  │ growth_stage   │   │     └────────────────┘     │           │
│  │ owner_phone    │   │                            │           │
│  │ created_at     │   │     ┌────────────────┐     │           │
│  └────────────────┘   │     │  PREDICTIONS   │     │           │
│                       │     ├────────────────┤     │           │
│                       │     │ id (PK)        │     │           │
│                       └────►│ farm_id (FK)   │     │           │
│                             │ stress_index   │     │           │
│                             │ risk_category  │     │           │
│                             │ confidence     │     │           │
│                             │ recommendation │     │           │
│                             │ created_at     │     │           │
│                             └────────────────┘     │           │
│                                                    │           │
│  ┌────────────────┐         ┌────────────────┐    │           │
│  │  SIMULATIONS   │         │    ALERTS      │    │           │
│  ├────────────────┤         ├────────────────┤    │           │
│  │ id (PK)        │         │ id (PK)        │    │           │
│  │ farm_id (FK)   │◄────────│ farm_id (FK)   │────┘           │
│  │ scenario_type  │         │ alert_type     │                 │
│  │ parameters     │         │ message        │                 │
│  │ baseline       │         │ sent_at        │                 │
│  │ result         │         │ status         │                 │
│  │ created_at     │         └────────────────┘                 │
│  └────────────────┘                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Simulation Scenarios

| Scenario | Parameters | Use Case |
|----------|------------|----------|
| `DRY_WEEK` | duration_days, rainfall_mm=0 | "What if no rain for 14 days?" |
| `DELAYED_PLANTING` | delay_days | "What if I plant 2 weeks late?" |
| `IRRIGATION_TEST` | irrigation_mm | "What if I irrigate 20mm now?" |
| `CUSTOM` | Any overrides | Free-form scenario |

---

## 10. Hardware Specification

### Components
- **MCU:** ESP32 DevKit (~$5)
- **Temp/Humidity:** DHT22 (~$3)
- **Soil Moisture:** Capacitive sensor (~$2)
- **Power:** 5V USB or solar panel

### Wiring Diagram
```
ESP32 DevKit
┌──────────────────────┐
│                      │
│  GPIO4  ◄──────────── DHT22 Data
│  GPIO32 ◄──────────── Soil Moisture Analog
│  3.3V   ──────────►   Sensor VCC
│  GND    ──────────►   Sensor GND
│                      │
│  WiFi ─────────────►  Cloud API
│                      │
└──────────────────────┘
```

### Data Transmission
- Read sensors every **5 minutes**
- POST to `/api/v1/sensor-data`
- Retry with exponential backoff on failure

---

## 11. Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  DEMETER                                    [Amina's Farm ▼]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────┐  ┌──────────────────────────┐ │
│  │     CURRENT RISK            │  │    7-DAY FORECAST        │ │
│  │                             │  │                          │ │
│  │         ┌─────┐             │  │    ──────────────────    │ │
│  │         │ 72  │             │  │   /                  \   │ │
│  │         │     │             │  │  /                    \  │ │
│  │         └─────┘             │  │ /                      \ │ │
│  │        SEVERE               │  │──────────────────────────│ │
│  │                             │  │ M  T  W  T  F  S  S      │ │
│  │  Days to Critical: 4        │  │                          │ │
│  └─────────────────────────────┘  └──────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────┐  ┌──────────────────────────┐ │
│  │     SENSOR DATA             │  │    SIMULATION            │ │
│  │                             │  │                          │ │
│  │  Soil Moisture: 32%         │  │  [Dry Week      ▼]       │ │
│  │  Temperature:   34°C        │  │                          │ │
│  │  Humidity:      45%         │  │  Duration: [14] days     │ │
│  │  Last Rain:     5 days ago  │  │                          │ │
│  │                             │  │  [Run Simulation]        │ │
│  └─────────────────────────────┘  └──────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  RECOMMENDATION                                          │  │
│  │                                                          │  │
│  │  ⚠️  Irrigate 25mm within 3 days to avoid 35% yield loss │  │
│  │                                                          │  │
│  │  [Send SMS Alert]                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Team Responsibilities

| Member | Role | Deliverables |
|--------|------|--------------|
| **Frontend Dev** | Dashboard | Next.js app, charts, simulation UI |
| **Backend Dev (Java)** | API + Integration | Spring Boot API, DB, Africa's Talking, Open-Meteo |
| **AI Engineer** | ML Service | Python FastAPI, ensemble models, simulation engine |
| **Hardware Engineer** | IoT | ESP32 firmware, synthetic data generator |

---

## 13. Milestones (Hackathon Timeline)

### Stage 1: MVP (48 hrs)
- [ ] Synthetic data generator working
- [ ] Basic water balance model
- [ ] Simple dashboard showing risk score
- [ ] API endpoints functional

### Stage 2: Build Sprint (72 hrs)
- [ ] Full ML ensemble integrated
- [ ] Simulation engine working
- [ ] ESP32 sending real data (or reliable synthetic)
- [ ] SMS alerts functional
- [ ] Weather API integrated

### Stage 3: Demo Ready (72 hrs)
- [ ] Polished dashboard UI
- [ ] Demo script rehearsed
- [ ] All scenarios working
- [ ] Edge cases handled
- [ ] Video/presentation ready

---

## 14. Demo Script (5-7 min)

1. **Hook (30s):** "Amina lost 45% of her maize last season. What if she could have seen it coming?"

2. **Dashboard Tour (1 min):** Show current farm health, sensor data

3. **Simulation Demo (2 min):** 
   - Click "Simulate Dry Week (14 days)"
   - Watch stress index climb from 45 → 82
   - Show "Critical in 4 days" warning

4. **SMS Alert (30s):** Send alert, show message on phone

5. **Architecture (30s):** Quick diagram slide

6. **Scale Story (1 min):** "One farm → Platform → Insurance data"

7. **Close (30s):** "Demeter gives farmers foresight. Help us scale it."

---

## 15. Success Metrics

| Metric | Target |
|--------|--------|
| Sensor → Prediction latency | < 5 seconds |
| Prediction accuracy (vs FAO baseline) | ±15% |
| Simulation response time | < 2 seconds |
| SMS delivery success | > 95% |

---

## 16. External Services

| Service | Purpose | Signup |
|---------|---------|--------|
| **Open-Meteo** | Weather data | No API key needed |
| **Africa's Talking** | SMS | https://africastalking.com (free sandbox) |
| **Railway** | Backend hosting | https://railway.app |
| **Vercel** | Frontend hosting | https://vercel.com |

---

## 17. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Hardware fails during demo | Synthetic data generator as fallback |
| ML model inaccurate | Physics model provides baseline guarantee |
| API rate limits | Cache weather data, batch requests |
| SMS not delivered | Show SMS in dashboard as backup |

---

## 18. Files to Create

```
demeter/
├── README.md
├── PRD.md (this file)
├── backend/                    # Java Spring Boot
│   ├── src/main/java/
│   ├── pom.xml
│   └── ...
├── ml-service/                 # Python FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   │   ├── water_balance.py
│   │   │   ├── random_forest.py
│   │   │   ├── lstm.py
│   │   │   └── ensemble.py
│   │   ├── simulation/
│   │   └── synthetic/
│   ├── requirements.txt
│   └── ...
├── frontend/                   # Next.js
│   ├── src/
│   ├── package.json
│   └── ...
└── hardware/                   # ESP32 Arduino
    ├── demeter_sensor/
    │   └── demeter_sensor.ino
    └── ...
```

---

**Let's build this and win!** 🌾
