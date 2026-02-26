package org.app_backend.demeter.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class PredictionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "farm_id")
    private FarmModel farm;
    private Integer stress_index;
    private String risk_category;
    private Double confidence;
    private Integer days_to_critical;
    private String recommendation;
    private String forecast;
    private LocalDateTime created_at = LocalDateTime.now();
}
