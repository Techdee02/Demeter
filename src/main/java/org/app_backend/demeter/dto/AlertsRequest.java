package org.app_backend.demeter.dto;

import java.util.UUID;

public record AlertsRequest (
     UUID farm_id,
     String phone,
     String language, String message, String alert_type
) {}