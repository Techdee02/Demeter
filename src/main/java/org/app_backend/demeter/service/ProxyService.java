package org.app_backend.demeter.service;

import org.app_backend.demeter.dto.PredictionRequest;
import org.app_backend.demeter.dto.SimulationRequest;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class ProxyService {

    public Map<String,Object> whatIfSimulation(UUID farmId) {
        return null;
    }


    public Map<String,Object> getCurrentPrediction(UUID farmId) {
        return null;
    }

}
