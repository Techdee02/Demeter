package org.app_backend.demeter.controller;

import org.app_backend.demeter.dto.FarmRequest;
import org.app_backend.demeter.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/farms")
public class FarmController {

    @Autowired
    private FarmService farmService;
    @GetMapping
    public ResponseEntity<List<FarmRequest>> getListOfFarm() {
        return ResponseEntity.ok().body(farmService.getFarms());
    }

    @PostMapping
    public ResponseEntity<Map<String,Object>> createFarm(@RequestBody FarmRequest farmRequest) {
        return ResponseEntity.ok().body(farmService.createFarm(farmRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FarmRequest> getFarmByID(UUID id) {
        return ResponseEntity.ok().body(farmService.getFarmByID(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String,Object>> updateFarmByID(UUID id, @RequestBody FarmRequest farmRequest) {
        return ResponseEntity.ok().body(farmService.updateFarmByID(id, farmRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Object>> deleteFarmByID(UUID id) {
        return ResponseEntity.ok().body(farmService.deleteFarmByID(id));
    }
}
