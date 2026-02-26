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
public class SensordataModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "farm_id")
    private FarmModel farm;
    private Double soil_moisture;
    private Double temperature;
    private Double humidity;
    private LocalDateTime timestamp;
    private LocalDateTime created_at = LocalDateTime.now();
}
