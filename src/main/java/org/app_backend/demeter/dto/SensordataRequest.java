package org.app_backend.demeter.dto;

import lombok.Data;
import org.app_backend.demeter.model.FarmModel;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class SensordataRequest {

    private UUID farmId;
    private Double soil_moisture;
    private Double temperature;
    private Double humidity;
    private LocalDateTime timestamp;
    private LocalDateTime created_at = LocalDateTime.now();
}
