package org.app_backend.demeter.service;

import org.app_backend.demeter.dto.UserRequest;
import org.app_backend.demeter.mapper.UserMapper;
import org.app_backend.demeter.model.UserModel;
import org.app_backend.demeter.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String,Object> createUserAccount(UserRequest userRequest) {
        UserModel userModel = userMapper.convertToUserModel(userRequest);
        userModel.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        userRepository.save(userModel);
        return Map.of("message", "User account created successfully", "data", userMapper.convertToUserRequest(userModel));
    }

    public UserModel getUserByPhoneNo(String phoneNo) {
        return userRepository.findByPhoneNo(phoneNo).orElseThrow(() -> new RuntimeException("User not found with phone number: " + phoneNo));
    }
}
