/**
 * Demeter Mock API Service
 * Provides realistic mock data for the hackathon demo
 * This simulates the backend API responses
 */

import {
  Farm,
  SensorReading,
  RiskAssessment,
  Forecast,
  ForecastPoint,
  Recommendation,
  SimulationRequest,
  SimulationResult,
} from './types';

// ============================================================================
// Mock Data
// ============================================================================

const mockFarms: Farm[] = [
  {
    id: '1',
    name: "Amina's Maize Farm",
    location: {
      region: 'Kaduna State',
      country: 'Nigeria',
      coordinates: { latitude: 10.5264, longitude: 7.4388 },
    },
    cropType: 'Maize',
    areaHectares: 5.2,
    plantingDate: '2025-12-15',
    expectedHarvestDate: '2026-04-15',
    growthStage: 'FLOWERING',
    healthPercentage: 87,
    totalPlants: 3000,
    healthyPlants: 2847,
    ownerId: 'user-1',
  },
  {
    id: '2',
    name: 'Kofi\'s Cassava Plot',
    location: {
      region: 'Ashanti Region',
      country: 'Ghana',
      coordinates: { latitude: 6.6885, longitude: -1.6244 },
    },
    cropType: 'Cassava',
    areaHectares: 3.8,
    plantingDate: '2025-10-01',
    expectedHarvestDate: '2026-07-01',
    growthStage: 'VEGETATIVE',
    healthPercentage: 92,
    totalPlants: 1500,
    healthyPlants: 1420,
    ownerId: 'user-1',
  },
  {
    id: '3',
    name: 'Blessing\'s Rice Paddy',
    location: {
      region: 'Niger State',
      country: 'Nigeria',
      coordinates: { latitude: 9.0820, longitude: 6.5390 },
    },
    cropType: 'Rice',
    areaHectares: 8.5,
    plantingDate: '2025-11-20',
    expectedHarvestDate: '2026-03-20',
    growthStage: 'GRAIN_FILL',
    healthPercentage: 78,
    totalPlants: 25000,
    healthyPlants: 21500,
    ownerId: 'user-1',
  },
];

const mockSensorReadings: Record<string, SensorReading[]> = {
  '1': [
    {
      id: 's1',
      farmId: '1',
      sensorType: 'moisture',
      value: 42,
      unit: '%',
      status: 'healthy',
      timestamp: new Date().toISOString(),
      trend: 'stable',
      optimalRange: { min: 35, max: 45 },
    },
    {
      id: 's2',
      farmId: '1',
      sensorType: 'temperature',
      value: 28,
      unit: '°C',
      status: 'moderate',
      timestamp: new Date().toISOString(),
      trend: 'up',
      optimalRange: { min: 22, max: 30 },
    },
    {
      id: 's3',
      farmId: '1',
      sensorType: 'humidity',
      value: 68,
      unit: '%',
      status: 'healthy',
      timestamp: new Date().toISOString(),
      trend: 'stable',
      optimalRange: { min: 60, max: 80 },
    },
    {
      id: 's4',
      farmId: '1',
      sensorType: 'rainfall',
      value: 0,
      unit: 'mm',
      status: 'low',
      timestamp: new Date().toISOString(),
      trend: 'stable',
      optimalRange: { min: 5, max: 20 },
    },
  ],
};

const mockRiskAssessment: Record<string, RiskAssessment> = {
  '1': {
    farmId: '1',
    overallRisk: 15,
    riskCategory: 'HEALTHY',
    breakdown: [
      {
        type: 'WATER_STRESS',
        score: 8,
        trend: 'stable',
        contributingFactors: ['Low recent rainfall', 'Adequate soil moisture'],
      },
      {
        type: 'HEAT_STRESS',
        score: 12,
        trend: 'increasing',
        contributingFactors: ['Rising temperatures', 'Clear skies predicted'],
      },
      {
        type: 'DISEASE_RISK',
        score: 3,
        trend: 'stable',
        contributingFactors: ['Healthy plant density', 'Good air circulation'],
      },
    ],
    recommendations: [],
    timestamp: new Date().toISOString(),
    confidence: 89,
  },
};

// Generate 14-day forecast
function generateForecast(farmId: string): Forecast {
  const dataPoints: ForecastPoint[] = [];
  const today = new Date();
  
  const baseRisk = 15;
  const baseMoisture = 42;
  const baseTemperature = 28;
  
  const labels = ['Today', 'D+1', 'D+2', 'D+3', 'D+4', 'D+5', 'D+6', 'D+7', 'D+8', 'D+9', 'D+10', 'D+11', 'D+12', 'D+13'];
  
  let peakRiskDay = '';
  let peakRiskValue = 0;
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Create realistic variance - build up to peak stress around day 7-9
    const stressMultiplier = i < 7 ? 1 + (i * 0.15) : 1 + ((14 - i) * 0.12);
    const rainfall = i === 3 || i === 10 ? Math.random() * 15 + 5 : 0;
    
    const riskScore = Math.round(baseRisk * stressMultiplier + (Math.random() * 8 - 4));
    const soilMoisture = Math.round(baseMoisture - (i * 1.5) + (rainfall * 0.8) + (Math.random() * 4 - 2));
    const temperature = Math.round(baseTemperature + (i < 7 ? i * 0.5 : (14 - i) * 0.3) + (Math.random() * 2 - 1));
    
    if (riskScore > peakRiskValue) {
      peakRiskValue = riskScore;
      peakRiskDay = labels[i];
    }
    
    dataPoints.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayLabel: labels[i],
      riskScore: Math.max(0, Math.min(100, riskScore)),
      soilMoisture: Math.max(0, Math.min(100, soilMoisture)),
      temperature: Math.max(15, Math.min(45, temperature)),
      rainfall: Math.max(0, rainfall),
      confidence: 95 - (i * 3),
    });
  }
  
  const averageRisk = Math.round(dataPoints.reduce((sum, p) => sum + p.riskScore, 0) / dataPoints.length);
  
  return {
    farmId,
    generatedAt: new Date().toISOString(),
    forecastDays: 14,
    dataPoints,
    summary: {
      averageRisk,
      peakRiskDay,
      peakRiskValue,
      trendDirection: peakRiskValue > 30 ? 'worsening' : 'stable',
    },
  };
}

const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    farmId: '1',
    severity: 'warning',
    title: 'Moderate water stress predicted in 3 days',
    description: 'Soil moisture projected to drop below optimal range. Consider irrigation on Day 75.',
    actionType: 'IRRIGATION',
    daysUntilDeadline: 3,
    impactPercent: 5,
    confidence: 85,
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: 'rec-2',
    farmId: '1',
    severity: 'info',
    title: 'Optimal fertilizer application window',
    description: 'Weather conditions are ideal for nitrogen application in the next 48 hours.',
    actionType: 'FERTILIZER',
    daysUntilDeadline: 2,
    impactPercent: 8,
    confidence: 78,
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: 'rec-3',
    farmId: '1',
    severity: 'success',
    title: 'Growth stage on track',
    description: 'Your maize crop has reached the tasseling stage as expected. Overall health is excellent.',
    actionType: 'INSPECTION',
    confidence: 92,
    createdAt: new Date().toISOString(),
    status: 'acknowledged',
  },
];

// ============================================================================
// Simulation Logic
// ============================================================================

function simulateScenario(request: SimulationRequest): SimulationResult {
  const baseRisk = mockRiskAssessment[request.farmId]?.overallRisk || 15;
  
  const scenarioEffects: Record<string, { riskChange: number; yieldImpact: number; waterUsage: number; recommendations: string[] }> = {
    IRRIGATION: {
      riskChange: -8,
      yieldImpact: 12,
      waterUsage: 2500,
      recommendations: [
        'Apply 25mm of water through drip irrigation',
        'Best time: early morning (6-8 AM)',
        'Monitor soil moisture after 24 hours',
      ],
    },
    HEAVY_RAIN: {
      riskChange: 15,
      yieldImpact: -8,
      waterUsage: 0,
      recommendations: [
        'Ensure drainage channels are clear',
        'Monitor for waterlogging in low areas',
        'Check crops for disease signs after rain',
      ],
    },
    HEAT_WAVE: {
      riskChange: 25,
      yieldImpact: -15,
      waterUsage: 0,
      recommendations: [
        'Increase irrigation frequency by 30%',
        'Apply mulch to retain soil moisture',
        'Consider shade cloth for sensitive areas',
      ],
    },
    FERTILIZER: {
      riskChange: -3,
      yieldImpact: 18,
      waterUsage: 500,
      recommendations: [
        'Apply NPK 15-15-15 at 100kg/ha',
        'Best applied in the evening',
        'Water lightly after application',
      ],
    },
  };
  
  const effect = scenarioEffects[request.scenario];
  
  return {
    scenario: request.scenario,
    baselineRisk: baseRisk,
    predictedRisk: Math.max(0, Math.min(100, baseRisk + effect.riskChange)),
    riskChange: effect.riskChange,
    yieldImpact: effect.yieldImpact,
    waterUsage: effect.waterUsage,
    recommendations: effect.recommendations,
    confidence: 82 + Math.floor(Math.random() * 10),
    timestamp: new Date().toISOString(),
  };
}

// ============================================================================
// API Functions (simulated network calls)
// ============================================================================

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Farms
  getFarms: async (): Promise<Farm[]> => {
    await delay(300);
    return mockFarms;
  },
  
  getFarm: async (farmId: string): Promise<Farm | null> => {
    await delay(200);
    return mockFarms.find(f => f.id === farmId) || null;
  },
  
  // Sensors
  getSensorReadings: async (farmId: string): Promise<SensorReading[]> => {
    await delay(250);
    return mockSensorReadings[farmId] || [];
  },
  
  // Risk Assessment
  getRiskAssessment: async (farmId: string): Promise<RiskAssessment | null> => {
    await delay(300);
    return mockRiskAssessment[farmId] || null;
  },
  
  // Forecast
  getForecast: async (farmId: string): Promise<Forecast> => {
    await delay(400);
    return generateForecast(farmId);
  },
  
  // Recommendations
  getRecommendations: async (farmId: string): Promise<Recommendation[]> => {
    await delay(200);
    return mockRecommendations.filter(r => r.farmId === farmId);
  },
  
  acknowledgeRecommendation: async (recommendationId: string): Promise<void> => {
    await delay(150);
    const rec = mockRecommendations.find(r => r.id === recommendationId);
    if (rec) rec.status = 'acknowledged';
  },
  
  dismissRecommendation: async (recommendationId: string): Promise<void> => {
    await delay(150);
    const rec = mockRecommendations.find(r => r.id === recommendationId);
    if (rec) rec.status = 'dismissed';
  },
  
  // Simulation
  runSimulation: async (request: SimulationRequest): Promise<SimulationResult> => {
    await delay(800); // Longer delay to simulate ML model processing
    return simulateScenario(request);
  },
};
