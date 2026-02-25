/**
 * React Query Hooks for Demeter API
 * Provides type-safe data fetching with caching, refetching, and loading states
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from './mockApi';
import type { SimulationRequest } from './types';

// ============================================================================
// Query Keys
// ============================================================================

export const queryKeys = {
  farms: ['farms'] as const,
  farm: (id: string) => ['farms', id] as const,
  sensors: (farmId: string) => ['sensors', farmId] as const,
  risk: (farmId: string) => ['risk', farmId] as const,
  forecast: (farmId: string) => ['forecast', farmId] as const,
  recommendations: (farmId: string) => ['recommendations', farmId] as const,
};

// ============================================================================
// Farm Hooks
// ============================================================================

/**
 * Fetch all farms for the current user
 */
export function useFarms() {
  return useQuery({
    queryKey: queryKeys.farms,
    queryFn: () => mockApi.getFarms(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch a single farm by ID
 */
export function useFarm(farmId: string) {
  return useQuery({
    queryKey: queryKeys.farm(farmId),
    queryFn: () => mockApi.getFarm(farmId),
    enabled: !!farmId,
    staleTime: 5 * 60 * 1000,
  });
}

// ============================================================================
// Sensor Hooks
// ============================================================================

/**
 * Fetch sensor readings for a farm
 * Refreshes every 30 seconds for near real-time data
 */
export function useSensorReadings(farmId: string) {
  return useQuery({
    queryKey: queryKeys.sensors(farmId),
    queryFn: () => mockApi.getSensorReadings(farmId),
    enabled: !!farmId,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds
  });
}

// ============================================================================
// Risk Assessment Hooks
// ============================================================================

/**
 * Fetch risk assessment for a farm
 */
export function useRiskAssessment(farmId: string) {
  return useQuery({
    queryKey: queryKeys.risk(farmId),
    queryFn: () => mockApi.getRiskAssessment(farmId),
    enabled: !!farmId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// ============================================================================
// Forecast Hooks
// ============================================================================

/**
 * Fetch 14-day forecast for a farm
 */
export function useForecast(farmId: string) {
  return useQuery({
    queryKey: queryKeys.forecast(farmId),
    queryFn: () => mockApi.getForecast(farmId),
    enabled: !!farmId,
    staleTime: 15 * 60 * 1000, // 15 minutes (forecasts update less frequently)
  });
}

// ============================================================================
// Recommendation Hooks
// ============================================================================

/**
 * Fetch recommendations for a farm
 */
export function useRecommendations(farmId: string) {
  return useQuery({
    queryKey: queryKeys.recommendations(farmId),
    queryFn: () => mockApi.getRecommendations(farmId),
    enabled: !!farmId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Acknowledge a recommendation
 */
export function useAcknowledgeRecommendation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (recommendationId: string) => mockApi.acknowledgeRecommendation(recommendationId),
    onSuccess: () => {
      // Invalidate recommendations to refetch
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });
}

/**
 * Dismiss a recommendation
 */
export function useDismissRecommendation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (recommendationId: string) => mockApi.dismissRecommendation(recommendationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });
}

// ============================================================================
// Simulation Hooks
// ============================================================================

/**
 * Run a what-if simulation
 */
export function useRunSimulation() {
  return useMutation({
    mutationFn: (request: SimulationRequest) => mockApi.runSimulation(request),
  });
}

// ============================================================================
// Utility Hooks
// ============================================================================

/**
 * Prefetch farm data for faster navigation
 */
export function usePrefetchFarm() {
  const queryClient = useQueryClient();
  
  return (farmId: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.farm(farmId),
      queryFn: () => mockApi.getFarm(farmId),
    });
    queryClient.prefetchQuery({
      queryKey: queryKeys.sensors(farmId),
      queryFn: () => mockApi.getSensorReadings(farmId),
    });
    queryClient.prefetchQuery({
      queryKey: queryKeys.risk(farmId),
      queryFn: () => mockApi.getRiskAssessment(farmId),
    });
  };
}

/**
 * Combined hook for dashboard data
 * Fetches all data needed for the main dashboard view
 */
export function useDashboardData(farmId: string) {
  const farm = useFarm(farmId);
  const sensors = useSensorReadings(farmId);
  const risk = useRiskAssessment(farmId);
  const forecast = useForecast(farmId);
  const recommendations = useRecommendations(farmId);
  
  return {
    farm,
    sensors,
    risk,
    forecast,
    recommendations,
    isLoading: farm.isLoading || sensors.isLoading || risk.isLoading,
    isError: farm.isError || sensors.isError || risk.isError,
  };
}
