package org.app_backend.demeter.controller;

import org.app_backend.demeter.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/farms")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{farmId}/weather")
    public ResponseEntity<Map> fetchWeatherForecaseOnFarm(UUID farmId) {
        return ResponseEntity.ok().body(weatherService.readWeatherData(farmId));
    }

    @GetMapping("/soil")
    public ResponseEntity<Map> fetchCurrentSoilData() {
        return ResponseEntity.ok().body(weatherService.readCurrentSoilData());
    }
}
