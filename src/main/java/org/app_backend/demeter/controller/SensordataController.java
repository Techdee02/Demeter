package org.app_backend.demeter.controller;

import org.app_backend.demeter.dto.SensordataRequest;
import org.app_backend.demeter.service.SensordataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class SensordataController {

    @Autowired
    private SensordataService sensordataService;
    @PostMapping("/sensor-data")
    public ResponseEntity<SensordataRequest> fetchSensorReading(@RequestBody SensordataRequest sensordataRequest) {
           return ResponseEntity.ok().body(sensordataService.collectSensorData(sensordataRequest));
    }

    @GetMapping("/farms/{farmId}/sensor-data/latest")
    public ResponseEntity<SensordataRequest> getSensorDataLatestReading(UUID farmId) {
        return ResponseEntity.ok().body(sensordataService.getLatestSensorData(farmId));
    }


    @GetMapping("/farms/{farmId}/sensor-data")
    public ResponseEntity<List<SensordataRequest>> getHistoricalSensorReadings(UUID farmId, LocalDateTime from, LocalDateTime to) {
        return ResponseEntity.ok().body(sensordataService.getHistoricalSensorData(farmId,from,to));
    }

}
