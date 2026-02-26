package org.app_backend.demeter.dto;

public record LoginRequest(
        String phoneNo,
        String password
){}
