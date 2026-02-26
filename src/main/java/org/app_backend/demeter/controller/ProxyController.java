package org.app_backend.demeter.controller;

import org.app_backend.demeter.service.ProxyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/farms")
public class ProxyController {

    @Autowired
    private ProxyService proxyService;

    @GetMapping("/{farmId}/prediction")
    public ResponseEntity<Map<String,Object>> fetchCurrentPrediction(UUID farmId) {
        return ResponseEntity.ok().body(proxyService.getCurrentPrediction(farmId));
    }

    @GetMapping("/{farmId}/simulate")
    public ResponseEntity<Map<String,Object>> whatIfSimulation(UUID farmId) {
        return ResponseEntity.ok().body(proxyService.whatIfSimulation(farmId));
    }
}
