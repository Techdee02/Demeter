package org.app_backend.demeter.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class AlertModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "farm_id")
    private FarmModel farm;
    private String alert_type;
    private String phone;
    private String message;
    private String message_id;
    private String status;
    private LocalDateTime sent_at = LocalDateTime.now();
}
