package org.app_backend.demeter.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class FarmRequest {

    private String name;
    private String location;
    private Double latitude;
    private Double longitude;
    private Double size_hectares;
    private String crop_type ="MAIZE";
    private LocalDate planting_date;
    private String growth_stage;
    private String owner_phone;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
