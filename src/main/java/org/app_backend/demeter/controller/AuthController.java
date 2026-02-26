package org.app_backend.demeter.controller;

import org.app_backend.demeter.dto.LoginRequest;
import org.app_backend.demeter.dto.UserRequest;
import org.app_backend.demeter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping(value = "/api/v1/auth")
@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping(path = "/create-account", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String,Object>> createAccount(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(userService.createUserAccount(userRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(Map.of("message", "Login successful"));
    }
}
