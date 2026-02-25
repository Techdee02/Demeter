/**
 * Demeter API Types
 * Type definitions for all API responses and requests
 */

// ============================================================================
// Core Entities
// ============================================================================

export interface Farm {
  id: string;
  name: string;
  location: {
    region: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  cropType: string;
  areaHectares: number;
  plantingDate: string;
  expectedHarvestDate: string;
  growthStage: GrowthStage;
  healthPercentage: number;
  totalPlants: number;
  healthyPlants: number;
  ownerId: string;
}

export type GrowthStage = 
  | 'GERMINATION'
  | 'SEEDLING'
  | 'VEGETATIVE'
  | 'FLOWERING'
  | 'GRAIN_FILL'
  | 'MATURITY';

export interface SensorReading {
  id: string;
  farmId: string;
  sensorType: SensorType;
  value: number;
  unit: string;
  status: HealthStatus;
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
  optimalRange: {
    min: number;
    max: number;
  };
}

export type SensorType = 'moisture' | 'temperature' | 'humidity' | 'light' | 'rainfall';

export type HealthStatus = 'healthy' | 'moderate' | 'low' | 'critical';

// ============================================================================
// Risk Assessment
// ============================================================================

export interface RiskAssessment {
  farmId: string;
  overallRisk: number; // 0-100
  riskCategory: RiskCategory;
  breakdown: RiskBreakdownItem[];
  recommendations: Recommendation[];
  timestamp: string;
  confidence: number;
}

export type RiskCategory = 'HEALTHY' | 'MODERATE' | 'SEVERE' | 'CRITICAL';

export interface RiskBreakdownItem {
  type: RiskType;
  score: number; // 0-100
  trend: 'increasing' | 'decreasing' | 'stable';
  contributingFactors: string[];
}

export type RiskType = 
  | 'WATER_STRESS'
  | 'HEAT_STRESS'
  | 'DISEASE_RISK'
  | 'NUTRIENT_DEFICIENCY'
  | 'PEST_RISK';

// ============================================================================
// Forecast & Predictions
// ============================================================================

export interface ForecastPoint {
  date: string;
  dayLabel: string;
  riskScore: number;
  soilMoisture: number;
  temperature: number;
  rainfall: number;
  confidence: number;
}

export interface Forecast {
  farmId: string;
  generatedAt: string;
  forecastDays: number;
  dataPoints: ForecastPoint[];
  summary: {
    averageRisk: number;
    peakRiskDay: string;
    peakRiskValue: number;
    trendDirection: 'improving' | 'worsening' | 'stable';
  };
}

// ============================================================================
// Recommendations & Alerts
// ============================================================================

export interface Recommendation {
  id: string;
  farmId: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  actionType: ActionType;
  daysUntilDeadline?: number;
  impactPercent?: number;
  confidence: number;
  createdAt: string;
  status: 'pending' | 'acknowledged' | 'completed' | 'dismissed';
}

export type ActionType = 
  | 'IRRIGATION'
  | 'FERTILIZER'
  | 'PEST_CONTROL'
  | 'HARVEST'
  | 'INSPECTION'
  | 'WEATHER_ALERT';

// ============================================================================
// Simulation
// ============================================================================

export interface SimulationRequest {
  farmId: string;
  scenario: ScenarioType;
  parameters?: Record<string, number>;
}

export type ScenarioType = 'IRRIGATION' | 'HEAVY_RAIN' | 'HEAT_WAVE' | 'FERTILIZER';

export interface SimulationResult {
  scenario: ScenarioType;
  baselineRisk: number;
  predictedRisk: number;
  riskChange: number;
  yieldImpact: number;
  waterUsage: number;
  recommendations: string[];
  confidence: number;
  timestamp: string;
}

// ============================================================================
// API Responses
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// ============================================================================
// API Error
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
