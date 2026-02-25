// Farm Types
export interface Farm {
  id: string;
  name: string;
  location: string;
  size_hectares: number;
  crop_type: string;
  planting_date: string;
  growth_stage: GrowthStage;
  owner_phone: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
}

export type GrowthStage = 
  | 'EMERGENCE' 
  | 'VEGETATIVE' 
  | 'TASSELING' 
  | 'GRAIN_FILL' 
  | 'MATURITY';

// Sensor Data Types
export interface SensorData {
  soil_moisture: number;
  temperature: number;
  humidity: number;
  timestamp: string;
}

// Prediction Types
export type RiskCategory = 
  | 'NONE' 
  | 'LOW' 
  | 'MODERATE' 
  | 'SEVERE' 
  | 'CRITICAL';

export interface Prediction {
  farm_id: string;
  stress_index: number;
  risk_category: RiskCategory;
  confidence: number;
  days_to_critical: number | null;
  recommendation: string;
  forecast: ForecastDay[];
  generated_at?: string;
}

export interface ForecastDay {
  day: number;
  stress: number;
  category?: RiskCategory;
}

// Simulation Types
export type ScenarioType = 
  | 'DRY_WEEK' 
  | 'DELAYED_PLANTING' 
  | 'IRRIGATION_TEST' 
  | 'CUSTOM';

export interface SimulationParams {
  scenario: ScenarioType;
  parameters: Record<string, any>;
}

export interface SimulationResult {
  baseline: {
    stress_index: number;
    yield_impact: number;
    trajectory?: number[];
  };
  simulated: {
    stress_index: number;
    yield_impact: number;
    trajectory?: number[];
  };
  recommendation: string;
  risk_window?: {
    critical_day: number | null;
    action_deadline: number;
  };
}

// Weather Types
export interface WeatherForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  precipitation: number;
}

// Alert Types
export interface Alert {
  id: string;
  farm_id: string;
  alert_type: string;
  message: string;
  sent_at: string;
  status: string;
}
