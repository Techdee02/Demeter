package org.app_backend.demeter.dto;

import lombok.Data;

@Data
public class UserRequest {

    private String firstName;
    private String lastName;
    private String phoneNo;
    private String password;
}
