package org.app_backend.demeter.controller;

import org.app_backend.demeter.dto.AlertsRequest;
import org.app_backend.demeter.response.AlertResponse;
import org.app_backend.demeter.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/alerts/sms")
    public ResponseEntity<Map<String,Object>> sendSMSAlert(@RequestBody AlertsRequest alertsRequest) {
        return ResponseEntity.ok().body(smsService.sendAlertViaSMS(alertsRequest));
    }

    @GetMapping("/farms/{farmId}/alerts")
    public ResponseEntity<List<AlertResponse>> getAlertHistory(UUID farmId) {
        return ResponseEntity.ok().body(smsService.getAlertsHistory(farmId));
    }
}
