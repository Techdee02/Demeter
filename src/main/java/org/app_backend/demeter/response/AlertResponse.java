package org.app_backend.demeter.response;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;

@Data
public class AlertResponse {

    private String alert_type;
    private String phone;
    private String message;
    private String message_id;
    private String status;
    private LocalDateTime sent_at = LocalDateTime.now();
}
